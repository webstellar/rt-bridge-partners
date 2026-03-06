import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { firstName, email } = await req.json();

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "First name and email are required." },
        { status: 400 }
      );
    }

    // Configure your SMTP transporter
    // For production, set these values via environment variables:
    //   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER || "noreply@bridgepartners.com",
      to: "pete.onyegbule@gmail.com",
      subject: `New Contact: ${firstName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
