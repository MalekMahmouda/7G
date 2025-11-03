'use client';

import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
  success?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        general: undefined,
        success: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setErrors({
          success: 'Thank you for your message! We\'ll get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setErrors({
          general: data.error?.message || 'Failed to send message. Please try again.'
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
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8" style={{ color: '#000090' }}>
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" style={{ color: '#000090' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">support@8e-app.com</p>
                      <p className="text-gray-500 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" style={{ color: '#000090' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Support</h3>
                      <p className="text-gray-600">24/7 Technical Support</p>
                      <p className="text-gray-500 text-sm">Get help when you need it</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" style={{ color: '#000090' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                      <p className="text-gray-600">Global Team</p>
                      <p className="text-gray-500 text-sm">Remote-first company</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6" style={{ color: '#000090' }}>
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">How do I get started with 8E?</h4>
                      <p className="text-gray-600 text-sm">
                        Simply sign up for a free account, follow the setup wizard, and you'll be ready to authenticate users in minutes.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">What pricing plans are available?</h4>
                      <p className="text-gray-600 text-sm">
                        We offer a free tier for small projects, plus paid plans for growing businesses with advanced features.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Is my data secure with 8E?</h4>
                      <p className="text-gray-600 text-sm">
                        Absolutely! We use industry-standard encryption and security practices to keep your data safe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#000090' }}>
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      required
                      disabled={loading}
                    />

                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                      disabled={loading}
                    />

                    <Input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={errors.subject}
                      required
                      disabled={loading}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        disabled={loading}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.message
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                        } ${loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                        style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {errors.general && (
                      <div
                        className="p-4 rounded-lg text-sm"
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
                        className="p-4 rounded-lg text-sm"
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
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#000090' }}>
                Quick Links
              </h2>
              <p className="text-xl text-gray-600">
                Find what you're looking for, faster.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg className="w-8 h-8" style={{ color: '#000090' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-gray-600 text-sm mb-4">Comprehensive guides and API references</p>
                <a href="/docs" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Read Docs →
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg className="w-8 h-8" style={{ color: '#000090' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-gray-600 text-sm mb-4">Join our community of developers</p>
                <a href="/community" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Join Community →
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg className="w-8 h-8" style={{ color: '#000090' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Status</h3>
                <p className="text-gray-600 text-sm mb-4">Check system status and uptime</p>
                <a href="/status" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Check Status →
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg className="w-8 h-8" style={{ color: '#000090' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Blog</h3>
                <p className="text-gray-600 text-sm mb-4">Latest updates and announcements</p>
                <a href="/blog" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Read Blog →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}