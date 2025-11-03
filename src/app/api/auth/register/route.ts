import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { hashPassword, generateEmailToken, generateEmailExpiry, createResponse } from '../../../../lib/auth';
import { registerSchema } from '../../../../lib/validations';
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

    if (!rateLimit(ip, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many registration attempts. Please try again later.'
        }),
        { status: 429 }
      );
    }

    const body = await request.json();
    const { error, value } = registerSchema.validate(body);

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

    const { username, email, password } = value;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          createResponse(false, null, {
            code: 'EMAIL_EXISTS',
            message: 'Email already exists'
          }),
          { status: 400 }
        );
      }

      if (existingUser.username === username) {
        return NextResponse.json(
          createResponse(false, null, {
            code: 'USERNAME_EXISTS',
            message: 'Username already exists'
          }),
          { status: 400 }
        );
      }
    }

    const passwordHash = await hashPassword(password);
    const emailVerificationToken = generateEmailToken();
    const emailVerificationExpires = generateEmailExpiry();

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        emailVerificationToken,
        emailVerificationExpires
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

      const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${emailVerificationToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify your 8E account',
        html: `
          <h2>Welcome to 8E!</h2>
          <p>Thank you for registering. Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}" style="background-color: #000090; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>Or copy and paste this link: ${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    return NextResponse.json(
      createResponse(true, {
        message: 'Registration successful. Please check your email to verify your account.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          emailVerified: user.emailVerified
        }
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred during registration'
      }),
      { status: 500 }
    );
  }
}