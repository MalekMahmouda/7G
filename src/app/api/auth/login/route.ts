import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { verifyPassword, generateToken, generateRefreshToken, generateJTI, createResponse } from '../../../../lib/auth';
import { loginSchema } from '../../../../lib/validations';
import { serialize } from 'cookie';

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
          message: 'Too many login attempts. Please try again later.'
        }),
        { status: 429 }
      );
    }

    const body = await request.json();
    const { error, value } = loginSchema.validate(body);

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

    const { identifier, password, rememberMe } = value;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email/username or password'
        }),
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email/username or password'
        }),
        { status: 401 }
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'EMAIL_NOT_VERIFIED',
          message: 'Please verify your email before logging in'
        }),
        { status: 401 }
      );
    }

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email
    };

    const accessToken = generateToken(payload);
    const refreshToken = rememberMe ? generateRefreshToken(payload) : null;
    const tokenJti = generateJTI();

    await prisma.userSession.create({
      data: {
        userId: user.id,
        tokenJti,
        expiresAt: new Date(Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000))
      }
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/'
    };

    const accessTokenCookie = serialize('access_token', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 // 15 minutes
    });

    let refreshTokenCookie = '';
    if (refreshToken) {
      refreshTokenCookie = serialize('refresh_token', refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });
    }

    const response = NextResponse.json(
      createResponse(true, {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarUrl,
          bio: user.bio,
          createdAt: user.createdAt
        },
        rememberMe
      }),
      { status: 200 }
    );

    response.headers.set('Set-Cookie', `${accessTokenCookie}; ${refreshTokenCookie}`);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred during login'
      }),
      { status: 500 }
    );
  }
}