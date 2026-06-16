import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog";
import connectDB from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch all blogs with comments
    const blogs = await Blog.find({}).select('+comments').lean();

    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        { message: "No blogs found" },
        { status: 200 }
      );
    }

    // Calculate score for each blog
    const blogsWithScores = blogs.map((blog: any) => {
      const actualCommentCount = blog.comments ? blog.comments.length : 0;
      const commentCount = Math.max(blog.commentCount || 0, actualCommentCount);
      const likes = blog.likeCount || 0;
      const trendScore = likes * 2 + commentCount * 3;

      return {
        _id: blog._id.toString(),
        title: blog.title,
        likes,
        actualComments: actualCommentCount,
        commentCount,
        trendScore,
      };
    });

    // Sort by trend score
    const sorted = blogsWithScores.sort((a: any, b: any) => b.trendScore - a.trendScore);

    return NextResponse.json({
      totalBlogs: blogs.length,
      blogsWithScores: sorted,
      topTrending: sorted.slice(0, 5),
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
