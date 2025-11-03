'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface ResetPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
  success?: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    token: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setErrors({
        general: 'Reset token is missing. Please request a new password reset link.'
      });
      setIsValidToken(false);
    } else {
      setFormData(prev => ({ ...prev, token }));
      setIsValidToken(true);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ResetPasswordFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        general: undefined,
        success: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ResetPasswordFormErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !isValidToken) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: formData.token,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        setErrors({
          success: data.data.message
        });
        setTimeout(() => {
          router.push('/login?message=password-reset-success');
        }, 3000);
      } else {
        setErrors({
          general: data.error?.message || 'Failed to reset password. Please try again.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (isValidToken === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#ffebee' }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: '#d32f2f' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: 'Rubik, Arial, sans-serif',
                color: '#000090'
              }}
            >
              Invalid Reset Link
            </h2>

            <p
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {errors.general || 'This password reset link is invalid or has expired.'}
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => router.push('/forgot-password')}
                className="w-full"
              >
                Request New Reset Link
              </Button>

              <button
                onClick={() => router.push('/login')}
                className="w-full text-sm text-blue-900 hover:underline"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isValidToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating reset token...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: 'Rubik, Arial, sans-serif',
              color: '#000090'
            }}
          >
            Set New Password
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Choose a strong password for your account
          </p>
        </div>

        {errors.success && (
          <div
            className="p-3 rounded-lg text-sm mb-4"
            style={{
              backgroundColor: '#e8f5e8',
              color: '#2e7d32',
              border: '1px solid #c8e6c9'
            }}
          >
            {errors.success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            disabled={loading}
          />

          <Input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            disabled={loading}
          />

          {errors.general && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: '#ffebee',
                color: '#d32f2f',
                border: '1px solid #ffcdd2'
              }}
            >
              {errors.general}
            </div>
          )}

          <div
            className="p-3 rounded-lg text-xs"
            style={{
              backgroundColor: '#e3f2fd',
              color: '#1565c0',
              border: '1px solid #bbdefb'
            }}
          >
            <strong>Password requirements:</strong>
            <ul className="mt-1 ml-4 list-disc">
              <li>At least 8 characters long</li>
              <li>Contains uppercase and lowercase letters</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character</li>
            </ul>
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            Reset Password
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm font-semibold hover:underline"
            style={{ color: '#000090' }}
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}