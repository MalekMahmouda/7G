import Link from 'next/link';
import { Header } from '../../components/layout/Header';

export default function DocsPage() {
  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/auth/register',
      description: 'Register a new user account',
      parameters: ['username', 'email', 'password', 'confirmPassword']
    },
    {
      method: 'POST',
      endpoint: '/api/auth/login',
      description: 'Authenticate user and receive tokens',
      parameters: ['identifier', 'password', 'rememberMe']
    },
    {
      method: 'POST',
      endpoint: '/api/auth/logout',
      description: 'Logout user and invalidate tokens',
      parameters: []
    },
    {
      method: 'GET',
      endpoint: '/api/auth/me',
      description: 'Get current authenticated user info',
      parameters: []
    },
    {
      method: 'POST',
      endpoint: '/api/auth/forgot-password',
      description: 'Request password reset email',
      parameters: ['email']
    },
    {
      method: 'POST',
      endpoint: '/api/auth/reset-password',
      description: 'Reset password with token',
      parameters: ['token', 'password', 'confirmPassword']
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Everything you need to integrate 8E into your application.
              Comprehensive API documentation, code examples, and best practices.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#000090' }}>
                Quick Start
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create Account</h3>
                  <p className="text-gray-600">Sign up for a free 8E account in seconds</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get API Keys</h3>
                  <p className="text-gray-600">Generate your API credentials from dashboard</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Integrate</h3>
                  <p className="text-gray-600">Use our API or SDKs to add authentication</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 text-gray-100 font-mono text-sm">
              <div className="mb-4">
                <span className="text-green-400">#</span> Install the package
              </div>
              <div className="mb-4">
                <span className="text-blue-400">npm</span> install @8e/auth
              </div>
              <div className="mt-6">
                <span className="text-green-400">#</span> Initialize the client
              </div>
              <div className="mb-4">
                <span className="text-purple-400">import</span> { '{ 8E }' } <span className="text-purple-400">from</span> <span className="text-yellow-300">'@8e/auth'</span>;
              </div>
              <div className="mb-4">
                <span className="text-blue-400">const</span> client = <span className="text-yellow-300">new</span> <span className="text-orange-400">8E</span>({
              </div>
              <div className="ml-4 mb-4">
                apiKey: <span className="text-yellow-300">'your-api-key'</span>,
              </div>
              <div className="ml-4 mb-4">
                apiUrl: <span className="text-yellow-300">'https://api.8e-app.com'</span>
              </div>
              <div className="mb-4">
                });
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#000090' }}>
              API Reference
            </h2>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Endpoint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parameters
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {apiEndpoints.map((endpoint, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          endpoint.method === 'GET'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                        {endpoint.endpoint}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {endpoint.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {endpoint.parameters.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SDKs */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#000090' }}>
              SDKs & Libraries
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">⚛️</div>
                <h3 className="font-semibold mb-2">React</h3>
                <p className="text-gray-600 text-sm mb-4">React hooks and components</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">npm install @8e/react</code>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">▲</div>
                <h3 className="font-semibold mb-2">Next.js</h3>
                <p className="text-gray-600 text-sm mb-4">Next.js integration</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">npm install @8e/nextjs</code>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">🟢</div>
                <h3 className="font-semibold mb-2">Node.js</h3>
                <p className="text-gray-600 text-sm mb-4">Node.js backend SDK</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">npm install @8e/node</code>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">🐍</div>
                <h3 className="font-semibold mb-2">Python</h3>
                <p className="text-gray-600 text-sm mb-4">Python/Django SDK</p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">pip install 8e-python</code>
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#000090' }}>
              Code Examples
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">User Registration</h3>
                <div className="bg-gray-900 rounded-lg p-6 text-gray-100 font-mono text-sm overflow-x-auto">
                  <div className="mb-2">
                    <span className="text-blue-400">const</span> result = <span className="text-orange-400">await</span> client.<span className="text-yellow-300">auth</span>.<span className="text-yellow-300">register</span>({
                  </div>
                  <div className="ml-4 mb-2">
                    username: <span className="text-yellow-300">'johndoe'</span>,
                  </div>
                  <div className="ml-4 mb-2">
                    email: <span className="text-yellow-300">'john@example.com'</span>,
                  </div>
                  <div className="ml-4 mb-2">
                    password: <span className="text-yellow-300">'SecurePass123!'</span>
                  </div>
                  <div className="mb-4">});</div>
                  <div className="mb-2">
                    <span className="text-blue-400">if</span> (result.success) {
                  </div>
                  <div className="ml-4 mb-2">
                    console.<span className="text-yellow-300">log</span>(<span className="text-yellow-300">'User registered successfully'</span>);
                  </div>
                  <div className="mb-2">} <span className="text-blue-400">else</span> {</div>
                  <div className="ml-4 mb-2">
                    console.<span className="text-yellow-300">error</span>(result.error.message);
                  </div>
                  <div className="mb-2">}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">User Login</h3>
                <div className="bg-gray-900 rounded-lg p-6 text-gray-100 font-mono text-sm overflow-x-auto">
                  <div className="mb-2">
                    <span className="text-blue-400">const</span> result = <span className="text-orange-400">await</span> client.<span className="text-yellow-300">auth</span>.<span className="text-yellow-300">login</span>({
                  </div>
                  <div className="ml-4 mb-2">
                    identifier: <span className="text-yellow-300">'john@example.com'</span>,
                  </div>
                  <div className="ml-4 mb-2">
                    password: <span className="text-yellow-300">'SecurePass123!'</span>,
                  </div>
                  <div className="ml-4 mb-2">
                    rememberMe: <span className="text-purple-400">true</span>
                  </div>
                  <div className="mb-4">});</div>
                  <div className="mb-2">
                    <span className="text-blue-400">const</span> { user } = result.data;
                  </div>
                  <div className="mb-2">
                    console.<span className="text-yellow-300">log</span>(<span className="text-yellow-300">`Welcome ${user.username}!`</span>);
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Help Getting Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our team is here to help you integrate 8E into your application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
              >
                Contact Support
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg border-2 border-blue-600"
              >
                Start Building
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}