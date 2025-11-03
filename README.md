# 8E - Secure Authentication Web Application

8E is a modern, secure web application that provides comprehensive user authentication and account management functionality. Built with Next.js 14, TypeScript, and PostgreSQL, this application demonstrates industry-standard security practices and user-friendly design.

## Features

### 🔐 Authentication System
- **User Registration**: Sign up with email validation and password complexity requirements
- **Secure Login**: JWT-based authentication with httpOnly cookies
- **Password Reset**: Secure forgot password flow with email verification
- **Email Verification**: Required email verification before account activation
- **Session Management**: Secure token handling with automatic expiry

### 👤 User Management
- **Profile Management**: Edit username, email, and bio
- **Avatar Upload**: Upload and manage profile pictures
- **Password Change**: Secure password change with current password verification
- **Account Deletion**: Complete account deletion with confirmation

### 🛡️ Security Features
- **Password Hashing**: bcrypt with cost factor 12
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Server-side validation for all inputs
- **CSRF Protection**: Built-in CSRF protection
- **SQL Injection Prevention**: Parameterized queries via Prisma

### 📱 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Visual feedback during all operations
- **Error Handling**: User-friendly error messages and recovery options
- **Accessibility**: WCAG AA compliant design

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Backend**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with httpOnly cookies
- **Styling**: CSS with Tailwind-inspired utility classes
- **Validation**: Joi for server-side validation
- **File Uploads**: Multer for avatar uploads
- **Email**: Nodemailer for transactional emails

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Email service provider (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 8E
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables in `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/8e_db"

   # JWT Secret (generate with: openssl rand -base64 32)
   JWT_SECRET="your-super-secret-jwt-key-here"

   # Next.js
   NEXTAUTH_SECRET="your-nextauth-secret-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Email Service
   EMAIL_FROM="noreply@8e-app.com"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"

   # File Upload
   UPLOAD_DIR="./public/uploads"
   MAX_FILE_SIZE=5242880  # 5MB
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Create database tables
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password
- `POST /api/users/upload-avatar` - Upload profile picture
- `DELETE /api/users/account` - Delete user account

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token VARCHAR(255),
  email_verification_expires TIMESTAMP,
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  avatar_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

### Sessions Table
```sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_jti VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Considerations

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Rate Limiting
- 5 authentication attempts per 15 minutes per IP
- 3 password reset requests per 15 minutes per IP

### Token Security
- JWT access tokens expire in 15 minutes
- Refresh tokens (optional) expire in 7 days
- Tokens are stored in httpOnly cookies
- Automatic token invalidation on password change

## Deployment

### Production Deployment with Vercel

1. **Set up database**
   - Create a Supabase or Railway PostgreSQL database
   - Get the connection string

2. **Configure environment variables**
   - Set all required environment variables in Vercel dashboard
   - Ensure `NEXTAUTH_URL` matches your production domain

3. **Deploy database schema**
   ```bash
   npx prisma db push --prod
   ```

4. **Connect repository**
   - Connect your GitHub repository to Vercel
   - Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to configure these in your hosting environment:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Strong random secret (32+ characters)
- `NEXTAUTH_SECRET` - Next.js secret
- `NEXTAUTH_URL` - Your production URL
- `EMAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email settings

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Code Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── dashboard/         # Dashboard page
│   ├── profile/           # Profile management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── middleware.ts      # Authentication middleware
├── components/            # React components
│   ├── forms/            # Authentication forms
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utility functions
│   ├── auth.ts           # Authentication utilities
│   └── validations.ts    # Input validation schemas
└── styles/               # Additional styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.