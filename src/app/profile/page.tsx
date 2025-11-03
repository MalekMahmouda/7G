'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

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

interface ProfileFormData {
  username: string;
  email: string;
  bio: string;
}

interface ProfileFormErrors {
  username?: string;
  email?: string;
  bio?: string;
  general?: string;
  success?: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface PasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  general?: string;
  success?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    username: '',
    email: '',
    bio: ''
  });
  const [profileErrors, setProfileErrors] = useState<ProfileFormErrors>({});
  const [profileLoading, setProfileLoading] = useState(false);

  // Password form state
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<PasswordFormErrors>({});
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Avatar upload state
  const [avatarLoading, setAvatarLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/profile');
        const data = await response.json();

        if (!data.success) {
          router.push('/login');
          return;
        }

        const userData = data.data.user;
        setUser(userData);
        setProfileForm({
          username: userData.username,
          email: userData.email,
          bio: userData.bio || ''
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (profileErrors[name as keyof ProfileFormErrors]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: undefined,
        general: undefined,
        success: undefined
      }));
    }
  };

  const validateProfileForm = (): boolean => {
    const newErrors: ProfileFormErrors = {};

    if (!profileForm.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (profileForm.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (profileForm.username.length > 20) {
      newErrors.username = 'Username must be no more than 20 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(profileForm.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!profileForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (profileForm.bio && profileForm.bio.length > 500) {
      newErrors.bio = 'Bio must be no more than 500 characters long';
    }

    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    setProfileLoading(true);
    setProfileErrors({});

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => prev ? { ...prev, ...data.data.user } : null);
        setProfileErrors({
          success: data.data.message
        });
      } else {
        if (data.error?.code === 'USERNAME_EXISTS') {
          setProfileErrors({ username: data.error.message });
        } else if (data.error?.code === 'EMAIL_EXISTS') {
          setProfileErrors({ email: data.error.message });
        } else {
          setProfileErrors({
            general: data.error?.message || 'Failed to update profile'
          });
        }
      }
    } catch (error) {
      setProfileErrors({
        general: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (passwordErrors[name as keyof PasswordFormErrors]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: undefined,
        general: undefined,
        success: undefined
      }));
    }
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: PasswordFormErrors = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordForm.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character';
    }

    if (!passwordForm.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setPasswordLoading(true);
    setPasswordErrors({});

    try {
      const response = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json();

      if (data.success) {
        setPasswordErrors({
          success: data.data.message
        });
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });

        // Redirect to login after successful password change
        setTimeout(() => {
          router.push('/login?message=password-changed');
        }, 3000);
      } else {
        if (data.error?.code === 'INVALID_CURRENT_PASSWORD') {
          setPasswordErrors({ currentPassword: data.error.message });
        } else {
          setPasswordErrors({
            general: data.error?.message || 'Failed to change password'
          });
        }
      }
    } catch (error) {
      setPasswordErrors({
        general: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setAvatarLoading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/users/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => prev ? { ...prev, avatarUrl: data.data.avatarUrl } : null);
        setProfileErrors({ success: 'Avatar updated successfully' });
      } else {
        setProfileErrors({
          general: data.error?.message || 'Failed to upload avatar'
        });
      }
    } catch (error) {
      setProfileErrors({
        general: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const password = prompt('Please enter your password to confirm account deletion:');
    if (!password) return;

    try {
      const response = await fetch('/api/users/account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/');
      } else {
        alert(data.error?.message || 'Failed to delete account');
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#000090' }}>
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and security settings
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'security'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Security
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' ? (
              <div>
                {/* Avatar Section */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
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
                    <div>
                      <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        disabled={avatarLoading}
                      />
                      <label
                        htmlFor="avatar"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {avatarLoading ? 'Uploading...' : 'Change Avatar'}
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        JPEG, PNG, or WebP. Max 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={profileForm.username}
                    onChange={handleProfileInputChange}
                    error={profileErrors.username}
                    disabled={profileLoading}
                  />

                  <Input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileInputChange}
                    error={profileErrors.email}
                    disabled={profileLoading}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileInputChange}
                      rows={4}
                      maxLength={500}
                      disabled={profileLoading}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        profileErrors.bio
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500'
                      } ${profileLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                      style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                    />
                    <div className="flex justify-between mt-1">
                      {profileErrors.bio && (
                        <p className="text-sm text-red-500">{profileErrors.bio}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        {profileForm.bio.length}/500 characters
                      </p>
                    </div>
                  </div>

                  {profileErrors.general && (
                    <div
                      className="p-3 rounded-lg text-sm"
                      style={{
                        backgroundColor: '#ffebee',
                        color: '#d32f2f',
                        border: '1px solid #ffcdd2'
                      }}
                    >
                      {profileErrors.general}
                    </div>
                  )}

                  {profileErrors.success && (
                    <div
                      className="p-3 rounded-lg text-sm"
                      style={{
                        backgroundColor: '#e8f5e8',
                        color: '#2e7d32',
                        border: '1px solid #c8e6c9'
                      }}
                    >
                      {profileErrors.success}
                    </div>
                  )}

                  <Button
                    type="submit"
                    loading={profileLoading}
                    disabled={profileLoading}
                  >
                    Save Changes
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                {/* Password Change Form */}
                <form onSubmit={handlePasswordSubmit} className="space-y-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Change Password
                  </h3>

                  <Input
                    type="password"
                    placeholder="Current password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordInputChange}
                    error={passwordErrors.currentPassword}
                    disabled={passwordLoading}
                  />

                  <Input
                    type="password"
                    placeholder="New password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordInputChange}
                    error={passwordErrors.newPassword}
                    disabled={passwordLoading}
                  />

                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmNewPassword"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordInputChange}
                    error={passwordErrors.confirmNewPassword}
                    disabled={passwordLoading}
                  />

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

                  {passwordErrors.general && (
                    <div
                      className="p-3 rounded-lg text-sm"
                      style={{
                        backgroundColor: '#ffebee',
                        color: '#d32f2f',
                        border: '1px solid #ffcdd2'
                      }}
                    >
                      {passwordErrors.general}
                    </div>
                  )}

                  {passwordErrors.success && (
                    <div
                      className="p-3 rounded-lg text-sm"
                      style={{
                        backgroundColor: '#e8f5e8',
                        color: '#2e7d32',
                        border: '1px solid #c8e6c9'
                      }}
                    >
                      {passwordErrors.success}
                    </div>
                  )}

                  <Button
                    type="submit"
                    loading={passwordLoading}
                    disabled={passwordLoading}
                  >
                    Change Password
                  </Button>
                </form>

                {/* Account Deletion */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delete Account
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    variant="danger"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}