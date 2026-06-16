import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog";
import connectDB from "@/lib/db";

/**
 * Sync comment counts across all blogs
 * This endpoint ensures that commentCount field matches the actual comments array length
 * Useful for fixing any desync issues
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Fetch all blogs with comments
    const blogs = await Blog.find({}).select('comments commentCount');

    let syncedCount = 0;
    const errors = [];

    // Sync each blog's commentCount
    for (const blog of blogs) {
      const actualCommentCount = blog.comments ? blog.comments.length : 0;
      
      // If counts don't match, update the blog
      if (blog.commentCount !== actualCommentCount) {
        try {
          blog.commentCount = actualCommentCount;
          blog.markModified('commentCount');
          await blog.save();
          syncedCount++;
          
          console.log(`Synced blog ${blog._id}: commentCount set to ${actualCommentCount}`);
        } catch (error) {
          errors.push({
            blogId: blog._id,
            error: error instanceof Error ? error.message : "Unknown error"
          });
        }
      }
    }

    return NextResponse.json(
      {
        message: "Comment count sync completed",
        totalBlogs: blogs.length,
        syncedBlogs: syncedCount,
        errors: errors.length > 0 ? errors : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error syncing comment counts:", error);
    return NextResponse.json(
      {
        error: "Failed to sync comment counts",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check the status of comment count sync
 * Returns blogs with mismatched comment counts
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const blogs = await Blog.find({}).select('title comments commentCount');
    
    const mismatchedBlogs = blogs
      .filter(blog => {
        const actualCount = blog.comments ? blog.comments.length : 0;
        return blog.commentCount !== actualCount;
      })
      .map(blog => ({
        blogId: blog._id,
        title: blog.title,
        storedCommentCount: blog.commentCount,
        actualCommentCount: blog.comments ? blog.comments.length : 0
      }));

    return NextResponse.json(
      {
        message: "Comment count check completed",
        totalBlogs: blogs.length,
        mismatchedBlogs: mismatchedBlogs,
        mismatchCount: mismatchedBlogs.length,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking comment counts:", error);
    return NextResponse.json(
      {
        error: "Failed to check comment counts",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
