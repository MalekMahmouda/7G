import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { hashPassword, createResponse } from '../../../../lib/auth';
import { resetPasswordSchema } from '../../../../lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error, value } = resetPasswordSchema.validate(body);

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

    const { token, password } = value;

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'INVALID_OR_EXPIRED_TOKEN',
          message: 'Invalid or expired reset token'
        }),
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null
      }
    });

    await prisma.userSession.deleteMany({
      where: {
        userId: user.id
      }
    });

    return NextResponse.json(
      createResponse(true, {
        message: 'Password reset successful. Please log in with your new password.'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while resetting your password'
      }),
      { status: 500 }
    );
  }
}