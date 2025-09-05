import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    company: z.string().optional(),
    projectType: z.string().min(1, { message: "Choose a project type" }),
    timeline: z.string().min(1, { message: "Choose a timeline" }),
    message: z
        .string()
        .min(20, { message: "Please write at least 20 characters" }),
    // Honeypot -> client-side niet blokkeren; server-side controleren
    company_website: z.string().optional(),
    // Belangrijk: coerce naar number, anders blijft het formulier 'invalid'
    startedAt: z.coerce.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
