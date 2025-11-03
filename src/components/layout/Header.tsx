'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

export const Header: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (data.success) {
          setUser(data.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="top-0 left-0 right-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div
        className="px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, #000090, #1800c0, #3048c0)'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href={user ? '/dashboard' : '/'}
            className="flex items-center space-x-3"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              8E
            </div>
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: 'Rubik, Arial, sans-serif' }}
            >
              8E
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="text-white hover:text-blue-200 transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-white hover:text-blue-200 transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Profile
                </Link>
              </>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 text-white hover:text-blue-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span
                    className="hidden md:block font-medium"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {user.username}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-blue-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {showMobileMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <nav className="flex flex-col space-y-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-blue-200 transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-white hover:text-blue-200 transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-white hover:text-blue-200 transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white hover:text-blue-200 transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="text-white hover:text-blue-200 transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};