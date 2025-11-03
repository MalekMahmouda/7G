import { NextRequest, NextResponse } from 'next/server';
import { createResponse } from '../../../../lib/auth';
import nodemailer from 'nodemailer';

const rateLimitMap = new Map();

const rateLimit = (ip: string, limit: number, windowMs: number) => {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  const validTimestamps = timestamps.filter((timestamp: number) =>
    now - timestamp < windowMs
  );

  if (validTimestamps.length >= limit) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
};

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || 'unknown';

    if (!rateLimit(ip, 3, 60 * 60 * 1000)) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many contact requests. Please try again later.'
        }),
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'VALIDATION_ERROR',
          message: 'All fields are required'
        }),
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'VALIDATION_ERROR',
          message: 'Message must be at least 10 characters long'
        }),
        { status: 400 }
      );
    }

    // Send email
    try {
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `8E Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from the 8E contact form.
          </p>
        `,
      });

      // Send confirmation email to the user
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Thank you for contacting 8E',
        html: `
          <h2>Thank You for Contacting Us!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap; font-style: italic;">${message}</p>
          </div>
          <p>Best regards,<br>The 8E Team</p>
        `,
      });

    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
      // Continue even if email fails - the submission was valid
    }

    return NextResponse.json(
      createResponse(true, {
        message: 'Thank you for your message! We\'ll get back to you soon.'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request'
      }),
      { status: 500 }
    );
  }
}