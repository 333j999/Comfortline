import { NextResponse } from "next/server";
import { Resend } from "resend";

const DURATION_LABEL: Record<string, string> = {
  "30": "30 min",
  "60": "1 hour",
  "90": "1h 30",
  "120": "2 hours",
};

const PLATFORM_LABEL: Record<string, string> = {
  text: "text",
  voice: "voice note",
  call: "call",
};

type Body = {
  name?: string;
  contact?: string;
  gender?: string;
  platform?: string;
  duration?: string;
  date?: string;
  topics?: string[];
  detail?: string;
  /** hidden field. bots fill this in; humans don't. */
  website?: string;
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL || "ComfortLine <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  // Honeypot — silently drop bot submissions.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const contact = (body.contact || "").trim();
  const gender = (body.gender || "").trim();

  if (!name || !contact || !gender) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const platform = body.platform || "";
  const duration = body.duration || "";
  const date = (body.date || "").trim();
  const topics = Array.isArray(body.topics) ? body.topics : [];
  const detail = (body.detail || "").trim();

  const platformLabel = PLATFORM_LABEL[platform] || platform || "—";
  const durationLabel = DURATION_LABEL[duration] || duration || "—";

  const rows: [string, string][] = [
    ["name", name],
    ["contact", contact],
    ["gender", gender],
    ["platform", platformLabel],
    ["duration", durationLabel],
  ];
  if (date) rows.push(["preferred date", date]);
  if (topics.length) rows.push(["topics", topics.join(", ")]);

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#7a7568;width:140px;vertical-align:top;">${escapeHtml(
          k
        )}</td><td style="padding:8px 0;color:#1a1a1a;">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  const detailBlock = detail
    ? `<div style="margin-top:24px;"><div style="color:#7a7568;font-size:13px;margin-bottom:8px;">anything else</div><div style="background:#f4f1ea;padding:14px 18px;border-radius:12px;white-space:pre-wrap;color:#1a1a1a;line-height:1.55;">${escapeHtml(
        detail
      )}</div></div>`
    : "";

  const html = `<!doctype html>
<html><body style="margin:0;background:#fafafa;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;padding:32px;border-radius:16px;border:1px solid #ececec;">
    <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a89c7e;">new booking</div>
    <h2 style="font-family:'Georgia',serif;font-style:italic;font-weight:400;font-size:28px;color:#1a1a1a;margin:8px 0 24px 0;">someone reached out via comfort line.</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table>
    ${detailBlock}
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #ececec;color:#a89c7e;font-size:12px;">reply directly to this email to reach them at their contact.</div>
  </div>
</body></html>`;

  const text = [
    "new comfort line booking.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    ...(detail ? ["", "anything else:", detail] : []),
  ].join("\n");

  const resend = new Resend(apiKey);
  const isEmail = contact.includes("@") && /\S+@\S+\.\S+/.test(contact);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `new booking: ${name}`,
      html,
      text,
      ...(isEmail ? { replyTo: contact } : {}),
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    // Customer confirmation — fire-and-forget. We don't fail the whole
    // submission if this errors (the booking already reached the owner).
    if (isEmail) {
      const customerHtml = `<!doctype html>
<html><body style="margin:0;background:#fafafa;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;padding:36px 32px;border-radius:16px;border:1px solid #ececec;">
    <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a89c7e;">we're here</div>
    <h2 style="font-family:'Georgia',serif;font-style:italic;font-weight:400;font-size:30px;color:#1a1a1a;margin:8px 0 20px 0;line-height:1.15;">thank you, ${escapeHtml(
      name
    )}.</h2>
    <p style="font-size:15px;line-height:1.65;color:#3a3a3a;margin:0 0 14px 0;">we got your booking. an experienced listener will reach out within the hour at the contact you gave us.</p>
    <p style="font-size:15px;line-height:1.65;color:#3a3a3a;margin:0 0 14px 0;">you don't have to prepare anything to say. just be somewhere you can talk freely — text, voice notes, or a call, your choice.</p>
    <p style="font-size:15px;line-height:1.65;color:#3a3a3a;margin:0 0 14px 0;">if you change your mind, that's okay too. just reply to this email and we'll cancel — no questions.</p>
    <div style="margin-top:28px;padding-top:18px;border-top:1px solid #ececec;color:#a89c7e;font-size:12px;line-height:1.55;">comfort line is anonymous emotional support — not therapy or emergency care. if you're in crisis, please contact your local helpline (UK: Samaritans 116 123 · Shout text 85258 · 999 if life is in danger).</div>
  </div>
</body></html>`;

      const customerText = [
        `thank you, ${name}.`,
        "",
        "we got your booking. an experienced listener will reach out within the hour at the contact you gave us.",
        "",
        "you don't have to prepare anything to say. just be somewhere you can talk freely — text, voice notes, or a call, your choice.",
        "",
        "if you change your mind, that's okay too. just reply to this email and we'll cancel — no questions.",
        "",
        "—",
        "comfort line is anonymous emotional support — not therapy or emergency care.",
        "if you're in crisis, please contact a local helpline.",
        "UK: Samaritans 116 123 · Shout text 85258 · 999 if life is in danger.",
      ].join("\n");

      try {
        await resend.emails.send({
          from,
          to: contact,
          subject: "we got you · comfort line",
          html: customerHtml,
          text: customerText,
        });
      } catch (confirmErr) {
        console.error("Customer confirmation send failed (non-fatal):", confirmErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Unexpected send error:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
