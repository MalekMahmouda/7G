import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { createResponse } from '../../../../lib/auth';
import { verifyEmailSchema } from '../../../../lib/validations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/login?error=missing-token', request.url));
    }

    const { error } = verifyEmailSchema.validate({ token });

    if (error) {
      return NextResponse.redirect(new URL('/login?error=invalid-token', request.url));
    }

    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return NextResponse.redirect(new URL('/login?error=invalid-or-expired-token', request.url));
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null
      }
    });

    return NextResponse.redirect(new URL('/login?message=email-verified', request.url));

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(new URL('/login?error=verification-failed', request.url));
  }
}