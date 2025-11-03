import Link from 'next/link';
import { Header } from '../../components/layout/Header';

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About 8E
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make secure authentication accessible to everyone.
              Built by developers, for developers.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#000090' }}>
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  8E began as a simple idea: what if authentication could be both secure and simple?
                  Too often, developers had to choose between security and user experience. We believed
                  you shouldn't have to compromise.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded in 2024, our platform has evolved from a basic authentication system
                  into a comprehensive user management solution trusted by teams worldwide. We've
                    helped thousands of developers implement secure authentication without the headache.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Today, we continue to innovate, adding new features and improving our platform
                  based on feedback from our amazing community of users.
                </p>
                <Link
                  href="/register"
                  className="inline-block px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                  style={{ backgroundColor: '#000090' }}
                >
                  Join Our Journey
                </Link>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">2024</div>
                    <div className="text-gray-600">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                    <div className="text-gray-600">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                    <div className="text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                Our Mission & Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Security First</h3>
                <p className="text-gray-600">
                  We never compromise on security. Every feature is built with security as the foundation.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Developer Experience</h3>
                <p className="text-gray-600">
                  We believe developers deserve tools that are powerful yet intuitive to use.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">User-Centric</h3>
                <p className="text-gray-600">
                  Every decision is made with the end-user in mind, ensuring seamless experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                Built with Modern Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We use cutting-edge technology to ensure reliability, security, and performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">⚛️</span>
                </div>
                <h3 className="font-semibold mb-2">React 18</h3>
                <p className="text-gray-600 text-sm">Modern, component-based UI framework</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">▲</span>
                </div>
                <h3 className="font-semibold mb-2">Next.js 14</h3>
                <p className="text-gray-600 text-sm">Full-stack React framework</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">🐘</span>
                </div>
                <h3 className="font-semibold mb-2">PostgreSQL</h3>
                <p className="text-gray-600 text-sm">Reliable, scalable database</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">🔷</span>
                </div>
                <h3 className="font-semibold mb-2">Prisma</h3>
                <p className="text-gray-600 text-sm">Type-safe database ORM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                Meet Our Amazing Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The talented individuals who make 8E possible every day.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
              {[
                { name: 'Tameem', role: 'Founder & CEO', initials: 'TM' },
                { name: 'Yaseen', role: 'CTO', initials: 'YS' },
                { name: 'Ahmed Amin', role: 'Lead Developer', initials: 'AA' },
                { name: 'Yahya', role: 'Security Expert', initials: 'Y' },
                { name: 'Raghed', role: 'Product Designer', initials: 'R' },
                { name: 'Omar Mohamed', role: 'Backend Engineer', initials: 'OM' },
                { name: 'Omar Mostafa', role: 'Frontend Engineer', initials: 'OMo' },
                { name: 'Omar Ezzeldein', role: 'DevOps Engineer', initials: 'OE' },
                { name: 'Malek Mahmoud', role: 'QA Engineer', initials: 'MM' },
                { name: 'Mohamed Reda', role: 'Developer', initials: 'MR' },
                { name: 'Youssef Mohamed', role: 'Developer', initials: 'YM' },
                { name: 'Mazen Fathi', role: 'Support Lead', initials: 'MF' },
                { name: 'Daniel Joseph', role: 'Developer', initials: 'DJ' },
                { name: 'Huiseen', role: 'Developer', initials: 'H' }
              ].map((member, index) => {
                const colors = [
                  'from-blue-400 to-indigo-600',
                  'from-purple-400 to-pink-600',
                  'from-green-400 to-blue-600',
                  'from-yellow-400 to-red-600',
                  'from-indigo-400 to-purple-600'
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <div key={member.name} className="text-center group">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                      {member.initials}
                    </div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-8">
                We're always looking for talented people to join our team.
              </p>
              <Link
                href="/careers"
                className="inline-block px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                style={{ backgroundColor: '#000090' }}
              >
                View Open Positions
              </Link>
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
              Join thousands of developers who trust 8E for their authentication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg border-2 border-blue-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}