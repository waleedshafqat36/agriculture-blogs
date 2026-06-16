import { MetadataRoute } from "next";
import  connectDB  from "@/lib/db";
import Blog from "@/models/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB();
    
    const blogs = await Blog.find({}, "slug updatedAt").lean();
    
    const blogEntries = blogs.map((blog) => ({
      url: `https://agriculture-blogs.example.com/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [
      {
        url: "https://agriculture-blogs.example.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: "https://agriculture-blogs.example.com/blogs",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: "https://agriculture-blogs.example.com/trending",
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.8,
      },
      {
        url: "https://agriculture-blogs.example.com/agriculture",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      ...blogEntries,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [
      {
        url: "https://agriculture-blogs.example.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }
}
