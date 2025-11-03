import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { verifyToken, createResponse } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
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

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        bio: true,
        emailVerified: true,
        createdAt: true,
        lastLogin: true
      }
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

    return NextResponse.json(
      createResponse(true, { user }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while fetching user data'
      }),
      { status: 500 }
    );
  }
}