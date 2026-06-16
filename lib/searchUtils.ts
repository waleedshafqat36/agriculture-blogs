/**
 * Advanced search utility for blog articles
 * Provides intelligent ranking and filtering similar to YouTube/Facebook
 */

export interface Article {
  _id: string;
  image: string;
  title: string;
  titleUrdu?: string;
  content: string;
  contentUrdu?: string;
  fullContent?: string;
  likeCount?: number;
  likedBy?: string[];
  createdAt?: string;
  slug?: string;
  author: string;
  SubCategory?: string[];
  viewCount?: number;
  commentCount?: number;
}

export interface SearchResult extends Article {
  relevanceScore: number;
  matchType: 'title' | 'content' | 'tag' | 'author';
  matchedKeywords: string[];
}

/**
 * Calculate Levenshtein distance (edit distance) between two strings
 * Used for fuzzy/typo matching
 */
const levenshteinDistance = (str1: string, str2: string): number => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) track[0][i] = i;
  for (let j = 0; j <= str2.length; j++) track[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[str2.length][str1.length];
};

/**
 * Check if strings are similar (allowing for typos)
 * Returns true if edit distance is within threshold
 */
const isSimilar = (str1: string, str2: string, threshold: number = 2): boolean => {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return distance <= threshold && distance / maxLength < 0.4;
};

/**
 * Extract keywords from search query
 * Supports multiple words and filters common words
 */
export const extractKeywords = (query: string): string[] => {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0 && !commonWords.includes(word));
};

/**
 * Calculate relevance score based on match type and position
 */
const calculateRelevanceScore = (
  matchType: 'title' | 'content' | 'tag' | 'author',
  matchPosition: number,
  keywordCount: number,
  totalKeywords: number
): number => {
  const typeScores = {
    title: 100,
    tag: 80,
    author: 60,
    content: 40
  };

  const positionBonus = Math.max(0, 50 - matchPosition);
  const keywordBonus = (keywordCount / totalKeywords) * 50;

  return typeScores[matchType] + positionBonus + keywordBonus;
};

/**
 * Search articles with intelligent ranking
 */
export const searchArticles = (
  articles: Article[],
  query: string,
  limit?: number
): SearchResult[] => {
  if (!query.trim()) return [];

  const keywords = extractKeywords(query);
  if (keywords.length === 0) return [];

  const results: SearchResult[] = [];
  const seen = new Set<string>();

  articles.forEach(article => {
    const matchedKeywords: string[] = [];
    let highestScore = 0;
    let matchType: 'title' | 'content' | 'tag' | 'author' = 'content';

    const title = (article.title + (article.titleUrdu || '')).toLowerCase();
    const content = (article.content + (article.contentUrdu || '')).toLowerCase();
    const author = article.author.toLowerCase();
    const tags = (article.SubCategory || []).map(tag => tag.toLowerCase()).join(' ');

    // Check title matches (highest priority) - with exact and fuzzy matching
    keywords.forEach(keyword => {
      const titlePos = title.indexOf(keyword);
      if (titlePos !== -1) {
        matchedKeywords.push(keyword);
        const score = calculateRelevanceScore('title', titlePos, matchedKeywords.length, keywords.length);
        if (score > highestScore) {
          highestScore = score;
          matchType = 'title';
        }
      } else {
        // Try fuzzy matching for typos in title
        const titleWords = title.split(/\s+/);
        for (const word of titleWords) {
          if (isSimilar(keyword, word)) {
            if (!matchedKeywords.includes(keyword)) {
              matchedKeywords.push(keyword);
            }
            const score = calculateRelevanceScore('title', 0, matchedKeywords.length, keywords.length) * 0.8; // Slightly lower score for fuzzy match
            if (score > highestScore) {
              highestScore = score;
              matchType = 'title';
            }
            break;
          }
        }
      }
    });

    // Check tag matches
    keywords.forEach(keyword => {
      if (!matchedKeywords.includes(keyword) && tags.includes(keyword)) {
        matchedKeywords.push(keyword);
        const score = calculateRelevanceScore('tag', 0, matchedKeywords.length, keywords.length);
        if (score > highestScore) {
          highestScore = score;
          matchType = 'tag';
        }
      }
    });

    // Check author matches
    keywords.forEach(keyword => {
      if (!matchedKeywords.includes(keyword) && author.includes(keyword)) {
        matchedKeywords.push(keyword);
        const score = calculateRelevanceScore('author', author.indexOf(keyword), matchedKeywords.length, keywords.length);
        if (score > highestScore) {
          highestScore = score;
          matchType = 'author';
        }
      }
    });

    // Check content matches (with fuzzy matching for typos)
    keywords.forEach(keyword => {
      if (!matchedKeywords.includes(keyword)) {
        const contentPos = content.indexOf(keyword);
        if (contentPos !== -1) {
          matchedKeywords.push(keyword);
          const score = calculateRelevanceScore('content', contentPos, matchedKeywords.length, keywords.length);
          if (score > highestScore) {
            highestScore = score;
            matchType = 'content';
          }
        } else {
          // Try fuzzy matching for typos in content
          const contentWords = content.split(/\s+/);
          for (const word of contentWords) {
            if (word.length > 3 && isSimilar(keyword, word)) {
              matchedKeywords.push(keyword);
              const score = calculateRelevanceScore('content', 0, matchedKeywords.length, keywords.length) * 0.6; // Lower score for fuzzy match
              if (score > highestScore) {
                highestScore = score;
                matchType = 'content';
              }
              break;
            }
          }
        }
      }
    });

    // Add result if at least one keyword matched
    if (matchedKeywords.length > 0 && !seen.has(article._id)) {
      seen.add(article._id);
      results.push({
        ...article,
        relevanceScore: highestScore,
        matchType,
        matchedKeywords: [...new Set(matchedKeywords)]
      });
    }
  });

  // Sort by relevance score (descending) and then by view count
  return results
    .sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return (b.viewCount || 0) - (a.viewCount || 0);
    })
    .slice(0, limit || 10);
};

/**
 * Get search suggestions (top matching articles)
 * Used for dropdown suggestions as user types
 */
export const getSearchSuggestions = (
  articles: Article[],
  query: string,
  limit: number = 5
): SearchResult[] => {
  return searchArticles(articles, query, limit);
};

/**
 * Highlight matching keywords in text
 */
export const highlightKeywords = (text: string, keywords: string[]): string => {
  let highlighted = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });
  return highlighted;
};

/**
 * Get unique tags from articles
 */
export const getAllTags = (articles: Article[]): string[] => {
  const tags = new Set<string>();
  articles.forEach(article => {
    (article.SubCategory || []).forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

/**
 * Filter articles by tag
 */
export const filterByTag = (articles: Article[], tag: string): Article[] => {
  return articles.filter(article =>
    article.SubCategory?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};
