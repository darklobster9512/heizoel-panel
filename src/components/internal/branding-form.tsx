import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Building2, Check, ImagePlus, Loader2, Mail, MapPin, MessageSquare, Save, ShieldCheck } from "lucide-react";
import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { saveBranding, type Branding, type BrandingInput } from "@/lib/brandings.functions";

type FormValues = Omit<BrandingInput, "id" | "status">;

const EMPTY: FormValues = {
  logoPath: null,
  companyName: "",
  shopName: "",
  streetAddress: "",
  postalCode: "",
  city: "",
  registryCourt: "",
  commercialRegisterNumber: "",
  managingDirector: "",
  vatId: "",
  email: "",
  domain: "",
  resendApiKey: "",
  resendSenderEmail: "",
  resendSenderName: "",
  sevenApiKey: "",
  sevenSenderName: "",
};

function initialValues(branding?: Branding | null): FormValues {
  if (!branding) return EMPTY;
  return {
    logoPath: branding.logoPath,
    companyName: branding.companyName ?? "",
    shopName: branding.shopName ?? "",
    streetAddress: branding.streetAddress ?? "",
    postalCode: branding.postalCode ?? "",
    city: branding.city ?? "",
    registryCourt: branding.registryCourt ?? "",
    commercialRegisterNumber: branding.commercialRegisterNumber ?? "",
    managingDirector: branding.managingDirector ?? "",
    vatId: branding.vatId ?? "",
    email: branding.email ?? "",
    domain: branding.domain ?? "",
    resendApiKey: "",
    resendSenderEmail: branding.resendSenderEmail ?? "",
    resendSenderName: branding.resendSenderName ?? "",
    sevenApiKey: "",
    sevenSenderName: branding.sevenSenderName ?? "",
  };
}

const REQUIRED: (keyof FormValues)[] = [
  "companyName", "shopName", "streetAddress", "postalCode", "city",
  "registryCourt", "commercialRegisterNumber", "managingDirector", "vatId", "email", "domain",
];

function Field({ id, label, value, onChange, required, type = "text", placeholder, maxLength }: {
  id: keyof FormValues;
  label: string;
  value: string;
  onChange: (key: keyof FormValues, value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string | undefined;
  maxLength?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{required ? <span className="ml-1 text-brand">*</span> : null}</Label>
      <Input id={id} name={id} type={type} value={value} placeholder={placeholder} maxLength={maxLength} onChange={(event) => onChange(id, event.target.value)} />
    </div>
  );
}

function Section({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children: ReactNode }) {
  return (
    <section className="border-b border-line py-7 first:pt-0 last:border-0 last:pb-0">
      <div className="mb-5 flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-hover">{icon}</span>
        <div><h2 className="text-[15px] font-bold text-conditions">{title}</h2><p className="mt-0.5 text-[12px] text-muted-custom">{description}</p></div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function BrandingForm({ branding }: { branding?: Branding | null }) {
  const navigate = useNavigate();
  const save = useServerFn(saveBranding);
  const [values, setValues] = useState<FormValues>(() => initialValues(branding));
  const [logoUrl, setLogoUrl] = useState(branding?.logoUrl ?? null);
  const [saving, setSaving] = useState<"draft" | "active" | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const complete = useMemo(() => REQUIRED.every((key) => Boolean(values[key]?.trim())), [values]);

  function setValue(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  async function uploadLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("Bitte ein Bild mit maximal 5 MB auswählen.");
      return;
    }
    setUploading(true);
    setError(null);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) {
      setUploading(false);
      setError("Deine Sitzung ist abgelaufen.");
      return;
    }
    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
    const path = `${userId}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("branding-logos").upload(path, file, { contentType: file.type });
    if (uploadError) setError("Das Logo konnte nicht hochgeladen werden.");
    else {
      setValues((current) => ({ ...current, logoPath: path }));
      setLogoUrl(URL.createObjectURL(file));
      setDirty(true);
    }
    setUploading(false);
  }

  async function submit(status: "draft" | "active") {
    setError(null);
    if (status === "active" && !complete) {
      setError("Für die Aktivierung müssen alle Pflichtfelder ausgefüllt sein.");
      return;
    }
    if (values.sevenSenderName && values.sevenSenderName.length > 11) {
      setError("Der Seven.io-Absendername darf höchstens 11 Zeichen lang sein.");
      return;
    }
    setSaving(status);
    try {
      const result = await save({ data: { ...values, id: branding?.id, status } });
      setDirty(false);
      toast.success(status === "active" ? "Branding wurde aktiviert." : "Entwurf wurde gespeichert.");
      navigate({ to: "/admin/brandings/$brandingId", params: { brandingId: result.id }, replace: true });
    } catch (caught) {
      setError(saveErrorMessage(caught));
    } finally {
      setSaving(null);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void submit("draft");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {branding ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 py-3">
          <div><p className="text-[11px] font-semibold tracking-wide text-muted-custom uppercase">Public Branding ID</p><code className="mt-1 block text-[13px] text-conditions">{branding.publicId}</code></div>
          <Button type="button" variant="outline" size="sm" onClick={() => { void navigator.clipboard.writeText(branding.publicId); toast.success("Branding-ID kopiert."); }}>ID kopieren</Button>
        </div>
      ) : null}

      <div className="rounded-lg border border-line bg-card p-5 shadow-sm sm:p-7">
        <Section icon={<ImagePlus className="size-4" />} title="Marke" description="Logo und Namen, unter denen der Shop auftritt.">
          <div className="sm:col-span-2">
            <Label htmlFor="logo">Logo <span className="text-muted-custom">(optional)</span></Label>
            <label htmlFor="logo" className="mt-2 flex min-h-28 cursor-pointer items-center gap-4 rounded-md border border-dashed border-line bg-surface p-4 transition-colors hover:border-brand">
              {logoUrl ? <img src={logoUrl} alt="Vorschau des Shop-Logos" className="h-16 w-28 rounded-md bg-background object-contain p-2" /> : <span className="flex size-14 items-center justify-center rounded-md bg-background text-muted-custom"><ImagePlus className="size-5" /></span>}
              <span><span className="block text-[13px] font-semibold text-conditions">{uploading ? "Logo wird hochgeladen …" : "Bild auswählen"}</span><span className="mt-1 block text-[12px] text-muted-custom">PNG, JPG, WebP oder SVG · maximal 5 MB</span></span>
            </label>
            <input id="logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" disabled={uploading} onChange={uploadLogo} />
          </div>
          <Field id="companyName" label="Unternehmensname" value={values.companyName ?? ""} onChange={setValue} required placeholder="Musterheizöl GmbH" />
          <Field id="shopName" label="Shopname" value={values.shopName ?? ""} onChange={setValue} required placeholder="Heizöl-Shop Musterstadt" />
        </Section>

        <Section icon={<MapPin className="size-4" />} title="Firmensitz" description="Vollständige Geschäftsanschrift des Unternehmens.">
          <Field id="streetAddress" label="Straße & Hausnummer" value={values.streetAddress ?? ""} onChange={setValue} required placeholder="Industriestraße 12" />
          <Field id="postalCode" label="PLZ" value={values.postalCode ?? ""} onChange={setValue} required maxLength={10} placeholder="12345" />
          <Field id="city" label="Stadt" value={values.city ?? ""} onChange={setValue} required placeholder="Musterstadt" />
        </Section>

        <Section icon={<ShieldCheck className="size-4" />} title="Rechtliches" description="Angaben für Impressum und geschäftliche Dokumente.">
          <Field id="registryCourt" label="Amtsgericht" value={values.registryCourt ?? ""} onChange={setValue} required placeholder="Musterstadt" />
          <Field id="commercialRegisterNumber" label="Handelsregisternummer" value={values.commercialRegisterNumber ?? ""} onChange={setValue} required placeholder="HRB 12345" />
          <Field id="managingDirector" label="Geschäftsführer" value={values.managingDirector ?? ""} onChange={setValue} required placeholder="Max Mustermann" />
          <Field id="vatId" label="USt-ID" value={values.vatId ?? ""} onChange={setValue} required placeholder="DE123456789" />
        </Section>

        <Section icon={<Mail className="size-4" />} title="Kontakt" description="Zentrale Erreichbarkeit und Shop-Domain.">
          <Field id="email" label="E-Mail" value={values.email ?? ""} onChange={setValue} required type="email" placeholder="info@muster-shop.de" />
          <Field id="domain" label="Domain" value={values.domain ?? ""} onChange={setValue} required placeholder="mein-shop.de" />
        </Section>

        <Section icon={<Mail className="size-4" />} title="Resend" description="Optionaler E-Mail-Versand für dieses Branding.">
          <Field id="resendApiKey" label={branding?.resendConfigured ? "Resend API Key · hinterlegt" : "Resend API Key"} value={values.resendApiKey ?? ""} onChange={setValue} placeholder={branding?.resendConfigured ? "Leer lassen, um Schlüssel beizubehalten" : "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"} />
          <Field id="resendSenderEmail" label="Absender-E-Mail" value={values.resendSenderEmail ?? ""} onChange={setValue} type="email" placeholder="noreply@muster-shop.de" />
          <Field id="resendSenderName" label="Absendername" value={values.resendSenderName ?? ""} onChange={setValue} placeholder="Musterheizöl" />
        </Section>

        <Section icon={<MessageSquare className="size-4" />} title="Seven.io" description="Optionaler SMS-Versand für dieses Branding.">
          <Field id="sevenApiKey" label={branding?.sevenConfigured ? "Seven.io API Key · hinterlegt" : "Seven.io API Key"} value={values.sevenApiKey ?? ""} onChange={setValue} placeholder={branding?.sevenConfigured ? "Leer lassen, um Schlüssel beizubehalten" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"} />
          <Field id="sevenSenderName" label="Absendername" value={values.sevenSenderName ?? ""} onChange={setValue} maxLength={11} placeholder="Max. 11 Zeichen" />
        </Section>
      </div>

      {error ? <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-[13px] text-destructive">{error}</p> : null}
      <div className="sticky bottom-4 flex flex-col-reverse gap-3 rounded-lg border border-line bg-background/95 p-4 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center sm:justify-end">
        <span className="mr-auto text-[12px] text-muted-custom">{dirty ? "Ungespeicherte Änderungen" : branding ? "Alle Änderungen gespeichert" : "Neues Branding"}</span>
        <Button type="button" variant="outline" disabled={saving !== null || uploading} onClick={() => navigate({ to: "/admin/brandings" })}>Abbrechen</Button>
        <Button type="submit" variant="outline" disabled={saving !== null || uploading}>{saving === "draft" ? <Loader2 className="animate-spin" /> : <Save />} Als Entwurf speichern</Button>
        <Button type="button" disabled={saving !== null || uploading} onClick={() => void submit("active")}>{saving === "active" ? <Loader2 className="animate-spin" /> : <Check />} Branding aktivieren</Button>
      </div>
    </form>
  );
}