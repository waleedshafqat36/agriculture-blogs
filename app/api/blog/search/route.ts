import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/models/blog';
import ConnectDB from '@/lib/db';

/**
 * GET /api/blog/search?q=keyword
 * Smart search API for blogs with relevance ranking
 */
export async function GET(request: NextRequest) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Extract keywords from query
    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((word: string) => word.length > 2);

    if (keywords.length === 0) {
      return NextResponse.json(
        { results: [], total: 0 },
        { status: 200 }
      );
    }

    // Build MongoDB search query with text search and regex fallback
    const searchRegex = keywords.map((kw: string) => `(?=.*${kw})`).join('');
    const searchPattern = new RegExp(searchRegex, 'i');

    // MongoDB text search on indexed fields
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchPattern } },
        { titleUrdu: { $regex: searchPattern } },
        { content: { $regex: searchPattern } },
        { contentUrdu: { $regex: searchPattern } },
        { author: { $regex: searchPattern } },
        { SubCategory: { $in: keywords } }
      ]
    })
      .sort({
        // Relevance scoring
        score: { $meta: 'textScore' },
        // Then by views
        viewCount: -1,
        // Then by likes
        likeCount: -1,
        // Then by recency
        createdAt: -1
      })
      .skip(offset)
      .limit(limit)
      .lean();

    // Enhanced relevance scoring on backend
    const scoredBlogs = blogs.map((blog: any) => {
      let score = 0;

      // Check title match (highest weight)
      keywords.forEach((kw: string) => {
        if (blog.title?.toLowerCase().includes(kw)) score += 100;
        if (blog.titleUrdu?.toLowerCase().includes(kw)) score += 90;
      });

      // Check category/tags match
      if (blog.SubCategory) {
        keywords.forEach((kw: string) => {
          if (blog.SubCategory.some((cat: string) => cat.toLowerCase().includes(kw))) {
            score += 80;
          }
        });
      }

      // Check author match
      keywords.forEach((kw: string) => {
        if (blog.author?.toLowerCase().includes(kw)) score += 60;
      });

      // Check content match
      keywords.forEach((kw: string) => {
        if (blog.content?.toLowerCase().includes(kw)) score += 40;
        if (blog.contentUrdu?.toLowerCase().includes(kw)) score += 35;
      });

      // Bonus for engagement
      score += (blog.viewCount || 0) * 0.5;
      score += (blog.likeCount || 0) * 2;

      return {
        ...blog,
        relevanceScore: score,
        matchedKeywords: keywords.filter((kw: string) =>
          blog.title?.toLowerCase().includes(kw) ||
          blog.titleUrdu?.toLowerCase().includes(kw) ||
          blog.author?.toLowerCase().includes(kw) ||
          blog.SubCategory?.some((cat: string) => cat.toLowerCase().includes(kw))
        )
      };
    });

    // Sort by relevance score
    scoredBlogs.sort((a: any, b: any) => b.relevanceScore - a.relevanceScore);

    // Get total count for pagination
    const total = await Blog.countDocuments({
      $or: [
        { title: { $regex: searchPattern } },
        { titleUrdu: { $regex: searchPattern } },
        { content: { $regex: searchPattern } },
        { contentUrdu: { $regex: searchPattern } },
        { author: { $regex: searchPattern } },
        { SubCategory: { $in: keywords } }
      ]
    });

    return NextResponse.json(
      {
        results: scoredBlogs,
        total,
        query,
        keywords,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
