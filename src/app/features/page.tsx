import Link from 'next/link';
import { Header } from '../../components/layout/Header';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Secure Authentication',
      description: 'Industry-standard security with JWT tokens, password hashing, and session management.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      features: ['JWT tokens', 'Password hashing', 'Session management', 'Email verification', 'Two-factor auth', 'Rate limiting'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'User Management',
      description: 'Complete control over user accounts with advanced profile management and customization.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      features: ['Profile editing', 'Avatar uploads', 'Bio management', 'Account deletion', 'User roles', 'Activity tracking'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Developer Tools',
      description: 'Powerful APIs and SDKs to integrate authentication into any application seamlessly.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: ['RESTful API', 'Webhooks', 'SDKs', 'Documentation', 'Code examples', 'Testing tools'],
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Security Features',
      description: 'Enterprise-grade security with comprehensive protection against modern threats.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: ['256-bit encryption', 'SSL/TLS', 'GDPR compliant', 'SOC 2 certified', 'Regular audits', 'Bug bounty'],
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Performance',
      description: 'Lightning-fast performance with global CDN and optimized infrastructure.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ['99.9% uptime', 'Global CDN', 'Auto-scaling', 'Load balancing', 'Edge computing', 'Real-time monitoring'],
      color: 'from-red-500 to-pink-600'
    },
    {
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics to understand user behavior and optimize authentication.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['User analytics', 'Login metrics', 'Security reports', 'Performance data', 'Custom dashboards', 'API usage stats'],
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const integrations = [
    { name: 'React', icon: '⚛️', description: 'Seamless integration with React apps' },
    { name: 'Next.js', icon: '▲', description: 'Built-in Next.js support' },
    { name: 'Node.js', icon: '🟢', description: 'Server-side authentication' },
    { name: 'Vue.js', icon: '💚', description: 'Vue.js framework support' },
    { name: 'Angular', icon: '🅰️', description: 'Angular integration' },
    { name: 'Express', icon: '🚂', description: 'Express.js middleware' },
    { name: 'Django', icon: '🐍', description: 'Python Django support' },
    { name: 'Rails', icon: '🛤️', description: 'Ruby on Rails integration' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Powerful Features
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build secure, scalable authentication systems.
              Built with modern technology and best practices.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                All-in-One Authentication Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From basic authentication to advanced security features, we've got you covered.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#000090' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                Technical Specifications
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built with modern technology stack and following industry best practices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600 mb-4">256-bit</div>
                <div className="text-gray-600 font-semibold">Encryption</div>
                <div className="text-gray-500 text-sm mt-2">AES-256 standard</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-green-600 mb-4">99.9%</div>
                <div className="text-gray-600 font-semibold">Uptime</div>
                <div className="text-gray-500 text-sm mt-2">SLA guaranteed</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600 mb-4">&lt;100ms</div>
                <div className="text-gray-600 font-semibold">Response Time</div>
                <div className="text-gray-500 text-sm mt-2">Average latency</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-orange-600 mb-4">24/7</div>
                <div className="text-gray-600 font-semibold">Support</div>
                <div className="text-gray-500 text-sm mt-2">Technical assistance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                Works with Your Favorite Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Integrate seamlessly with popular frameworks and platforms.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-3">{integration.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                  <p className="text-gray-600 text-sm">{integration.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                RESTful API
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Complete API coverage for all authentication and user management operations.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#000090' }}>
                    Authentication Endpoints
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">POST /api/auth/register</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">POST /api/auth/login</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">POST /api/auth/logout</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">POST /api/auth/refresh</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#000090' }}>
                    User Management Endpoints
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">GET /api/users/profile</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">PUT /api/users/profile</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">POST /api/users/avatar</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <code className="text-sm font-mono">DELETE /api/users/account</code>
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Full REST API with comprehensive documentation and SDK support
                </p>
                <Link
                  href="/docs"
                  className="inline-block px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                  style={{ backgroundColor: '#000090' }}
                >
                  View API Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                Enterprise Security
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Security is not an afterthought. It's built into every layer of our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
                <p className="text-gray-600">All data encrypted in transit and at rest</p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Compliance & Audits</h3>
                <p className="text-gray-600">GDPR, SOC 2, ISO 27001 certified</p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
                <p className="text-gray-600">24/7 threat detection and response</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start building with 8E today and see how our features can transform your authentication experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg border-2 border-blue-600"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}