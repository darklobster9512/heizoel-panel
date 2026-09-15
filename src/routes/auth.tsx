import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Headphones,
  Loader2,
  Lock,
  Mail,
  Radio,
  RefreshCw,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Mitarbeiter-Login — HEIZKING" },
      {
        name: "description",
        content:
          "Interner Zugang für Admins und Caller des HEIZKING Heizöl-Systems. Anmelden oder Zugang beantragen.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Mitarbeiter-Login — HEIZKING" },
      {
        property: "og:description",
        content: "Interner Zugang für Admins und Caller des HEIZKING Heizöl-Systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const CRYPTO_CONFIG = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", mark: "₿" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", mark: "Ξ" },
  { id: "monero", name: "Monero", symbol: "XMR", mark: "M" },
  { id: "solana", name: "Solana", symbol: "SOL", mark: "S" },
] as const;

type CryptoId = (typeof CRYPTO_CONFIG)[number]["id"];
type CryptoPrice = { eur: number; eur_24h_change: number };
type CryptoPrices = Partial<Record<CryptoId, CryptoPrice>>;

const EURO_PRICE = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

const PERCENT_CHANGE = new Intl.NumberFormat("de-DE", {
  signDisplay: "always",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrices>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPrices() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,monero,solana&vs_currencies=eur&include_24hr_change=true",
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Kursabruf fehlgeschlagen");
        const data = (await response.json()) as CryptoPrices;
        setPrices(data);
        setUpdatedAt(new Date());
        setFailed(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }

    void loadPrices();
    const interval = window.setInterval(() => void loadPrices(), 60_000);
    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  return { prices, loading, failed, updatedAt };
}

function CryptoBoard({
  compact = false,
  prices,
  loading,
  failed,
  updatedAt,
}: {
  compact?: boolean;
  prices: CryptoPrices;
  loading: boolean;
  failed: boolean;
  updatedAt: Date | null;
}) {
  return (
    <div
      className={
        compact
          ? "border-y border-line bg-background py-4 lg:hidden"
          : "overflow-hidden rounded-xl border border-line bg-card shadow-card"
      }
    >
      <div
        className={`flex items-center justify-between ${compact ? "mb-3 px-1" : "border-b border-line bg-surface/60 px-4 py-3"}`}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          <span className="text-[10px] font-bold text-brand">LIVE-KURSE · EUR</span>
        </div>
        <span className="flex items-center gap-1.5 text-[9px] text-muted-custom">
          <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} />
          {updatedAt
            ? `${updatedAt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} UHR`
            : failed
              ? "NICHT VERFÜGBAR"
              : "SYNCHRONISIERT"}
        </span>
      </div>

      <div className={compact ? "grid grid-cols-2 gap-2" : "divide-y divide-line"}>
        {CRYPTO_CONFIG.map((crypto, index) => {
          const price = prices[crypto.id];
          const positive = (price?.eur_24h_change ?? 0) >= 0;
          const TrendIcon = positive ? TrendingUp : TrendingDown;
          return (
            <div
              key={crypto.id}
              className={`group flex items-center justify-between transition-colors hover:bg-surface/70 ${compact ? "rounded-lg border border-line bg-card px-3 py-3" : "min-h-14 bg-card px-4 py-2.5"} ${index > 0 ? "animate-ops-enter-delay" : "animate-ops-enter"}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-sm font-bold text-brand transition-colors group-hover:border-brand/40">
                  {crypto.mark}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-ink">
                    {compact ? crypto.symbol : crypto.name}
                  </p>
                  <p className="text-[9px] text-muted-custom">
                    {compact ? "EUR" : `${crypto.symbol} / EUR`}
                  </p>
                </div>
              </div>
              <div className="ml-2 text-right tabular">
                {loading && !price ? (
                  <div className="h-3 w-16 animate-pulse rounded bg-line" />
                ) : price ? (
                  <>
                    <p className="text-[11px] font-semibold text-ink">
                      {EURO_PRICE.format(price.eur)}
                    </p>
                    <p
                      className={`mt-0.5 flex items-center justify-end gap-1 text-[9px] ${positive ? "text-brand" : "text-destructive"}`}
                    >
                      <TrendIcon className="size-2.5" /> {PERCENT_CHANGE.format(price.eur_24h_change)}%
                    </p>
                  </>
                ) : (
                  <p className="text-[10px] text-muted-custom">—</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function translateError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-Mail oder Passwort ist nicht korrekt.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Für diese E-Mail-Adresse besteht bereits ein Zugang.";
  if (m.includes("password should be at least"))
    return "Das Passwort muss mindestens 6 Zeichen lang sein.";
  if (m.includes("email not confirmed"))
    return "Bitte bestätige zuerst den Link in deiner Bestätigungs-E-Mail.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Zu viele Versuche. Bitte warte einen Moment.";
  return message;
}

function AuthPage() {
  const navigate = useNavigate();
  const crypto = useCryptoPrices();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/weiterleitung", replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setNotice(null);

    if (mode === "signup") {
      if (password !== passwordRepeat) {
        toast.error("Die beiden Passwörter stimmen nicht überein.");
        return;
      }
      if (password.length < 6) {
        toast.error("Das Passwort muss mindestens 6 Zeichen lang sein.");
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        toast.success("Willkommen zurück!");
        navigate({ to: "/weiterleitung", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin + "/auth",
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Zugang angelegt.");
          navigate({ to: "/weiterleitung", replace: true });
        } else {
          setNotice(
            "Fast geschafft: Wir haben dir eine Bestätigungs-E-Mail geschickt. Nach der Bestätigung schaltet ein Admin deine Rolle frei.",
          );
          setMode("signin");
          setPassword("");
          setPasswordRepeat("");
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unbekannter Fehler";
      toast.error(translateError(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-body text-foreground selection:bg-brand/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <header className="relative z-20 border-b border-line bg-background/95">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 lg:px-8">
          <Link to="/" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <Logo className="h-auto w-[108px] text-smava-logo md:w-[122px]" />
          </Link>
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted-custom">
            <span className="hidden sm:inline">MITARBEITERPORTAL</span>
            <span className="h-3 w-px bg-line" />
            <span className="flex items-center gap-2 text-brand">
              <span className="size-1.5 animate-ops-pulse rounded-full bg-brand" />
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1320px] items-center px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid w-full animate-ops-enter overflow-hidden rounded-2xl border border-line bg-background shadow-card lg:min-h-[720px] lg:grid-cols-12">
          <section className="relative hidden overflow-hidden border-r border-line bg-surface/60 p-8 lg:col-span-5 lg:flex lg:flex-col xl:p-10">
            <div className="pointer-events-none absolute top-0 left-0 h-20 w-px bg-brand" />
            <div className="pointer-events-none absolute top-0 left-0 h-px w-20 bg-brand" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[11px] font-bold text-brand">
                <span className="size-2 animate-ops-pulse rounded-full bg-brand" />
                LIVE-BETRIEB · ZENTRALE 01
              </div>
              <p className="mt-8 text-[11px] font-medium text-muted-custom">INTERNER ZUGANG</p>
              <h2 className="mt-3 max-w-md text-[34px] leading-[1.08] font-light text-ink xl:text-[40px]">
                Märkte im Blick. <span className="font-bold text-brand">Abläufe im Griff.</span>
              </h2>
              <p className="mt-4 max-w-md text-[13px] leading-6 text-muted-custom">
                Sicherer Zugang zur täglichen Disposition und zu aktuellen Marktsignalen. Nur für
                freigeschaltete Mitarbeiter.
              </p>
            </div>

            <div className="relative z-10 mt-7 flex-1 animate-ops-enter-delay">
              <CryptoBoard {...crypto} />
            </div>

            <div className="relative z-10 mt-5 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-background px-4 py-3 shadow-sm">
              <div>
                <p className="text-[9px] text-muted-custom">STATUS</p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-ink">
                  <Check className="size-3 text-brand" /> Bereit
                </p>
              </div>
              <div className="pl-4">
                <p className="text-[9px] text-muted-custom">ZUGRIFF</p>
                <p className="mt-1 text-[11px] font-semibold text-ink">Intern</p>
              </div>
              <div className="pl-4">
                <p className="text-[9px] text-muted-custom">KANAL</p>
                <p className="mt-1 text-[11px] font-semibold text-ink">TLS 1.3</p>
              </div>
            </div>
          </section>

          <section className="relative flex flex-col bg-background lg:col-span-7">
            <div className="flex items-center justify-between border-b border-line px-6 py-4 lg:px-10">
              <span className="flex items-center gap-2 text-[11px] font-medium text-muted-custom">
                <Radio className="size-3.5 text-brand" /> ZUGANGSKANAL GESICHERT
              </span>
              <span className="text-[11px] text-muted-custom">HEIZKING / AUTH</span>
            </div>

            <div className="flex flex-1 items-center px-5 py-8 sm:px-10 lg:px-14 xl:px-20">
              <div className="mx-auto w-full max-w-[470px] animate-ops-enter-delay">
                <div className="mb-8 lg:mb-10">
                  <div className="mb-5 flex items-center gap-2 lg:hidden">
                    <Activity className="size-4 text-brand" />
                    <span className="text-[11px] font-bold text-brand">SYSTEM ONLINE</span>
                  </div>
                  <CryptoBoard compact {...crypto} />
                  <p className="text-[11px] font-bold text-brand">MITARBEITERPORTAL</p>
                  <h1 className="mt-3 text-[30px] leading-tight font-bold text-ink sm:text-[36px]">
                    {mode === "signin" ? "Willkommen zurück." : "Zugang beantragen."}
                  </h1>
                  <p className="mt-3 text-[14px] leading-6 text-muted-custom">
                    {mode === "signin"
                      ? "Identifiziere dich, um deine Arbeitsumgebung zu öffnen."
                      : "Lege deinen Zugang an. Die Freischaltung erfolgt durch einen Administrator."}
                  </p>
                </div>

                <div className="grid grid-cols-2 rounded-xl border border-line bg-surface p-1">
                  {(
                    [
                      ["signin", "Anmelden"],
                      ["signup", "Registrieren"],
                    ] as const
                  ).map(([value, label]) => (
                    <Button
                      key={value}
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setMode(value);
                        setNotice(null);
                      }}
                      className={`h-10 rounded-lg text-[13px] ${
                        mode === value
                          ? "bg-background font-semibold text-ink shadow-sm hover:bg-background"
                          : "text-muted-custom hover:bg-background/70 hover:text-ink"
                      }`}
                    >
                      {label}
                    </Button>
                  ))}
                </div>

                {notice ? (
                  <div className="mt-5 flex gap-3 rounded-xl border border-brand/30 bg-brand/8 px-4 py-3 text-[13px] leading-relaxed text-ink">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <p>{notice}</p>
                  </div>
                ) : null}

                <form className="mt-7 min-h-[290px] space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[11px] font-bold text-muted-custom">
                      E-MAIL-ADRESSE
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-custom" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@klaro.de"
                        autoComplete="email"
                        required
                        className="h-12 rounded-xl border-line bg-background pl-11 text-ink shadow-none placeholder:text-muted-custom/60 focus-visible:border-brand focus-visible:ring-brand/25"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[11px] font-bold text-muted-custom">
                      PASSWORT
                    </Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-custom" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete={mode === "signin" ? "current-password" : "new-password"}
                        required
                        className="h-12 rounded-xl border-line bg-background pr-12 pl-11 text-ink shadow-none placeholder:text-muted-custom/60 focus-visible:border-brand focus-visible:ring-brand/25"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-custom hover:bg-surface hover:text-ink"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </div>

                  {mode === "signup" ? (
                    <div className="space-y-2 animate-ops-enter">
                      <Label
                        htmlFor="passwordRepeat"
                        className="text-[11px] font-bold text-muted-custom"
                      >
                        PASSWORT WIEDERHOLEN
                      </Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-custom" />
                        <Input
                          id="passwordRepeat"
                          type={showPassword ? "text" : "password"}
                          value={passwordRepeat}
                          onChange={(e) => setPasswordRepeat(e.target.value)}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          required
                          className="h-12 rounded-xl border-line bg-background pl-11 text-ink shadow-none placeholder:text-muted-custom/60 focus-visible:border-brand focus-visible:ring-brand/25"
                        />
                      </div>
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="group relative h-13 w-full overflow-hidden rounded-xl bg-brand text-[13px] font-bold text-white shadow-cta hover:bg-brand-hover"
                  >
                    <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[420%]" />
                    <span className="relative flex items-center gap-2">
                      {loading ? <Loader2 className="animate-spin" /> : null}
                      {mode === "signin" ? "ARBEITSUMGEBUNG ÖFFNEN" : "ZUGANG ANLEGEN"}
                      {!loading ? <ArrowRight className="transition-transform group-hover:translate-x-1" /> : null}
                    </span>
                  </Button>
                </form>

                <div className="mt-7 flex items-start gap-3 border-t border-line pt-5 text-[12px] leading-5 text-muted-custom">
                  {mode === "signin" ? (
                    <Headphones className="mt-0.5 size-4 shrink-0 text-brand" />
                  ) : (
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  )}
                  <p>
                    {mode === "signin"
                      ? "Zugang vergessen? Wende dich an deine Teamleitung oder den internen Support."
                      : "Nach der Registrierung wird deine Rolle als Admin oder Caller intern freigeschaltet."}
                  </p>
                </div>
              </div>
            </div>

            <footer className="flex items-center justify-between border-t border-line px-6 py-3 text-[10px] text-muted-custom lg:px-10">
              <span>VERSCHLÜSSELTE ÜBERTRAGUNG</span>
              <span>INTERN · VERSION 2.4</span>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
}
