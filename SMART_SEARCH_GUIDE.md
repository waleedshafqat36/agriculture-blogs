# Smart Search Implementation Guide

## Overview

Your blog now has an intelligent search feature similar to YouTube and Facebook. The system includes:

- **Real-time search suggestions** - Shows relevant results as users type
- **Smart relevance ranking** - Results sorted by keyword matches, engagement, and recency
- **Multi-field search** - Searches titles, content, tags, and author names
- **Keyboard navigation** - Arrow keys and Enter to select suggestions
- **Bilingual support** - Works with both English and Urdu content

## Features

### 1. Frontend Search (Default)
Location: `/lib/searchUtils.ts` and `/components/SearchSuggestions.tsx`

**Advantages:**
- Instant results (no API latency)
- Works offline
- No server load

**How it works:**
- Extracts keywords from search query
- Ranks results by match type (title > tag > author > content)
- Calculates relevance scores
- Sorts by score and engagement metrics

### 2. Backend Search API (Optional)
Location: `/app/api/blog/search`

**Advantages:**
- Better for large datasets (1000+ blogs)
- Database-level optimization
- Can scale independently
- Better for pagination

**How to use:**

```bash
GET /api/blog/search?q=keyword&limit=10&offset=0
```

**Response:**
```json
{
  "results": [
    {
      "_id": "...",
      "title": "...",
      "relevanceScore": 245,
      "matchedKeywords": ["keyword"],
      "viewCount": 150,
      "likeCount": 12,
      ...
    }
  ],
  "total": 23,
  "hasMore": true,
  "keywords": ["keyword"],
  "query": "keyword"
}
```

## Relevance Scoring Algorithm

Results are ranked based on:

1. **Match Type** (Priority Order):
   - Title match: +100 points
   - Tag/Category match: +80 points
   - Author match: +60 points
   - Content match: +40 points

2. **Position Bonus**: Earlier matches get bonus points

3. **Keyword Density**: More matched keywords = higher score

4. **Engagement Metrics**:
   - View count: +0.5 per view
   - Like count: +2 per like

5. **Recency**: Newer articles get slight preference

## Usage Examples

### In React Component

```tsx
import { searchArticles, getSearchSuggestions } from '@/lib/searchUtils';

// Get all matching results
const results = searchArticles(articles, "agriculture tips", 10);

// Get top suggestions (for dropdown)
const suggestions = getSearchSuggestions(articles, "organic farming", 5);

// Check matched keywords
console.log(results[0].matchedKeywords); // ["agriculture", "tips"]
```

### Search Suggestions Component

```tsx
import SearchSuggestions from '@/components/SearchSuggestions';

<SearchSuggestions 
  articles={articles}
  query={searchQuery}
  onSelectSuggestion={(article) => {
    console.log('Selected:', article.slug);
  }}
  isUrdu={false}
/>
```

### Using the API

```javascript
// Frontend API call
async function searchBlogs(query) {
  const response = await fetch(`/api/blog/search?q=${query}&limit=10`);
  const data = await response.json();
  return data.results;
}
```

## Customization

### Adjust Ranking Weights

Edit `/lib/searchUtils.ts`:

```typescript
const typeScores = {
  title: 100,      // Increase for title priority
  tag: 80,         // Increase for tag priority
  author: 60,      // Increase for author priority
  content: 40      // Increase for content priority
};
```

### Change Suggestion Count

```tsx
// In SearchSuggestions component
export const getSearchSuggestions = (
  articles,
  query,
  limit: number = 5  // Change this number
)
```

### Filter by Tags

```typescript
import { filterByTag } from '@/lib/searchUtils';

const organicArticles = filterByTag(articles, "organic");
```

### Get All Tags

```typescript
import { getAllTags } from '@/lib/searchUtils';

const tags = getAllTags(articles);
```

## Performance Tips

### For Few Blogs (<500)
Use frontend search (default):
- No API calls needed
- Instant results
- Lower server load

### For Many Blogs (>500)
Consider using backend API:

```tsx
const [results, setResults] = useState([]);

useEffect(() => {
  if (searchQuery.length > 2) {
    fetch(`/api/blog/search?q=${searchQuery}`)
      .then(r => r.json())
      .then(data => setResults(data.results));
  }
}, [searchQuery]);
```

## Bilingual Support

The search automatically handles both English and Urdu:

```tsx
// Urdu search
searchArticles(articles, "زراعت")  // Arabic/Urdu text

// English search
searchArticles(articles, "agriculture")

// Mixed search
searchArticles(articles, "organic زراعت")
```

## Browser Features

### Keyboard Navigation
- `↑` / `↓` - Navigate suggestions
- `Enter` - Select highlighted suggestion  
- `Esc` - Close dropdown

### Mouse Features
- Hover to highlight suggestions
- Click to select

## Debugging

Enable console logs to see search scores:

```typescript
const results = searchArticles(articles, "keyword");
results.forEach(r => {
  console.log(`${r.title}: Score ${r.relevanceScore}`);
});
```

## Schema Requirements

Ensure your blog schema includes these fields for optimal search:

```typescript
{
  title: String,              // Required
  titleUrdu: String,          // For bilingual support
  content: String,            // For full-text search
  contentUrdu: String,        // For bilingual content
  author: String,             // Author search
  SubCategory: [String],      // Tag/category search
  viewCount: Number,          // Engagement metric
  likeCount: Number,          // Engagement metric
  slug: String,               // For navigation
  createdAt: Date             // For recency
}
```

## Future Enhancements

Possible improvements:
1. **Fuzzy matching** - Handle typos
2. **Autocomplete** - Common search terms
3. **Filters** - By author, date, category
4. **Search analytics** - Track popular searches
5. **Voice search** - Accessibility feature
6. **Caching** - For frequently searched terms

## Troubleshooting

**No results showing:**
- Check if articles have valid slug values
- Verify SubCategory array is populated
- Ensure search query has keywords > 2 chars

**Slow suggestions:**
- For >1000 articles, use backend API
- Implement search debouncing
- Consider pagination

**Bilingual issues:**
- Ensure database stores both title and titleUrdu
- Check text direction (RTL/LTR) settings

## Files Modified/Created

- `/lib/searchUtils.ts` - Search algorithm
- `/components/SearchSuggestions.tsx` - UI component
- `/app/api/blog/search/route.ts` - Backend API
- `/app/blogs/page.tsx` - Integration

## Questions?

Refer to the component source code for more examples and detailed comments.
