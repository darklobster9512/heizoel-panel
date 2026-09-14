import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User } from "lucide-react";
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
      { title: "Mitarbeiter-Login — Klaro Heizöl" },
      {
        name: "description",
        content:
          "Interner Zugang für Admins und Caller des Klaro Heizöl-Systems. Anmelden oder Zugang beantragen.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Mitarbeiter-Login — Klaro Heizöl" },
      {
        property: "og:description",
        content: "Interner Zugang für Admins und Caller des Klaro Heizöl-Systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const TRUST_POINTS = [
  {
    title: "Verschlüsselte Übertragung",
    text: "Alle Zugangsdaten werden ausschließlich verschlüsselt übermittelt.",
  },
  {
    title: "Interner Zugang",
    text: "Nur freigeschaltete Mitarbeiter erhalten Zugriff auf Anfragen und Kundendaten.",
  },
  {
    title: "Support unter 0800 000 98 00",
    text: "Bei Problemen mit dem Zugang hilft die interne IT werktags von 8 bis 18 Uhr.",
  },
];

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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [fullName, setFullName] = useState("");
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
            data: { full_name: fullName.trim() },
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-line bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="rounded-md">
            <Logo className="h-auto w-[110px] text-smava-logo md:w-[126px]" />
          </Link>
          <span className="text-[13px] text-muted-custom">Interner Mitarbeiterbereich</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <section className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-medium text-conditions">
            <ShieldCheck className="size-3.5 text-brand" />
            Klaro Heizöl-System
          </span>
          <h1 className="mt-5 text-[30px] leading-tight font-bold text-hero-text md:text-[40px]">
            Anmeldung für Mitarbeiter
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-conditions">
            Melde dich mit deinem Firmenzugang an. Admins verwalten Anfragen, Preise und das Team,
            Caller arbeiten ihre Kontaktliste ab.
          </p>

          <ul className="mt-8 space-y-4">
            {TRUST_POINTS.map((point) => (
              <li key={point.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <p className="text-[14px] font-semibold text-conditions">{point.title}</p>
                  <p className="text-[13px] leading-relaxed text-muted-custom">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-xl border border-line bg-card p-6 shadow-sm md:p-8">
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-surface p-1">
              {(
                [
                  ["signin", "Anmelden"],
                  ["signup", "Registrieren"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMode(value);
                    setNotice(null);
                  }}
                  className={`rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                    mode === value
                      ? "bg-card text-conditions shadow-sm"
                      : "text-muted-custom hover:text-conditions"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {notice ? (
              <p className="mt-5 rounded-lg border border-brand/30 bg-brand-soft/40 px-4 py-3 text-[13px] leading-relaxed text-conditions">
                {notice}
              </p>
            ) : null}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" ? (
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-[13px] text-conditions">
                    Vor- und Nachname
                  </Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-custom" />
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Max Mustermann"
                      autoComplete="name"
                      required
                      className="h-11 pl-9"
                    />
                  </div>
                </div>
              ) : null}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] text-conditions">
                  E-Mail-Adresse
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-custom" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@klaro.de"
                    autoComplete="email"
                    required
                    className="h-11 pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[13px] text-conditions">
                  Passwort
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-custom" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    required
                    className="h-11 pr-10 pl-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-custom hover:text-conditions"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {mode === "signup" ? (
                <div className="space-y-1.5">
                  <Label htmlFor="passwordRepeat" className="text-[13px] text-conditions">
                    Passwort wiederholen
                  </Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-custom" />
                    <Input
                      id="passwordRepeat"
                      type={showPassword ? "text" : "password"}
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                      className="h-11 pl-9"
                    />
                  </div>
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full bg-brand text-[15px] font-semibold text-white hover:bg-brand-hover"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {mode === "signin" ? "Anmelden" : "Zugang anlegen"}
              </Button>

              <p className="text-center text-[12px] leading-relaxed text-muted-custom">
                {mode === "signin"
                  ? "Zugang vergessen? Melde dich bei deiner Teamleitung."
                  : "Nach der Registrierung wird deine Rolle (Admin oder Caller) intern freigeschaltet."}
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
