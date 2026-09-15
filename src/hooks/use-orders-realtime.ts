import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Subscribes to changes on public.orders and refreshes the order queries.
 * Realtime is only the trigger — data is always re-read through the server
 * functions so caller scoping stays enforced server-side.
 */
export function useOrdersRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const ids = new Set<string>();

    const flush = () => {
      timer = null;
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      for (const id of ids) {
        void queryClient.invalidateQueries({ queryKey: ["order", id] });
      }
      ids.clear();
    };

    const channel = supabase
      .channel("orders-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          const row = (payload.new ?? payload.old) as { id?: string } | null;
          if (row?.id) ids.add(row.id);
          if (timer) clearTimeout(timer);
          timer = setTimeout(flush, 300);
        },
      )
      .subscribe();

    return () => {
      if (timer) clearTimeout(timer);
      void supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
