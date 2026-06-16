// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import BlogPost from '@/components/BlogdetailsServer';
import ConnectDB from '@/lib/db';
import Blog from '@/models/blog';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    await ConnectDB();
    const blog = await Blog.findOne({$or: [{ slug: slug }, { slugUrdu: slug }]}).lean();

    if (!blog) {
      return {
        title: "Blog Not Found | Agriculture Blogs",
        description: "The requested blog post could not be found.",
      };
    }

    // Clean HTML from content
    const plainDescription = blog.content
      .replace(/<[^>]*>/g, '')
      .trim()
      .substring(0, 160);

    // Extract keywords from title and content
    const keywords = [
      "agriculture",
      "farming",
      "crop management",
      ...blog.title.toLowerCase().split(' ').filter((word: string) => word.length > 4),
      blog.category || "agriculture",
    ];

    const publishedDate = blog.createdAt ? new Date(blog.createdAt) : new Date();
    const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt) : publishedDate;

    return {
      title: `${blog.title} | Agriculture Blogs`,
      description: plainDescription,
      keywords: keywords.slice(0, 10),
      authors: [{ name: "Agriculture Blogs Team" }],
      creator: "Agriculture Blogs",
      publisher: "Agriculture Blogs",
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "article",
        url: `http://localhost:3000/blogs/${slug}`,
        title: blog.title,
        description: plainDescription,
        siteName: "Agriculture Blogs",
        locale: "en_US",
        publishedTime: publishedDate.toISOString(),
        modifiedTime: modifiedDate.toISOString(),
        images: [
          {
            url: blog.image || `http://localhost:3000/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: plainDescription,
        creator: "@agricultureblogs",
        images: [blog.image || `http://localhost:3000/og-image.jpg`],
      },
      alternates: {
        canonical: `http://localhost:3000/blogs/${slug}`,
      },
      formatDetection: {
        email: true,
        telephone: true,
        address: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Blog | Agriculture Blogs",
      description: "Read our comprehensive agriculture blogs and farming tips.",
    };
  }
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  
  try {
    await ConnectDB();
    const blog = await Blog.findOne({$or: [{ slug: slug }, { slugUrdu: slug }]}).lean();

    if (!blog) {
      return <div className="max-w-7xl mx-auto px-6 py-12">Blog not found</div>;
    }

    // Convert to plain JSON to ensure serialization works
    const plainBlog = JSON.parse(JSON.stringify(blog));

    // Increment viewCount
    try {
      await Blog.updateOne(
        { _id: blog._id },
        { $inc: { viewCount: 1 } }
      );
    } catch (error) {
      console.error("Error updating viewCount:", error);
    }

    // Structured data injection
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: plainBlog.title,
      description: plainBlog.content.replace(/<[^>]*>/g, '').substring(0, 160),
      image: plainBlog.image,
      datePublished: plainBlog.createdAt,
      dateModified: plainBlog.updatedAt,
      author: {
        "@type": "Organization",
        name: "Agriculture Blogs",
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {await BlogPost({ blog: plainBlog })}
      </>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return <div>Error loading blog post</div>;
  }
}