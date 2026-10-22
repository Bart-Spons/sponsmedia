// Verstuurt het contactformulier naar public/contact.php (PHP op Hostinger).
// De site is een statische export, dus er is geen Next.js-server om dit te doen.

export type SendResult =
    | { ok: true }
    | {
          ok: false;
          code: "too_fast" | "spam" | "bad_request" | "mail_error" | "server_error";
      };

const ENDPOINT = "/contact.php";

export async function sendContact(fd: FormData): Promise<SendResult> {
    try {
        const res = await fetch(ENDPOINT, { method: "POST", body: fd });
        const data = (await res.json().catch(() => null)) as SendResult | null;
        if (data && typeof data.ok === "boolean") return data;
        return { ok: false, code: "server_error" };
    } catch {
        // Geen verbinding, of lokaal draaien zonder PHP (npm run dev)
        return { ok: false, code: "server_error" };
    }
}
