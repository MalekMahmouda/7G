import Link from 'next/link';
import { Header } from '../../components/layout/Header';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for small projects and personal use',
      features: [
        'Up to 100 active users',
        'Basic authentication',
        'Email support',
        'Community forum access',
        'Standard security features',
        '1 month data retention'
      ],
      excluded: [
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'API rate limits',
        'SSO integration'
      ],
      color: 'from-gray-400 to-gray-600',
      buttonStyle: 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400',
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'Ideal for growing businesses and teams',
      features: [
        'Up to 1,000 active users',
        'Advanced authentication',
        'Priority email support',
        'Advanced analytics dashboard',
        'Enterprise security features',
        '6 months data retention',
        'Custom branding options',
        'API rate limits: 10k requests/hour'
      ],
      excluded: [
        'Phone support',
        'SLA guarantee',
        'Custom integrations'
      ],
      color: 'from-blue-500 to-indigo-600',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      buttonText: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations with custom needs',
      features: [
        'Unlimited active users',
        'Custom authentication flows',
        'Dedicated account manager',
        'Phone & email support',
        'Advanced analytics & insights',
        'Unlimited data retention',
        'Full customization options',
        'Unlimited API requests',
        'SSO integration',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment option'
      ],
      excluded: [],
      color: 'from-purple-500 to-pink-600',
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700',
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your needs. Start free and upgrade as you grow.
            </p>
            <div className="mt-8 flex justify-center space-x-8 text-sm">
              <div className="flex items-center text-green-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center text-green-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                14-day free trial on Pro
              </div>
              <div className="flex items-center text-green-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl shadow-lg overflow-hidden ${
                    plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold" style={{ color: '#000090' }}>
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">{plan.period}</span>
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}

                      {plan.excluded.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start opacity-50">
                          <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-500 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={plan.name === 'Enterprise' ? '/contact' : '/register'}
                      className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
                    >
                      {plan.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#000090' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#000090' }}>
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#000090' }}>
                  What happens if I exceed my plan limits?
                </h3>
                <p className="text-gray-600">
                  We'll notify you when you're approaching your limits. You can upgrade your plan or we'll temporarily restrict new sign-ups until the next billing cycle.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#000090' }}>
                  Is there a free trial for paid plans?
                </h3>
                <p className="text-gray-600">
                  Yes! We offer a 14-day free trial for our Pro plan with full access to all features. No credit card required to start.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#000090' }}>
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#000090' }}>
                  Do you offer discounts for annual billing?
                </h3>
                <p className="text-gray-600">
                  Yes! Save 20% when you pay annually for our Pro plan. Enterprise customers get custom pricing based on their needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
              >
                Contact Sales
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