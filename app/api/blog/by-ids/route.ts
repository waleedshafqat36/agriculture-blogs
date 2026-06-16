import ConnectDB from "@/lib/db";
import Blog from "@/models/blog";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const { blogIds } = await req.json();

    if (!blogIds || !Array.isArray(blogIds)) {
      return NextResponse.json(
        { message: "Blog IDs array required" },
        { status: 400 }
      );
    }

    console.log("API by-ids - received blogIds:", blogIds);

    // Convert string IDs to MongoDB ObjectIds
    const objectIds = blogIds
      .map((id: string) => {
        try {
          return new mongoose.Types.ObjectId(id);
        } catch (e) {
          console.warn("Invalid ObjectId:", id);
          return null;
        }
      })
      .filter((id) => id !== null);

    console.log("API by-ids - converted objectIds:", objectIds);

    // Fetch all blogs with these IDs
    const blogs = await Blog.find({ _id: { $in: objectIds } }).select(
      "_id slug title titleUrdu content contentUrdu image author createdAt likeCount dislikeCount commentCount"
    );

    console.log("API by-ids - found blogs:", blogs.length);

    return NextResponse.json(
      {
        success: true,
        blogs: blogs || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs by IDs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
