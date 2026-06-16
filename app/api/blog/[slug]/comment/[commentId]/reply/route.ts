import ConnectDB from "@/lib/db";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  try {
    const { slug, commentId } = await params;
    const { author, text, authorId } = await req.json();

    console.log("Creating reply for:", { slug, commentId, author, text });

    if (!author || !text) {
      return NextResponse.json(
        { message: "Author and text are required" },
        { status: 400 }
      );
    }

    await ConnectDB();

    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      console.error("Blog not found with slug:", slug);
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const comment = blog.comments.find(
      (c: any) => c._id.toString() === commentId
    );
    if (!comment) {
      console.error("Comment not found:", commentId);
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const newReply = {
      _id: new mongoose.Types.ObjectId(),
      author: author.trim(),
      authorId: authorId || null,
      text: text.trim(),
      createdAt: new Date(),
    };

    if (!comment.replies) {
      comment.replies = [];
    }

    comment.replies.push(newReply);
    blog.markModified('comments');
    await blog.save();

    console.log("Reply created successfully:", newReply);

    const updatedBlog = await Blog.findOne({ slug: slug }).lean();
    const updatedComments = updatedBlog?.comments || [];

    return NextResponse.json(
      {
        success: true,
        reply: newReply,
        comments: updatedComments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  try {
    const { slug, commentId } = await params;

    await ConnectDB();

    const blog = await Blog.findOne({ slug: slug }).lean();
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const comment = blog.comments.find(
      (c: any) => c._id.toString() === commentId
    );
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        replies: comment.replies || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  try {
    const { slug, commentId } = await params;
    const { replyId } = await req.json();

    console.log("Deleting reply:", { slug, commentId, replyId });

    if (!replyId) {
      return NextResponse.json(
        { message: "Reply ID is required" },
        { status: 400 }
      );
    }

    await ConnectDB();

    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const comment = blog.comments.find(
      (c: any) => c._id.toString() === commentId
    );
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const replyIndex = comment.replies.findIndex(
      (r: any) => r._id.toString() === replyId
    );
    if (replyIndex === -1) {
      console.error("Reply not found:", replyId);
      return NextResponse.json(
        { message: "Reply not found" },
        { status: 404 }
      );
    }

    comment.replies.splice(replyIndex, 1);
    blog.markModified('comments');
    await blog.save();

    console.log("Reply deleted successfully");

    const updatedBlog = await Blog.findOne({ slug: slug }).lean();
    const updatedComments = updatedBlog?.comments || [];

    return NextResponse.json(
      {
        success: true,
        message: "Reply deleted successfully",
        comments: updatedComments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reply:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  try {
    const { slug, commentId } = await params;
    const { replyId, text } = await req.json();

    console.log("Updating reply:", { slug, commentId, replyId, text });

    if (!replyId || !text) {
      return NextResponse.json(
        { message: "Reply ID and text are required" },
        { status: 400 }
      );
    }

    await ConnectDB();

    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const comment = blog.comments.find(
      (c: any) => c._id.toString() === commentId
    );
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const reply = comment.replies.find(
      (r: any) => r._id.toString() === replyId
    );
    if (!reply) {
      console.error("Reply not found:", replyId);
      return NextResponse.json(
        { message: "Reply not found" },
        { status: 404 }
      );
    }

    reply.text = text.trim();
    blog.markModified('comments');
    await blog.save();

    console.log("Reply updated successfully");

    const updatedBlog = await Blog.findOne({ slug: slug }).lean();
    const updatedComments = updatedBlog?.comments || [];

    return NextResponse.json(
      {
        success: true,
        message: "Reply updated successfully",
        comments: updatedComments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating reply:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
