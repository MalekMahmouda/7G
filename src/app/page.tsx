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
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
                  <span className="text-4xl font-bold gradient-text">8E</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Welcome to 8E</span>
                <br />
                <span className="text-3xl md:text-4xl text-gray-600">Secure Authentication Platform</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience the next generation of web authentication with our secure, intuitive platform.
                Built for modern users who demand security, simplicity, and exceptional design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
                  style={{ backgroundColor: '#000090' }}
                >
                  Get Started Free
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold text-lg border-2 border-blue-900 shadow-lg"
                  style={{ color: '#000090', borderColor: '#000090' }}
                >
                  Learn More
                </Link>
              </div>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No Credit Card Required
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Secure
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  24/7 Support
                </div>
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

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">15+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">256-bit</div>
                <div className="text-gray-600">Encryption</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="gradient-text">Powerful Features</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need for secure authentication and user management, built with industry best practices.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Bank-Level Security</h3>
                <p className="text-gray-600 mb-4">
                  Military-grade encryption and security protocols to keep your data safe and secure.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ 256-bit SSL encryption</li>
                  <li>✓ Two-factor authentication</li>
                  <li>✓ Regular security audits</li>
                  <li>✓ GDPR compliant</li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Smart Profiles</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive profile management with advanced features and customization options.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ Custom avatar upload</li>
                  <li>✓ Rich profile editing</li>
                  <li>✓ Activity tracking</li>
                  <li>✓ Privacy controls</li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
                <p className="text-gray-600 mb-4">
                  Optimized performance with instant responses and seamless user experience.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ Sub-second response times</li>
                  <li>✓ Global CDN</li>
                  <li>✓ Optimized databases</li>
                  <li>✓ Progressive loading</li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Easy Integration</h3>
                <p className="text-gray-600 mb-4">
                  Simple API and SDKs to integrate authentication into any application.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ RESTful API</li>
                  <li>✓ Webhook support</li>
                  <li>✓ Developer docs</li>
                  <li>✓ SDK for popular frameworks</li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Flexible Scaling</h3>
                <p className="text-gray-600 mb-4">
                  Automatically scales to handle any amount of traffic without performance issues.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ Auto-scaling infrastructure</li>
                  <li>✓ Load balancing</li>
                  <li>✓ No downtime</li>
                  <li>✓ Global availability</li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">24/7 Monitoring</h3>
                <p className="text-gray-600 mb-4">
                  Real-time monitoring and alerts to ensure your application is always running smoothly.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2">
                  <li>✓ Real-time analytics</li>
                  <li>✓ Performance metrics</li>
                  <li>✓ Error tracking</li>
                  <li>✓ Automated alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="gradient-text">Trusted by Our Community</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See what our users have to say about their experience with 8E.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold">
                    TM
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Tameem</h4>
                    <p className="text-gray-600 text-sm">Developer</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "8E has completely transformed how we handle user authentication. The security features are top-notch and the user experience is seamless."
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold">
                    YS
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Yaseen</h4>
                    <p className="text-gray-600 text-sm">Product Manager</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "The best authentication platform we've used. Easy to integrate, incredibly secure, and the support team is amazing!"
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    AA
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Ahmed Amin</h4>
                    <p className="text-gray-600 text-sm">CTO</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "Security is our top priority, and 8E delivers. The authentication flows are smooth and the admin dashboard is incredibly useful."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="gradient-text">Meet Our Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The talented individuals who make 8E possible.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                'Tameem', 'Yaseen', 'Ahmed Amin', 'Yahya', 'Raghed',
                'Omar Mohamed', 'Omar Mostafa', 'Omar Ezzeldein', 'Malek Mahmoud', 'Mohamed Reda',
                'Youssef Mohamed', 'Mazen Fathi', 'Daniel Joseph', 'Huiseen'
              ].map((name, index) => {
                const initials = name.split(' ').map(n => n[0]).join('');
                const colors = [
                  'from-blue-400 to-indigo-600',
                  'from-purple-400 to-pink-600',
                  'from-green-400 to-blue-600',
                  'from-yellow-400 to-red-600',
                  'from-indigo-400 to-purple-600'
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <div key={name} className="text-center group">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                      {initials}
                    </div>
                    <h3 className="font-semibold text-gray-900">{name}</h3>
                    <p className="text-gray-600 text-sm">Team Member</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Authentication?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of developers and businesses who trust 8E for their authentication needs.
              Get started in minutes with our free tier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg border-2 border-blue-600 shadow-xl"
              >
                Contact Sales
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">8E</h3>
                <p className="text-gray-400 mb-4">
                  Secure authentication platform built with modern web technologies.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="/security" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                  <li><a href="/roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="/team" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
                  <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                  <li><a href="/status" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                  <li><a href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  © 2024 8E. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </a>
                  <a href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}