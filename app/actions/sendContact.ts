"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/validators/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(formData: FormData) {
    try {
        const raw = Object.fromEntries(formData.entries());
        const parsed = contactSchema.safeParse(raw);

        if (!parsed.success) {
            return {
                ok: false,
                code: "validation",
                details: parsed.error.flatten(),
            };
        }

        const d = parsed.data;

        // Honeypot: bots vullen deze vaak
        if (d.company_website) return { ok: true, code: "honeypot" };

        // Time-trap: min. 2.5s “leestijd”
        const now = Date.now();
        if (!d.startedAt || now - d.startedAt < 2500)
            return { ok: false, code: "too_fast" };

        const to = process.env.CONTACT_TO;
        const from = process.env.CONTACT_FROM;
        if (!process.env.RESEND_API_KEY) return { ok: false, code: "no_key" };
        if (!to || !from) return { ok: false, code: "env_missing" };

        const { error } = await resend.emails.send({
            to,
            from,
            subject: `New contact from ${d.name}`,
            replyTo: d.email,
            html: `
        <h2>New Contact</h2>
        <p><b>Name:</b> ${d.name}</p>
        <p><b>Email:</b> ${d.email}</p>
        ${d.company ? `<p><b>Company:</b> ${d.company}</p>` : ""}
        ${d.projectType ? `<p><b>Project Type:</b> ${d.projectType}</p>` : ""}
        ${d.timeline ? `<p><b>Timeline:</b> ${d.timeline}</p>` : ""}
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap">${d.message}</pre>
      `,
        });

        if (error)
            return { ok: false, code: "resend_error", details: String(error) };
        return { ok: true };
    } catch (e: any) {
        return {
            ok: false,
            code: "exception",
            details: e?.message ?? String(e),
        };
    }
}
