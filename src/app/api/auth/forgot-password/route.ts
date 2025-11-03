import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { generateEmailToken, generatePasswordResetExpiry, createResponse } from '../../../../lib/auth';
import { forgotPasswordSchema } from '../../../../lib/validations';
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

    if (!rateLimit(ip, 3, 15 * 60 * 1000)) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many password reset requests. Please try again later.'
        }),
        { status: 429 }
      );
    }

    const body = await request.json();
    const { error, value } = forgotPasswordSchema.validate(body);

    if (error) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: error.details[0].message
        }),
        { status: 400 }
      );
    }

    const { email } = value;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        createResponse(true, {
          message: 'If an account with this email exists, a password reset link has been sent.'
        }),
        { status: 200 }
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'EMAIL_NOT_VERIFIED',
          message: 'Please verify your email before requesting a password reset'
        }),
        { status: 400 }
      );
    }

    const resetToken = generateEmailToken();
    const resetExpires = generatePasswordResetExpiry();

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires
      }
    });

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

      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset your 8E password',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the link below to set a new password:</p>
          <a href="${resetUrl}" style="background-color: #000090; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>Or copy and paste this link: ${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
    }

    return NextResponse.json(
      createResponse(true, {
        message: 'If an account with this email exists, a password reset link has been sent.'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request'
      }),
      { status: 500 }
    );
  }
}