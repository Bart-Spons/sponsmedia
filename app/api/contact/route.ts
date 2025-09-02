import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form validation schema
const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),
    email: z
        .string()
        .min(5, "Email is too short")
        .max(254, "Email is too long")
        .email("Please enter a valid email address")
        .refine((email) => {
            // Additional email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }, "Please enter a valid email address format"),
    company: z.string().max(100, "Company name is too long").optional(),
    projectType: z.string().max(50, "Project type is too long").optional(),
    timeline: z.string().max(50, "Timeline is too long").optional(),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message is too long"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the form data
        const validatedData = contactSchema.parse(body);

        // Send email using Resend
        if (
            process.env.RESEND_API_KEY &&
            process.env.RESEND_API_KEY !== "your_resend_api_key_here"
        ) {
            try {
                console.log("📧 Attempting to send email with Resend...");
                console.log(
                    "📧 API Key present:",
                    process.env.RESEND_API_KEY ? "Yes" : "No"
                );

                const emailData = await resend.emails.send({
                    from: "SponsMedia Contact Form <noreply@sponsmedia.com>",
                    to: ["contact@sponsmedia.com"],
                    replyTo: validatedData.email,
                    subject: `New Contact Form Submission from ${validatedData.name}`,
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #4F46E5;">Contact Information</h3>
                <p><strong>Name:</strong> ${validatedData.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${
                    validatedData.email
                }">${validatedData.email}</a></p>
                ${
                    validatedData.company
                        ? `<p><strong>Company:</strong> ${validatedData.company}</p>`
                        : ""
                }
                ${
                    validatedData.projectType
                        ? `<p><strong>Project Type:</strong> ${validatedData.projectType}</p>`
                        : ""
                }
                ${
                    validatedData.timeline
                        ? `<p><strong>Timeline:</strong> ${validatedData.timeline}</p>`
                        : ""
                }
              </div>
              
              <div style="background: #fff; padding: 20px; border-left: 4px solid #4F46E5; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Project Details</h3>
                <p style="line-height: 1.6; white-space: pre-wrap;">${
                    validatedData.message
                }</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                <p>This email was sent from the SponsMedia website contact form.</p>
                <p>Submitted on: ${new Date().toLocaleString("en-US", {
                    timeZone: "Europe/Amsterdam",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })} (Amsterdam time)</p>
              </div>
            </div>
          `,
                    text: `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company || "Not specified"}
Project Type: ${validatedData.projectType || "Not specified"}
Timeline: ${validatedData.timeline || "Not specified"}

Project Details:
${validatedData.message}

---
Submitted on: ${new Date().toLocaleString("en-US", {
                        timeZone: "Europe/Amsterdam",
                    })} (Amsterdam time)
Sent from SponsMedia website contact form
          `,
                });

                console.log(
                    "✅ Email sent successfully to contact@sponsmedia.com. Response:",
                    emailData
                );
            } catch (emailError) {
                console.error(
                    "❌ Failed to send email via Resend:",
                    emailError
                );
                console.error(
                    "❌ Error details:",
                    emailError instanceof Error
                        ? emailError.message
                        : String(emailError)
                );

                // Still log the submission for manual processing
                console.log(
                    "📧 Contact form data (email failed):",
                    validatedData
                );
            }
        } else {
            // Fallback: Log to console when Resend is not configured
            console.log(
                "⚠️  Resend API key not configured. Contact form submission:"
            );
            console.log("📧 To: contact@sponsmedia.com");
            console.log(
                "📧 From:",
                validatedData.name,
                "<" + validatedData.email + ">"
            );
            console.log(
                "📧 Subject: New Contact Form Submission from",
                validatedData.name
            );
            console.log("📧 Data:", JSON.stringify(validatedData, null, 2));
        }

        return NextResponse.json(
            {
                success: true,
                message:
                    "Thank you for your message! We'll get back to you within 24 hours.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please check your form data",
                    errors: error.issues,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again later.",
            },
            { status: 500 }
        );
    }
}
