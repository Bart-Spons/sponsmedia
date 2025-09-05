"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/validators/contact";
import { headers } from "next/headers";

type SendResult =
    | { ok: true }
    | {
          ok: false;
          code:
              | "too_fast"
              | "spam"
              | "bad_request"
              | "mail_error"
              | "server_error";
      };

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(fd: FormData): Promise<SendResult> {
    try {
        const raw = Object.fromEntries(fd.entries());

        // Honeypot (server-side): als ingevuld => spam
        if (raw.company_website && String(raw.company_website).trim() !== "") {
            return { ok: false, code: "spam" };
        }

        // Validate & coerce (incl. startedAt -> number)
        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) {
            console.error("contact validation failed", parsed.error.flatten());
            return { ok: false, code: "bad_request" };
        }
        const data = parsed.data;

        // Tijd-val: te snel verstuurd? (bijv. < 5 sec)
        const elapsed = Date.now() - data.startedAt;
        if (elapsed < 5000) {
            return { ok: false, code: "too_fast" };
        }

        const to = process.env.CONTACT_TO;
        const from = process.env.CONTACT_FROM;

        if (!process.env.RESEND_API_KEY || !to || !from) {
            console.error(
                "Missing env vars RESEND_API_KEY/CONTACT_TO/CONTACT_FROM"
            );
            return { ok: false, code: "server_error" };
        }

        const hdrs = headers();
        const ip = hdrs.get("x-forwarded-for") ?? "";
        const ua = hdrs.get("user-agent") ?? "";

        const subject = `New contact: ${data.name} — ${data.projectType}`;
        const text = [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Company: ${data.company || "-"}`,
            `Project Type: ${data.projectType}`,
            `Timeline: ${data.timeline}`,
            "",
            "Message:",
            data.message,
            "",
            `Submitted at: ${new Date().toISOString()}`,
            `Started at: ${new Date(
                data.startedAt
            ).toISOString()} (${Math.round(elapsed / 1000)}s)`,
            `IP: ${ip}`,
            `UA: ${ua}`,
        ].join("\n");

        const result = await resend.emails.send({
            from,
            to,
            subject,
            text,
            replyTo: data.email,
        });

        // Het Resend SDK geeft bij fouten een 'error' terug
        if ((result as any)?.error) {
            console.error("Resend error:", (result as any).error);
            return { ok: false, code: "mail_error" };
        }

        return { ok: true };
    } catch (err) {
        console.error("sendContact exception:", err);
        return { ok: false, code: "server_error" };
    }
}
