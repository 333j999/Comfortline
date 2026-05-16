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
      // Surface the Resend error message in the response while we're
      // setting up. Useful for diagnosing config issues (unverified
      // domain, wrong recipient, invalid API key, etc.). Safe to keep
      // since the recipient is the site owner, not the visitor.
      return NextResponse.json(
        {
          error: "send_failed",
          detail:
            typeof error === "object" && error !== null && "message" in error
              ? String((error as { message: unknown }).message)
              : String(error),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Unexpected send error:", e);
    return NextResponse.json(
      {
        error: "server_error",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
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
