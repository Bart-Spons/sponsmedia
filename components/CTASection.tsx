"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validators/contact";
import { sendContact } from "@/app/actions/sendContact";
import RdxSelect from "@/components/ui/RdxSelect";

type Locale = "en" | "nl";
const MIN_MSG = 20;

export default function CTASection({
    locale = "en",
    hideHero = false,
    variant = "full",
}: {
    locale?: Locale;
    hideHero?: boolean;
    variant?: "full" | "compact";
}) {
    const startedAtRef = useRef<number>(Date.now());
    const [serverMsg, setServerMsg] = useState<{
        type: "ok" | "err";
        text: string;
    } | null>(null);

    const content = useMemo(
        () => ({
            en: {
                hero: {
                    title: "Contact",
                    subtitle:
                        "Ready to bring your digital vision to life? I'd love to hear about your project.",
                },
                form: {
                    title: "Tell Me About Your Project",
                    name: "Your Name",
                    email: "Email Address",
                    company: "Company (Optional)",
                    project: "Project Type",
                    timeline: "Timeline",
                    message: "Tell me more about your project",
                    submit: "Send Message",
                    projectTypes: [
                        "Web Development",
                        "SEO & Marketing",
                        "Design & Branding",
                        "Digital Strategy",
                        "Other",
                    ],
                    timelines: [
                        "ASAP",
                        "1-2 months",
                        "3-6 months",
                        "6+ months",
                        "Flexible",
                    ],
                    hint: "By submitting, you agree to the processing of your data as described in the Privacy Policy.",
                },
                contact: {
                    title: "Get In Touch",
                    subtitle: "Multiple ways to reach me",
                    email: "contact@sponsmedia.com",
                    location: "Netherlands",
                },
                alerts: {
                    success: "Thanks! I’ll get back to you soon.",
                    fast: "That was quick—please wait a moment and try again.",
                    fail: "Something went wrong while sending. Please try again later.",
                },
            },
            nl: {
                hero: {
                    title: "Contact",
                    subtitle:
                        "Klaar om je digitale visie tot leven te brengen? Ik hoor graag over je project.",
                },
                form: {
                    title: "Vertel Me Over Je Project",
                    name: "Je Naam",
                    email: "E-mailadres",
                    company: "Bedrijf (Optioneel)",
                    project: "Project Type",
                    timeline: "Tijdslijn",
                    message: "Vertel me meer over je project",
                    submit: "Verstuur Bericht",
                    projectTypes: [
                        "Website ontwikkeling",
                        "Digitale Strategie",
                        "SEO & Marketing",
                        "Design & Branding",
                        "Anders",
                    ],
                    timelines: [
                        "Zo snel mogelijk",
                        "1-2 maanden",
                        "3-6 maanden",
                        "6+ maanden",
                        "Flexibel",
                    ],
                    hint: "Door te versturen ga je akkoord met de verwerking van je gegevens zoals beschreven in de Privacy Policy.",
                },
                contact: {
                    title: "Neem Contact Op",
                    subtitle: "Verschillende manieren om me te bereiken",
                    email: "contact@sponsmedia.com",
                    location: "Nederland",
                },
                alerts: {
                    success: "Bedankt! Ik neem snel contact met je op.",
                    fast: "Dat ging wel heel snel—wacht even en probeer opnieuw.",
                    fail: "Er ging iets mis met versturen. Probeer het later opnieuw.",
                },
            },
        }),
        []
    );

    const t = content[locale];

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
        reset,
        watch,
        control,
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            company: "",
            projectType: t.form.projectTypes[0],
            timeline: t.form.timelines[0],
            message: "",
            company_website: "",
        },
    });

    const messageValue = watch("message", "");
    const chars = messageValue?.length ?? 0;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                name: "",
                email: "",
                company: "",
                projectType: t.form.projectTypes[0],
                timeline: t.form.timelines[0],
                message: "",
                company_website: "",
            });
        }
    }, [isSubmitSuccessful, reset, t.form.projectTypes, t.form.timelines]);

    const onSubmit = async (values: ContactInput) => {
        setServerMsg(null);
        const fd = new FormData();
        Object.entries({ ...values, startedAt: startedAtRef.current }).forEach(
            ([k, v]) => fd.append(k, String(v ?? ""))
        );
        const res = await sendContact(fd);

        if (res.ok) setServerMsg({ type: "ok", text: t.alerts.success });
        else if (res.code === "too_fast")
            setServerMsg({ type: "err", text: t.alerts.fast });
        else {
            setServerMsg({ type: "err", text: t.alerts.fail });
            console.log("sendContact error:", res);
        }
    };

    const projectOptions = t.form.projectTypes.map((label) => ({
        value: label,
        label,
    }));
    const timelineOptions = t.form.timelines.map((label) => ({
        value: label,
        label,
    }));

    return (
        <section
            id="cta"
            className={
                variant === "compact"
                    ? "py-12 bg-transparent"
                    : "py-20 bg-transparent"
            }
        >
            <div className="container">
                {!hideHero && (
                    <div
                        className={`text-center ${
                            variant === "compact" ? "mb-6" : "mb-10"
                        }`}
                    >
                        <h2
                            className={`font-bold text-white ${
                                variant === "compact"
                                    ? "text-4xl"
                                    : "text-4xl md:text-5xl"
                            } mb-4`}
                        >
                            {t.hero.title}
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            {t.hero.subtitle}
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Form */}
                    <div className="md:col-span-2">
                        <div className="rounded-2xl p-8 shadow-lg border border-white/10 bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#10141c]">
                            <h2 className="text-2xl font-bold text-white mb-8">
                                {t.form.title}
                            </h2>

                            {serverMsg && (
                                <p
                                    className={`mb-4 text-sm ${
                                        serverMsg.type === "ok"
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {serverMsg.text}
                                </p>
                            )}

                            <form
                                className="space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                {/* Honeypot + time-trap */}
                                <input
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    className="hidden"
                                    {...register("company_website")}
                                />
                                <input
                                    type="hidden"
                                    value={startedAtRef.current}
                                    {...register("startedAt")}
                                />

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                        >
                                            {t.form.name}
                                        </label>
                                        <input
                                            id="name"
                                            {...register("name")}
                                            required
                                            autoComplete="name"
                                            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e2b76f] focus:ring-2 focus:ring-[#e2b76f]/40"
                                            placeholder={
                                                locale === "nl"
                                                    ? "Jan Jansen"
                                                    : "John Doe"
                                            }
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                        >
                                            {t.form.email}
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            inputMode="email"
                                            {...register("email")}
                                            required
                                            autoComplete="email"
                                            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e2b76f] focus:ring-2 focus:ring-[#e2b76f]/40"
                                            placeholder={
                                                locale === "nl"
                                                    ? "jan@bedrijf.nl"
                                                    : "john@company.com"
                                            }
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="company"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        {t.form.company}
                                    </label>
                                    <input
                                        id="company"
                                        {...register("company")}
                                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e2b76f] focus:ring-2 focus:ring-[#e2b76f]/40"
                                        placeholder={
                                            locale === "nl"
                                                ? "Jouw Bedrijf"
                                                : "Your Company"
                                        }
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Project Type */}
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {t.form.project}
                                        </label>
                                        <Controller
                                            name="projectType"
                                            control={control}
                                            render={({ field }) => (
                                                <RdxSelect
                                                    value={field.value}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    placeholder={t.form.project}
                                                    options={t.form.projectTypes.map(
                                                        (label) => ({
                                                            value: label,
                                                            label,
                                                        })
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>

                                    {/* Timeline */}
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {t.form.timeline}
                                        </label>
                                        <Controller
                                            name="timeline"
                                            control={control}
                                            render={({ field }) => (
                                                <RdxSelect
                                                    value={field.value}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    placeholder={
                                                        t.form.timeline
                                                    }
                                                    options={t.form.timelines.map(
                                                        (label) => ({
                                                            value: label,
                                                            label,
                                                        })
                                                    )}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        {t.form.message}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        {...register("message")}
                                        required
                                        minLength={MIN_MSG}
                                        aria-describedby="message-hint message-count"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e2b76f] focus:ring-2 focus:ring-[#e2b76f]/40 resize-none"
                                        placeholder={
                                            locale === "nl"
                                                ? "Vertel over je project, doelgroep en specifieke wensen..."
                                                : "Tell me about your project, audience and any specific requirements..."
                                        }
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-400">
                                            {errors.message.message}
                                        </p>
                                    )}
                                    <div className="mt-1 flex items-center justify-between">
                                        <p
                                            id="message-hint"
                                            className="text-xs text-gray-400"
                                        >
                                            {locale === "nl"
                                                ? `Minimaal ${MIN_MSG} tekens`
                                                : `Minimum ${MIN_MSG} characters`}
                                        </p>
                                        <p
                                            id="message-count"
                                            className={`text-xs ${
                                                chars < MIN_MSG
                                                    ? "text-red-400"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {chars}/{MIN_MSG}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className={`w-full px-6 py-4 rounded-xl font-semibold text-black
                    bg-gradient-to-b from-[#e2b76f] to-[#d4a95f] transition-all duration-200
                    ${
                        isValid && !isSubmitting
                            ? "hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0_0_20px_rgba(226,183,111,0.35)] hover:ring-2 hover:ring-[#e2b76f]/40 hover:ring-offset-2 hover:ring-offset-black"
                            : "opacity-80 cursor-not-allowed"
                    }`}
                                >
                                    {isSubmitting
                                        ? locale === "nl"
                                            ? "Versturen…"
                                            : "Sending…"
                                        : t.form.submit}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact + Socials */}
                    <div className="space-y-8 md:sticky md:top-8">
                        <div className="rounded-4xl bg-black/60 p-6 shadow-lg border border-white/10 bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#10141c]">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {t.contact.title}
                            </h3>
                            <p className="text-gray-300 mb-4">
                                {t.contact.subtitle}
                            </p>

                            <div className="space-y-4">
                                <a
                                    href={`mailto:${t.contact.email}`}
                                    className="flex items-center gap-3 group"
                                    aria-label="Email"
                                >
                                    <span className="w-6 h-6 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-[#e2b76f] transition-transform group-hover:scale-110"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M3 5h18v14H3V5Zm9 7L4 7h16l-8 5Z" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">
                                        {t.contact.email}
                                    </span>
                                </a>

                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-red-500"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-300">
                                        {t.contact.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-black/60 p-6 shadow-lg border border-white/10 bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#10141c]">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Follow My Work
                            </h3>

                            <div className="space-y-3">
                                <a
                                    href="https://instagram.com/sponsmedia_"
                                    target="_blank"
                                    rel="noopener noreferrer me"
                                    className="flex items-center gap-3 group"
                                    aria-label="Instagram"
                                >
                                    <span className="w-6 h-6 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-pink-500 transition-transform group-hover:scale-110"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">
                                        Instagram
                                    </span>
                                </a>

                                <a
                                    href="https://linkedin.com/company/sponsmedia/"
                                    target="_blank"
                                    rel="noopener noreferrer me"
                                    className="flex items-center gap-3 group"
                                    aria-label="LinkedIn"
                                >
                                    <span className="w-6 h-6 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-[#0A66C2] transition-transform group-hover:scale-110"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">
                                        LinkedIn
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
