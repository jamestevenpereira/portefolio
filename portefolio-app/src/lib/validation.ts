/**
 * Validação partilhada do formulário de contacto.
 * Usada no cliente (ContactForm) e no servidor (/api/contact),
 * para que as regras sejam sempre as mesmas dos dois lados.
 */

export const NAME_MIN = 2;
export const NAME_MAX = 120;
export const EMAIL_MAX = 254;
export const MSG_MIN = 10;
export const MSG_MAX = 5000;

// Letras Unicode (inclui acentos pt-PT), espaços, hífen, apóstrofo e ponto
// (ex.: "José-Maria d'Ávila", "J. Steven"). Sem números nem símbolos.
export const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidName = (s: string) =>
  s.length >= NAME_MIN && s.length <= NAME_MAX && NAME_RE.test(s);

export const isValidEmail = (s: string) =>
  s.length <= EMAIL_MAX && EMAIL_RE.test(s);

export const isValidMessage = (s: string) =>
  s.length >= MSG_MIN && s.length <= MSG_MAX;

export const ERRORS = {
  name: "O nome não pode conter números nem símbolos.",
  email: "Introduza um email válido (ex.: nome@exemplo.pt).",
  message: `A mensagem deve ter entre ${MSG_MIN} e ${MSG_MAX} caracteres.`,
} as const;
