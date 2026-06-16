"use client";

import { useState, useEffect } from "react";
import { Search, ArrowRight, BookOpen, Sprout, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import TrendingArticles from "@/components/TrendingArticles";

interface Blog {
  _id: string;
  slug: string;
  title: string;
  image: string;
  content: string;
  createdAt: string;
  likeCount?: number;
  commentCount?: number;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await fetch("/api/blog?limit=3");
        const data = await response.json();
        setFeaturedBlogs(data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch featured blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedBlogs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const categories = [
    { name: "Crop Management", icon: Sprout, color: "bg-green-100" },
    { name: "Soil Health", icon: BookOpen, color: "bg-blue-100" },
    { name: "Pest Control", icon: TrendingUp, color: "bg-yellow-100" },
    { name: "Harvesting", icon: Users, color: "bg-orange-100" },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="min-h-[600px] bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                🌾 Welcome to KissanMarket Blog
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Grow Your <span className="text-green-600">Knowledge</span>, Harvest <span className="text-green-600">Success</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover expert insights on modern agriculture, sustainable farming practices, and proven techniques to maximize your yields and protect your crops.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="pt-4">
                <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search articles, tips, and guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-6 py-4 outline-none text-gray-700"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Explore Blogs <ArrowRight size={18} />
                </Link>
                <button className="inline-flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl opacity-10"></div>
              <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🌱</div>
                  <p className="text-xl font-bold text-gray-800">Agriculture Experts</p>
                  <p className="text-gray-600">Quality content for modern farmers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Popular Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  href={`/blogs?category=${category.name}`}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-green-700" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">Explore expert articles and tips</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>



      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-green-100">Quality Articles</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50K+</p>
              <p className="text-green-100">Active Readers</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-green-100">Expert Contributors</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10K+</p>
              <p className="text-green-100">Daily Visits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to get the latest agriculture tips and trending articles delivered to your inbox.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Newsletter subscription feature coming soon!");
            }} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg outline-none border border-gray-300 focus:border-green-600"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-600 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Grow Your Farm?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start reading our expert guides and transform your farming practices today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/blogs"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse All Articles
            </Link>
            <Link
              href="#"
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
