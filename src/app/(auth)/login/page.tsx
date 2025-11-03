'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '../../../components/forms/LoginForm';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messageParam = searchParams.get('message');
    const errorParam = searchParams.get('error');

    if (messageParam === 'registration-success') {
      setMessage('Registration successful! Please check your email to verify your account before logging in.');
    } else if (messageParam === 'email-verified') {
      setMessage('Email verified successfully! You can now log in.');
    }

    if (errorParam === 'missing-token') {
      setError('Verification token is missing.');
    } else if (errorParam === 'invalid-token') {
      setError('Invalid verification token.');
    } else if (errorParam === 'invalid-or-expired-token') {
      setError('Invalid or expired verification token.');
    } else if (errorParam === 'verification-failed') {
      setError('Email verification failed. Please try again.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {message && (
          <div
            className="mb-6 p-4 rounded-lg text-sm"
            style={{
              backgroundColor: '#e8f5e8',
              color: '#2e7d32',
              border: '1px solid #c8e6c9'
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="mb-6 p-4 rounded-lg text-sm"
            style={{
              backgroundColor: '#ffebee',
              color: '#d32f2f',
              border: '1px solid #ffcdd2'
            }}
          >
            {error}
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}