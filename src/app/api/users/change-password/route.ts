import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { verifyPassword, hashPassword, createResponse } from '../../../../lib/auth';
import { changePasswordSchema } from '../../../../lib/validations';

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'NO_TOKEN',
          message: 'No authentication token provided'
        }),
        { status: 401 }
      );
    }

    const decoded = verifyToken(accessToken);

    if (!decoded) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired authentication token'
        }),
        { status: 401 }
      );
    }

    const body = await request.json();
    const { error, value } = changePasswordSchema.validate(body);

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

    const { currentPassword, newPassword } = value;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }),
        { status: 404 }
      );
    }

    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.passwordHash);

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'INVALID_CURRENT_PASSWORD',
          message: 'Current password is incorrect'
        }),
        { status: 400 }
      );
    }

    const newPasswordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        passwordHash: newPasswordHash
      }
    });

    await prisma.userSession.deleteMany({
      where: {
        userId: decoded.userId
      }
    });

    return NextResponse.json(
      createResponse(true, {
        message: 'Password changed successfully. Please log in again with your new password.'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while changing password'
      }),
      { status: 500 }
    );
  }
}