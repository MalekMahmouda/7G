import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/auth';
import { verifyToken, createResponse } from '../../../../lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'NO_FILE',
          message: 'No file provided'
        }),
        { status: 400 }
      );
    }

    const maxSize = parseInt(process.env.MAX_FILE_SIZE || '5242880'); // 5MB default

    if (file.size > maxSize) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'FILE_TOO_LARGE',
          message: 'File size exceeds maximum allowed size'
        }),
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        createResponse(false, null, {
          code: 'INVALID_FILE_TYPE',
          message: 'Only JPEG, PNG, and WebP images are allowed'
        }),
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = process.env.UPLOAD_DIR || './public/uploads';

    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    const filename = `${decoded.userId}-${Date.now()}.${file.type.split('/')[1]}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const avatarUrl = `/uploads/${filename}`;

    await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        avatarUrl
      }
    });

    return NextResponse.json(
      createResponse(true, {
        avatarUrl,
        message: 'Avatar uploaded successfully'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Upload avatar error:', error);
    return NextResponse.json(
      createResponse(false, null, {
        code: 'SERVER_ERROR',
        message: 'An error occurred while uploading avatar'
      }),
      { status: 500 }
    );
  }
}