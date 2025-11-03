import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { verifyToken, createResponse } from '../../../../lib/auth';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value;

    if (accessToken) {
      const decoded = verifyToken(accessToken);

      if (decoded) {
        await prisma.userSession.deleteMany({
          where: {
            userId: decoded.userId,
            expiresAt: {
              gt: new Date()
            }
          }
        });
      }
    }

    const clearAccessTokenCookie = serialize('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0
    });

    const clearRefreshTokenCookie = serialize('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0
    });

    const response = NextResponse.json(
      createResponse(true, { message: 'Logout successful' }),
      { status: 200 }
    );

    response.headers.set('Set-Cookie', `${clearAccessTokenCookie}; ${clearRefreshTokenCookie}`);

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred during logout'
      }),
      { status: 500 }
    );
  }
}