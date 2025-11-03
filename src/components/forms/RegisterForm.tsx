'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must be no more than 20 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

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

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to login with success message
        router.push('/login?message=registration-success');
      } else {
        if (data.error?.code === 'EMAIL_EXISTS') {
          setErrors({ email: data.error.message });
        } else if (data.error?.code === 'USERNAME_EXISTS') {
          setErrors({ username: data.error.message });
        } else {
          setErrors({
            general: data.error?.message || 'Registration failed. Please try again.'
          });
        }
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
          Join 8E
        </h1>
        <p
          className="text-gray-600"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Create your account to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username}
          required
          disabled={loading}
        />

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

        <Input
          type="password"
          placeholder="Confirm password"
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
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p
          className="text-sm text-gray-600"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Already have an account?{' '}
          <a
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: '#000090' }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};