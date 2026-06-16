"use client";

import { BookOpen, Users, Zap, BarChart3, Shield, Smartphone } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: BookOpen,
    title: "Expert Blog Articles",
    description: "Access comprehensive guides covering crop management, pest control, soil health, and modern farming techniques written by agricultural experts.",
    features: ["500+ Articles", "Expert Verified", "Regular Updates", "Easy to Search"],
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with fellow farmers, share experiences, ask questions, and get personalized advice from experts and experienced community members.",
    features: ["24/7 Support", "Expert Responses", "Peer Learning", "Local Insights"],
  },
  {
    icon: Zap,
    title: "Quick Tips & Alerts",
    description: "Receive timely notifications about seasonal farming practices, weather-based recommendations, and urgent pest/disease alerts.",
    features: ["Real-time Alerts", "Seasonal Tips", "Mobile Ready", "Customizable"],
  },
  {
    icon: BarChart3,
    title: "Farm Analytics",
    description: "Track your farm's performance with detailed analytics on yield, crop health, resource usage, and profitability metrics.",
    features: ["Performance Tracking", "Data Insights", "Growth Reports", "Benchmarking"],
  },
  {
    icon: Shield,
    title: "Certification Guidance",
    description: "Get step-by-step guidance for organic farming certification, sustainable practices, and government scheme applications.",
    features: ["Compliance Check", "Process Guide", "Document Templates", "Expert Review"],
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Access all content on-the-go with our mobile app, featuring offline reading and push notifications for important updates.",
    features: ["iOS & Android", "Offline Access", "Sync Features", "Fast Loading"],
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for beginners exploring agriculture",
    features: [
      "✓ Access to 500+ articles",
      "✓ Community forum access",
      "✓ Email support",
      "✗ Advanced analytics",
      "✗ Offline downloads",
      "✗ Expert consultation",
    ],
    button: "Get Started",
    buttonStyle: "border-2 border-green-600 text-green-600 hover:bg-green-50",
  },
  {
    name: "Professional",
    price: "₹299",
    period: "/month",
    description: "For serious farmers wanting advanced features",
    features: [
      "✓ Everything in Starter",
      "✓ Farm analytics dashboard",
      "✓ Offline downloads",
      "✓ Priority support",
      "✓ Advanced search filters",
      "✗ Expert consultation",
    ],
    button: "Subscribe Now",
    buttonStyle: "bg-green-600 hover:bg-green-700 text-white",
    featured: true,
  },
  {
    name: "Expert",
    price: "₹999",
    period: "/month",
    description: "For agricultural businesses and professionals",
    features: [
      "✓ Everything in Professional",
      "✓ Monthly expert consultation",
      "✓ Customized recommendations",
      "✓ Farm team access",
      "✓ API access",
      "✓ Custom reports",
    ],
    button: "Contact Sales",
    buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
  },
];

export default function Services() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="min-h-[500px] bg-gradient-to-br from-green-50 via-white to-green-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-green-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive agricultural solutions designed to help you succeed. From expert content to
            community support, we've got everything you need.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-green-600" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <p key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-green-600 font-bold">•</span> {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Choose the plan that fits your needs. No hidden charges, cancel anytime.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  plan.featured
                    ? "ring-2 ring-green-600 transform md:scale-105 bg-white shadow-2xl"
                    : "bg-white shadow-lg"
                }`}
              >
                {plan.featured && (
                  <div className="bg-green-600 text-white text-center py-2 font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    {plan.price === "Free" ? (
                      <p className="text-4xl font-bold text-gray-900">{plan.price}</p>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${plan.buttonStyle}`}
                  >
                    {plan.button}
                  </button>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <p
                        key={idx}
                        className={`text-sm ${
                          feature.startsWith("✓")
                            ? "text-gray-700 font-medium"
                            : "text-gray-400 line-through"
                        }`}
                      >
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How to Get Started</h2>
          <div className="space-y-8">
            {[
              {
                number: "1",
                title: "Sign Up",
                description: "Create your free account in just 2 minutes. Choose a plan that suits your needs.",
              },
              {
                number: "2",
                title: "Explore",
                description: "Browse through our extensive library of articles, guides, and resources tailored to agriculture.",
              },
              {
                number: "3",
                title: "Learn & Apply",
                description: "Read expert insights and implement the techniques on your farm for better results.",
              },
              {
                number: "4",
                title: "Engage",
                description: "Join our community, share your experiences, and get advice from experts and fellow farmers.",
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I change my subscription plan anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is the free plan really free?",
                a: "Absolutely! Our free plan includes access to hundreds of articles and community forum. No credit card required.",
              },
              {
                q: "How often is new content published?",
                a: "We publish new articles and guides every week, covering seasonal topics, latest techniques, and trending issues.",
              },
              {
                q: "Do you offer offline access?",
                a: "Yes! Professional and Expert plans include offline download feature for our mobile app.",
              },
            ].map((item, index) => (
              <details key={index} className="bg-white rounded-lg p-6 cursor-pointer hover:shadow-md transition-all">
                <summary className="font-bold text-lg text-gray-900">{item.q}</summary>
                <p className="text-gray-600 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers already using KissanMarket to improve their yields and sustainability.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/blogs"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Free
            </Link>
            <Link
              href="/contact"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
