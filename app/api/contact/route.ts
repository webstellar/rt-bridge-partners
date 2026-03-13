import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_q7tw345D_kv7qzNnQmzZzCba2quVY6vsp");

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, company, market, message } = await req.json();

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "First name and email are required." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Contact Form <no-reply@bridgepartners.pro>",
      replyTo: email,
      to: "x.carbonel@gmail.com",
      cc: "pete.onyegbule@gmail.com",
      subject: `For BridgePartners - New Contact: ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact Submission</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">

          <!-- Wrapper -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background-color:#03b209;padding:36px 40px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
                        RhinoTech
                      </h1>
                      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;letter-spacing:2px;text-transform:uppercase;">
                        New Contact Form Submission
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">

                      <p style="margin:0 0 24px;font-size:15px;color:#444444;line-height:1.6;">
                        You have received a new message via your website contact form. Details are below.
                      </p>

                      <!-- Divider -->
                      <hr style="border:none;border-top:2px solid #03b209;margin:0 0 28px;" />

                      <!-- Field: Full Name -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                          <td style="width:140px;font-size:12px;font-weight:700;color:#03b209;text-transform:uppercase;letter-spacing:1px;padding-top:2px;">
                            Full Name
                          </td>
                          <td style="font-size:15px;color:#222222;font-weight:600;">
                            ${fullName}
                          </td>
                        </tr>
                      </table>

                      <!-- Field: Email -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                          <td style="width:140px;font-size:12px;font-weight:700;color:#03b209;text-transform:uppercase;letter-spacing:1px;padding-top:2px;">
                            Email
                          </td>
                          <td style="font-size:15px;color:#222222;">
                            <a href="mailto:${email}" style="color:#03b209;text-decoration:none;">${email}</a>
                          </td>
                        </tr>
                      </table>

                      <!-- Field: Company -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                          <td style="width:140px;font-size:12px;font-weight:700;color:#03b209;text-transform:uppercase;letter-spacing:1px;padding-top:2px;">
                            Company
                          </td>
                          <td style="font-size:15px;color:#222222;">
                            ${company || "—"}
                          </td>
                        </tr>
                      </table>

                      <!-- Field: Market -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                          <td style="width:140px;font-size:12px;font-weight:700;color:#03b209;text-transform:uppercase;letter-spacing:1px;padding-top:2px;">
                            Market
                          </td>
                          <td style="font-size:15px;color:#222222;">
                            ${market || "—"}
                          </td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 24px;" />

                      <!-- Field: Message -->
                      <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#03b209;text-transform:uppercase;letter-spacing:1px;">
                        Message
                      </p>
                      <div style="background-color:#f9f9f9;border-left:4px solid #03b209;padding:16px 20px;border-radius:4px;font-size:15px;color:#333333;line-height:1.7;">
                        ${message || "No message provided."}
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#1a1a1a;padding:24px 40px;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#888888;">
                        This email was sent automatically from your website contact form.
                      </p>
                      <p style="margin:8px 0 0;font-size:12px;color:#555555;">
                        © ${new Date().getFullYear()} RhinoTech. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    });

    //Using Nodemailer
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      replyTo: email,
      to: "x.carbonel@gmail.com",
      subject: `New Contact: ${fullName}`,
      cc: "pete.onyegbule@gmail.com",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Market:</strong> ${market}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
