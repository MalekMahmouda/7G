import Link from 'next/link';
import { Header } from '../components/layout/Header';

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Welcome to 8E</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A secure and user-friendly platform where you can create accounts, manage your profile,
                and interact with a modern authentication system built with the latest web technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold text-lg"
                  style={{ backgroundColor: '#000090' }}
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg border-2 border-blue-900"
                  style={{ color: '#000090', borderColor: '#000090' }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-20">
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 blur-3xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-20">
            <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="gradient-text">Why Choose 8E?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience modern web application security and user management with our comprehensive platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Secure Authentication</h3>
                <p className="text-gray-600 mb-4">
                  Industry-standard security with JWT tokens, password hashing, and session management to keep your account safe.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ Password complexity requirements</li>
                  <li>✓ Email verification</li>
                  <li>✓ Secure password reset</li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Profile Management</h3>
                <p className="text-gray-600 mb-4">
                  Complete control over your account with easy profile editing, avatar uploads, and account settings.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ Edit username and email</li>
                  <li>✓ Upload profile picture</li>
                  <li>✓ Change password securely</li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Modern Experience</h3>
                <p className="text-gray-600 mb-4">
                  Beautiful, responsive design that works perfectly on desktop, tablet, and mobile devices.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ Mobile-first responsive design</li>
                  <li>✓ Fast and intuitive interface</li>
                  <li>✓ Accessibility compliant</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who trust 8E for their secure authentication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
              >
                Create Your Account
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">8E</h3>
              <p className="text-gray-400 mb-4">
                Secure authentication platform built with modern web technologies.
              </p>
              <div className="flex justify-center space-x-6 mb-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Support
                </a>
              </div>
              <p className="text-gray-500 text-sm">
                © 2024 8E. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}