"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, you would send this to your backend
      console.log("Form submitted:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: "Alfla colony khudian khas kasur",
    },
    {
      icon: Mail,
      title: "Email",
      details: "usman1419865@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "03201419865",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday, 9:00 AM - 6:00 PM IST",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Technical Support",
    "Content Suggestion",
    "Partnership",
    "Advertisement",
    "Other",
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="min-h-[400px] bg-gradient-to-br from-green-50 via-white to-green-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-green-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or suggestions? We'd love to hear from you. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 p-6 text-center hover:shadow-lg transition-all"
                >
                  <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <IconComponent className="text-green-600" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600">{info.details}</p>
                </div>
              );
            })}
          </div>

          {/* Contact Form Section */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 bg-green-50 border-2 border-green-400 text-green-700 px-6 py-4 rounded-lg">
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-sm">We'll get back to you as soon as possible.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 outline-none transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Why Contact Us */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Contact Us?</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">📞 Support</h3>
                  <p className="text-gray-600">
                    Having issues with our platform? Our support team is here to help you get the most out of KissanMarket.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">💡 Suggestions</h3>
                  <p className="text-gray-600">
                    Have an idea for new content or features? We love hearing from our users. Your feedback drives our improvements.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">🤝 Partnerships</h3>
                  <p className="text-gray-600">
                    Interested in collaborating with KissanMarket? Let's discuss partnership opportunities that benefit farmers.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">📰 Media</h3>
                  <p className="text-gray-600">
                    Press inquiries, interviews, or feature requests? Connect with our media team to learn more about our mission.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4">Other Ways to Connect</h3>
                <div className="space-y-3">
                  <Link href="/blogs" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
                    → Browse Our Blog Articles
                  </Link>
                  <Link href="/about" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
                    → Learn About Us
                  </Link>
                  <Link href="/service" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
                    → Explore Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Office Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Visit Our Office</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">KissanMarket Blog Headquarters</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Address:</p>
                  <p className="text-gray-600">Alfla colony khudian khas kasur</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Office Hours:</p>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p className="text-gray-600">Saturday - Sunday: Closed</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Languages Supported:</p>
                  <p className="text-gray-600">English, Urdu, Hindi</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🌍</div>
                <p className="text-xl font-bold text-gray-800">Connecting Farmers Globally</p>
                <p className="text-gray-600">Serving communities across multiple regions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Stay Connected</h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for weekly farming tips, updates, and exclusive content.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter subscription feature coming soon!");
            }}
            className="flex gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-green-600"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
