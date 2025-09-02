// app/api/contact/route.ts
import { NextResponse } from "next/server";

type Payload = {
    name: string;
    email: string;
    company?: string;
    projectType?: string;
    timeline?: string;
    message: string;
};

export async function POST(req: Request) {
    const data = (await req.json()) as Payload;

    const TO = process.env.CONTACT_TO ?? "contact@sponsmedia.com";
    const FROM =
        process.env.CONTACT_FROM ?? "SponsMedia <no-reply@sponsmedia.com>";

    try {
        if (process.env.RESEND_API_KEY) {
            const { Resend } = await import("resend");
            const resend = new Resend(process.env.RESEND_API_KEY);

            await resend.emails.send({
                from: FROM,
                to: TO,
                subject: `Nieuwe projectaanvraag: ${data.name}`,
                text: [
                    `Naam: ${data.name}`,
                    `E-mail: ${data.email}`,
                    data.company ? `Bedrijf: ${data.company}` : "",
                    data.projectType ? `Projecttype: ${data.projectType}` : "",
                    data.timeline ? `Tijdlijn: ${data.timeline}` : "",
                    "",
                    "Bericht:",
                    data.message,
                ]
                    .filter(Boolean)
                    .join("\n"),
            });

            return NextResponse.json({ ok: true });
        }

        console.warn(
            "Geen mailprovider geconfigureerd (RESEND_API_KEY ontbreekt)."
        );
        return NextResponse.json(
            { ok: false, error: "Email service not configured" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Fout bij versturen van email:", err);
        return NextResponse.json(
            { ok: false, error: "Failed to send email" },
            { status: 500 }
        );
    }
}
