import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validate(payload: ContactPayload) {
  const errors: string[] = [];

  if (!payload.firstName.trim()) errors.push("First name is required.");
  if (!payload.lastName.trim()) errors.push("Last name is required.");
  if (!payload.email.trim()) errors.push("Email is required.");
  if (!payload.message.trim()) errors.push("Message is required.");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (payload.email && !emailOk) errors.push("Email is invalid.");

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const payload: ContactPayload = {
      firstName: body.firstName?.trim() ?? "",
      lastName: body.lastName?.trim() ?? "",
      email: body.email?.trim() ?? "",
      company: body.company?.trim() ?? "",
      budget: body.budget?.trim() ?? "",
      message: body.message?.trim() ?? "",
    };

    const errors = validate(payload);

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY || !to || !from) {
      return NextResponse.json(
        { ok: false, error: "Missing email configuration." },
        { status: 500 },
      );
    }

    const subject = `New contact form submission from ${payload.firstName} ${payload.lastName}`;

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(payload.company || "—")}</p>
        <p><strong>Budget:</strong> ${escapeHtml(payload.budget || "—")}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 12px 14px; background: #f6f6f6; border: 1px solid #e6e6e6; white-space: pre-wrap;">
          ${escapeHtml(payload.message)}
        </div>
      </div>
    `;

    const text = [
      "New Contact Form Submission",
      "",
      `Name: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || "—"}`,
      `Budget: ${payload.budget || "—"}`,
      "",
      "Message:",
      payload.message,
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject,
      html,
      text,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
