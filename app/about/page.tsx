"use client";

import { Users, Award, Target, Globe } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & Editor",
    image: "👨‍🌾",
    bio: "25+ years of agriculture expertise",
  },
  {
    name: "Priya Singh",
    role: "Content Manager",
    image: "👩‍💼",
    bio: "Expert in sustainable farming",
  },
  {
    name: "Amit Patel",
    role: "Tech Lead",
    image: "👨‍💻",
    bio: "Building digital solutions for farmers",
  },
  {
    name: "Neha Sharma",
    role: "Agriculture Specialist",
    image: "👩‍🔬",
    bio: "Soil science & crop management expert",
  },
];

const values = [
  {
    icon: Target,
    title: "Mission Focused",
    description: "Empowering farmers with knowledge and resources to improve yields and sustainability",
  },
  {
    icon: Globe,
    title: "Globally Inspired",
    description: "Learning from best practices worldwide while respecting local farming traditions",
  },
  {
    icon: Award,
    title: "Quality Committed",
    description: "Providing verified, research-backed agricultural information and insights",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Building a supportive community of farmers, experts, and agriculture enthusiasts",
  },
];

export default function About() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="min-h-[500px] bg-gradient-to-br from-green-50 via-white to-green-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-green-600">KissanMarket</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated to transforming agriculture through knowledge, innovation, and community support.
            We believe every farmer deserves access to expert guidance and proven farming techniques.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  KissanMarket Blog was founded with a simple vision: to bridge the gap between
                  traditional farming wisdom and modern agricultural science.
                </p>
                <p>
                  What started as a passion project to help local farmers in rural communities has
                  grown into a comprehensive platform serving thousands of agriculture enthusiasts.
                </p>
                <p>
                  Today, we're proud to be one of the most trusted sources for agricultural education,
                  featuring insights from leading experts, successful farmers, and agricultural scientists.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 flex items-center justify-center h-80">
              <div className="text-center space-y-4">
                <div className="text-8xl">🌾</div>
                <p className="text-2xl font-bold text-gray-800">Growing Knowledge</p>
                <p className="text-gray-600">Since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-green-100">Articles Published</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50K+</p>
              <p className="text-green-100">Active Community</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-green-100">Expert Contributors</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-green-100">States Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8">
                  <div className="text-6xl mb-4">{member.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose KissanMarket</h2>
          <div className="space-y-6">
            {[
              {
                title: "Expert-Verified Content",
                description: "All articles are reviewed by agricultural experts and scientists to ensure accuracy and relevance.",
              },
              {
                title: "Practical Solutions",
                description: "We focus on real-world, actionable advice that farmers can implement immediately on their farms.",
              },
              {
                title: "Regular Updates",
                description: "Fresh content weekly covering latest trends, seasonal tips, and emerging agricultural technologies.",
              },
              {
                title: "Community Support",
                description: "Join thousands of farmers in our community forum to share experiences and get personalized advice.",
              },
              {
                title: "Multi-Language Support",
                description: "Access content in English and Urdu to reach farmers across different regions.",
              },
              {
                title: "Free Access",
                description: "Quality agricultural education should be accessible to all farmers regardless of their financial situation.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey towards better farming with access to expert insights and proven techniques.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/blogs"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Articles
            </Link>
            <Link
              href="/contact"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
