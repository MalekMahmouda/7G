'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (!data.success) {
          router.push('/login');
          return;
        }

        setUser(data.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: '#000090' }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Welcome Message */}
              <div className="flex-1">
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#000090' }}
                >
                  Welcome back, {user.username}!
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your account today.
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>Member since {formatDate(user.createdAt)}</span>
                  {user.lastLogin && (
                    <span>Last login {formatDate(user.lastLogin)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#000090' }}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Edit Profile Card */}
            <Link
              href="/profile"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#e3f2fd' }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: '#1976d2' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Edit Profile</h3>
                  <p className="text-sm text-gray-600">Update your information</p>
                </div>
              </div>
            </Link>

            {/* Security Settings Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#e8f5e8' }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: '#388e3c' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Security</h3>
                  <p className="text-sm text-gray-600">Change password</p>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: user.emailVerified ? '#e8f5e8' : '#fff3e0'
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: user.emailVerified ? '#388e3c' : '#f57c00' }}
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
                <div>
                  <h3 className="font-semibold text-gray-900">Email Status</h3>
                  <p className="text-sm text-gray-600">
                    {user.emailVerified ? 'Verified' : 'Not verified'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#000090' }}>
              Profile Information
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <p className="text-gray-900 font-medium">{user.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                {user.bio && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <p className="text-gray-900">{user.bio}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <span
                      className="px-2 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor: user.emailVerified ? '#e8f5e8' : '#fff3e0',
                        color: user.emailVerified ? '#2e7d32' : '#f57c00'
                      }}
                    >
                      {user.emailVerified ? 'Verified' : 'Email Not Verified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#000090' }}>
              Account Activity
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Created
                  </label>
                  <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                </div>
                {user.lastLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Login
                    </label>
                    <p className="text-gray-900">{formatDate(user.lastLogin)}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <p className="text-gray-900">Standard User</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Features
                  </label>
                  <div className="space-y-1">
                    <p className="text-sm text-green-600">✓ Password protection</p>
                    <p className="text-sm text-green-600">✓ Secure authentication</p>
                    <p className="text-sm text-green-600">✓ Session management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}