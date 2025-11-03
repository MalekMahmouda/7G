import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { verifyPassword, createResponse } from '../../../../lib/auth';

export async function DELETE(request: NextRequest) {
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
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'PASSWORD_REQUIRED',
          message: 'Password is required to delete account'
        }),
        { status: 400 }
      );
    }

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

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'INVALID_PASSWORD',
          message: 'Password is incorrect'
        }),
        { status: 400 }
      );
    }

    await prisma.userSession.deleteMany({
      where: {
        userId: decoded.userId
      }
    });

    await prisma.user.delete({
      where: { id: decoded.userId }
    });

    const response = NextResponse.json(
      createResponse(true, {
        message: 'Account deleted successfully'
      }),
      { status: 200 }
    );

    response.headers.set('Set-Cookie', [
      'access_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
      'refresh_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
    ].join(', '));

    return response;

  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while deleting account'
      }),
      { status: 500 }
    );
  }
}