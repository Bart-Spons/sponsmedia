import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Naam is te kort"),
    email: z.string().email("Voer een geldig e-mailadres in"),
    company: z.string().optional(),
    projectType: z.string().optional(),
    timeline: z.string().optional(),
    // ⬇️ hier aangepast: 20
    message: z.string().min(20, "Schrijf minimaal 20 tekens"),
    company_website: z.string().max(0).optional(), // honeypot
    startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
