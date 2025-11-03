'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormErrors {
  email?: string;
  general?: string;
  success?: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ForgotPasswordFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        general: undefined,
        success: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ForgotPasswordFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setErrors({
          success: data.data.message
        });
      } else {
        setErrors({
          general: data.error?.message || 'Failed to send password reset email. Please try again.'
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

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#e8f5e8' }}
        >
          <svg
            className="w-8 h-8"
            style={{ color: '#4caf50' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
          Check Your Email
        </h2>

        <p
          className="text-gray-600 mb-6"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          We've sent a password reset link to your email address.
          Please check your inbox and follow the instructions to reset your password.
        </p>

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

        <div className="space-y-3">
          <Button
            onClick={() => window.location.href = '/login'}
            className="w-full"
          >
            Return to Login
          </Button>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ email: '' });
              setErrors({});
            }}
            className="w-full text-sm text-gray-600 hover:underline"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Send another reset link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            fontFamily: 'Rubik, Arial, sans-serif',
            color: '#000090'
          }}
        >
          Reset Password
        </h1>
        <p
          className="text-gray-600"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
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

        {errors.success && (
          <div
            className="p-3 rounded-lg text-sm"
            style={{
              backgroundColor: '#e8f5e8',
              color: '#2e7d32',
              border: '1px solid #c8e6c9'
            }}
          >
            {errors.success}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          Send Reset Link
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
  );
};