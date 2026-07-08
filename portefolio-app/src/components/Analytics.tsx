import Script from "next/script";

/**
 * Analytics opt-in via Plausible (https://plausible.io) — sem cookies,
 * conforme RGPD, sem banner de consentimento necessário.
 *
 * Para ativar: definir NEXT_PUBLIC_PLAUSIBLE_DOMAIN no Netlify com o
 * domínio registado no Plausible (ex.: james-steven-portefolio.netlify.app
 * ou, mais tarde, o domínio próprio). Sem a variável, não carrega nada.
 */
export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
