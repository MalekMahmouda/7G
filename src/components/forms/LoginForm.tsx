'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  identifier?: string;
  password?: string;
  general?: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to dashboard on successful login
        router.push('/dashboard');
      } else {
        setErrors({
          general: data.error?.message || 'Login failed. Please try again.'
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
          Welcome to 8E
        </h1>
        <p
          className="text-gray-600"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Email or username"
          name="identifier"
          value={formData.identifier}
          onChange={handleInputChange}
          error={errors.identifier}
          required
          disabled={loading}
        />

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={loading}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center" style={{ fontFamily: 'Arial, sans-serif' }}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={loading}
              className="mr-2"
              style={{ accentColor: '#000090' }}
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>

          <a
            href="/forgot-password"
            className="text-sm hover:underline"
            style={{ color: '#000090' }}
          >
            Forgot password?
          </a>
        </div>

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

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p
          className="text-sm text-gray-600"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-semibold hover:underline"
            style={{ color: '#000090' }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};