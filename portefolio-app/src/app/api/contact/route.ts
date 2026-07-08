import { NextResponse } from "next/server";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { isValidName, isValidEmail, isValidMessage } from "@/lib/validation";

/**
 * Endpoint do formulário de contacto.
 *
 * Envia dois emails via Resend (https://resend.com):
 *  1. Notificação para o James com a mensagem do cliente.
 *  2. Confirmação automática ao cliente ("respondo em <48h").
 *
 * Variáveis de ambiente (definir no Netlify → Environment variables):
 *  - RESEND_API_KEY      obrigatória; sem ela o endpoint devolve 503 e o
 *                        formulário mostra os contactos diretos como fallback
 *  - CONTACT_FROM_EMAIL  remetente verificado no Resend; enquanto não houver
 *                        domínio próprio usa-se onboarding@resend.dev (modo
 *                        de teste: só entrega ao dono da conta, por isso a
 *                        confirmação ao cliente falha silenciosamente)
 *  - CONTACT_TO_EMAIL    destino das notificações (default: email do James)
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  /** honeypot — humanos nunca preenchem este campo */
  company?: string;
  /** ms desde que o formulário abriu — bots submetem instantaneamente */
  elapsed?: number;
};

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendEmail(
  apiKey: string,
  body: {
    from: string;
    to: string[];
    subject: string;
    html: string;
    reply_to?: string;
  }
) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, reason: "unconfigured" },
      { status: 503 }
    );
  }

  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, reason: "invalid" },
      { status: 400 }
    );
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  // anti-spam: honeypot preenchido ou submissão em menos de 3 segundos.
  // Responde-se 200 para o bot não saber que foi filtrado.
  if (data.company || (typeof data.elapsed === "number" && data.elapsed < 3000)) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidName(name) || !isValidEmail(email) || !isValidMessage(message)) {
    return NextResponse.json(
      { ok: false, reason: "invalid" },
      { status: 400 }
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${SITE_NAME} <onboarding@resend.dev>`;
  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

  try {
    await sendEmail(apiKey, {
      from,
      to: [to],
      reply_to: email,
      subject: `Novo contacto no portefólio — ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
          <h2 style="margin:0 0 16px">Nova mensagem do portefólio</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mensagem:</strong></p>
          <blockquote style="margin:8px 0;padding:12px 16px;background:#f5f2ed;border-left:3px solid #60B8FF">
            ${safeMessage}
          </blockquote>
          <p style="color:#888;font-size:13px">Responde diretamente a este email para falar com ${safeName}.</p>
        </div>`,
    });
  } catch (err) {
    console.error("[contact] falha na notificação:", err);
    return NextResponse.json({ ok: false, reason: "send" }, { status: 502 });
  }

  // Confirmação ao cliente — best-effort: em modo de teste do Resend
  // (sem domínio verificado) esta chamada falha e não deve impedir o sucesso.
  try {
    await sendEmail(apiKey, {
      from,
      to: [email],
      reply_to: to,
      subject: "Recebi a tua mensagem — James Steven",
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
          <h2 style="margin:0 0 16px">Olá ${safeName},</h2>
          <p>Obrigado pela tua mensagem — já a recebi e respondo em menos de <strong>48 horas</strong>, sempre com um humano do outro lado.</p>
          <p>Se for urgente, podes falar comigo diretamente no <a href="https://wa.me/351968464987">WhatsApp</a>.</p>
          <p style="margin-top:24px">Até já,<br/>James Steven<br/>
          <span style="color:#888;font-size:13px">desenvolvedor web · viseu</span></p>
        </div>`,
    });
  } catch (err) {
    console.warn("[contact] confirmação ao cliente não enviada:", err);
  }

  return NextResponse.json({ ok: true });
}
