import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { verifyToken, createResponse } from '../../../../lib/auth';
import { updateProfileSchema } from '../../../../lib/validations';

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
    console.error('Get profile error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while fetching profile'
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    const { error, value } = updateProfileSchema.validate(body);

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

    const { username, email, bio } = value;

    const existingUser = await prisma.user.findFirst({
      where: {
        AND: [
          { id: { not: decoded.userId } },
          {
            OR: [
              ...(username ? [{ username }] : []),
              ...(email ? [{ email }] : [])
            ]
          }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json(
          createResponse(false, null, {
            code: 'USERNAME_EXISTS',
            message: 'Username already exists'
          }),
          { status: 400 }
        );
      }

      if (existingUser.email === email) {
        return NextResponse.json(
          createResponse(false, null, {
            code: 'EMAIL_EXISTS',
            message: 'Email already exists'
          }),
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio;

    if (email !== undefined && email !== decoded.email) {
      updateData.email = email;
      updateData.emailVerified = false;
      updateData.emailVerificationToken = require('../../../../lib/auth').generateEmailToken();
      updateData.emailVerificationExpires = require('../../../../lib/auth').generateEmailExpiry();
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
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

    if (email !== undefined && email !== decoded.email) {
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${updateData.emailVerificationToken}`;

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Verify your new email address',
          html: `
            <h2>Email Address Changed</h2>
            <p>You've updated your email address. Please click the link below to verify your new email:</p>
            <a href="${verificationUrl}" style="background-color: #000090; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify New Email</a>
            <p>Or copy and paste this link: ${verificationUrl}</p>
            <p>This link will expire in 24 hours.</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
      }
    }

    return NextResponse.json(
      createResponse(true, {
        user: updatedUser,
        message: email !== undefined && email !== decoded.email
          ? 'Profile updated. Please check your new email to verify it.'
          : 'Profile updated successfully'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while updating profile'
      }),
      { status: 500 }
    );
  }
}