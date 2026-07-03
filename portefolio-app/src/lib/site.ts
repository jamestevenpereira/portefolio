/**
 * Configuração central do site — URLs, contactos e redes sociais.
 * Quando houver domínio próprio, basta definir NEXT_PUBLIC_SITE_URL
 * no Netlify (ou mudar o fallback aqui).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://james-steven-portefolio.netlify.app";

export const SITE_NAME = "James Steven";

export const CONTACT_EMAIL = "jamestevenpereira@gmail.com";

export const WHATSAPP_URL = "https://wa.me/351968464987";

export const SOCIALS = {
  github: "https://github.com/jamestevenpereira",
  linkedin: "https://www.linkedin.com/in/james-steven-8b9b1638a/",
  instagram: "https://www.instagram.com/jamesteven_",
} as const;
