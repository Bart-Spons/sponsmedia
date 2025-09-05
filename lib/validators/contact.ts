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
    company_website: z.string().optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
