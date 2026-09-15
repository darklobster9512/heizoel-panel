export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          bank_name: string
          bic: string
          created_at: string
          created_by: string | null
          iban: string
          id: string
          is_active: boolean
          limit_amount: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          bank_name: string
          bic: string
          created_at?: string
          created_by?: string | null
          iban: string
          id?: string
          is_active?: boolean
          limit_amount?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          bank_name?: string
          bic?: string
          created_at?: string
          created_by?: string | null
          iban?: string
          id?: string
          is_active?: boolean
          limit_amount?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      brandings: {
        Row: {
          account_holder: string | null
          bank_name: string | null
          bic: string | null
          city: string | null
          commercial_register_number: string | null
          company_name: string | null
          created_at: string
          created_by: string | null
          domain: string | null
          email: string | null
          iban: string | null
          id: string
          logo_path: string | null
          managing_director: string | null
          postal_code: string | null
          public_id: string
          registry_court: string | null
          resend_api_key: string | null
          resend_sender_email: string | null
          resend_sender_name: string | null
          seven_api_key: string | null
          seven_sender_name: string | null
          shop_name: string | null
          status: Database["public"]["Enums"]["branding_status"]
          street_address: string | null
          updated_at: string
          updated_by: string | null
          vat_id: string | null
        }
        Insert: {
          account_holder?: string | null
          bank_name?: string | null
          bic?: string | null
          city?: string | null
          commercial_register_number?: string | null
          company_name?: string | null
          created_at?: string
          created_by?: string | null
          domain?: string | null
          email?: string | null
          iban?: string | null
          id?: string
          logo_path?: string | null
          managing_director?: string | null
          postal_code?: string | null
          public_id?: string
          registry_court?: string | null
          resend_api_key?: string | null
          resend_sender_email?: string | null
          resend_sender_name?: string | null
          seven_api_key?: string | null
          seven_sender_name?: string | null
          shop_name?: string | null
          status?: Database["public"]["Enums"]["branding_status"]
          street_address?: string | null
          updated_at?: string
          updated_by?: string | null
          vat_id?: string | null
        }
        Update: {
          account_holder?: string | null
          bank_name?: string | null
          bic?: string | null
          city?: string | null
          commercial_register_number?: string | null
          company_name?: string | null
          created_at?: string
          created_by?: string | null
          domain?: string | null
          email?: string | null
          iban?: string | null
          id?: string
          logo_path?: string | null
          managing_director?: string | null
          postal_code?: string | null
          public_id?: string
          registry_court?: string | null
          resend_api_key?: string | null
          resend_sender_email?: string | null
          resend_sender_name?: string | null
          seven_api_key?: string | null
          seven_sender_name?: string | null
          shop_name?: string | null
          status?: Database["public"]["Enums"]["branding_status"]
          street_address?: string | null
          updated_at?: string
          updated_by?: string | null
          vat_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brandings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brandings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          bank_account_id: string | null
          branding_id: string | null
          created_at: string
          created_by: string | null
          id: string
          invoice_number: string
          model: Json
          order_id: string
          pdf_path: string | null
          updated_at: string
        }
        Insert: {
          amount?: number
          bank_account_id?: string | null
          branding_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          invoice_number: string
          model?: Json
          order_id: string
          pdf_path?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          bank_account_id?: string | null
          branding_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          invoice_number?: string
          model?: Json
          order_id?: string
          pdf_path?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_branding_id_fkey"
            columns: ["branding_id"]
            isOneToOne: false
            referencedRelation: "brandings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          branding_id: string | null
          created_at: string
          delivery_address: Json
          delivery_points: number
          earliest_date: string | null
          email: string
          hose: string | null
          id: string
          internal_note: string | null
          liters: number
          notes: string | null
          order_number: string
          payment_method: string | null
          phone: string | null
          placed_at: string
          price_per_100: number
          slot_date: string | null
          slot_period: string | null
          status: Database["public"]["Enums"]["order_status"]
          total: number
          truck: string | null
          updated_at: string
          variant: string
        }
        Insert: {
          billing_address?: Json | null
          branding_id?: string | null
          created_at?: string
          delivery_address?: Json
          delivery_points?: number
          earliest_date?: string | null
          email: string
          hose?: string | null
          id?: string
          internal_note?: string | null
          liters?: number
          notes?: string | null
          order_number: string
          payment_method?: string | null
          phone?: string | null
          placed_at?: string
          price_per_100?: number
          slot_date?: string | null
          slot_period?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          truck?: string | null
          updated_at?: string
          variant?: string
        }
        Update: {
          billing_address?: Json | null
          branding_id?: string | null
          created_at?: string
          delivery_address?: Json
          delivery_points?: number
          earliest_date?: string | null
          email?: string
          hose?: string | null
          id?: string
          internal_note?: string | null
          liters?: number
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          phone?: string | null
          placed_at?: string
          price_per_100?: number
          slot_date?: string | null
          slot_period?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          truck?: string | null
          updated_at?: string
          variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_branding_id_fkey"
            columns: ["branding_id"]
            isOneToOne: false
            referencedRelation: "brandings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      telegram_recipients: {
        Row: {
          branding_id: string | null
          chat_id: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          label: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          branding_id?: string | null
          chat_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          label: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          branding_id?: string | null
          chat_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          label?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "telegram_recipients_branding_id_fkey"
            columns: ["branding_id"]
            isOneToOne: false
            referencedRelation: "brandings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "telegram_recipients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "telegram_recipients_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "caller"
      branding_status: "draft" | "active"
      order_status:
        | "neu"
        | "mailbox"
        | "moechte_rechnung"
        | "rechnung_versendet"
        | "ueberwiesen"
        | "angekommen"
        | "exchanged"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "caller"],
      branding_status: ["draft", "active"],
      order_status: [
        "neu",
        "mailbox",
        "moechte_rechnung",
        "rechnung_versendet",
        "ueberwiesen",
        "angekommen",
        "exchanged",
      ],
    },
  },
} as const
