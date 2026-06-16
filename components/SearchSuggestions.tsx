"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SearchResult, getSearchSuggestions } from '@/lib/searchUtils';
import { useRouter } from 'next/navigation';

interface SearchSuggestionsProps {
  articles: Article[];
  query: string;
  onSelectSuggestion: (article: Article) => void;
  isUrdu?: boolean;
}

interface Article {
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

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  articles,
  query,
  onSelectSuggestion,
  isUrdu = false
}) => {
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get suggestions when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const results = getSearchSuggestions(articles, query, 8);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, articles]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            handleSelectSuggestion(suggestions[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, suggestions]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: SearchResult) => {
    onSelectSuggestion(suggestion);
    router.push(`/blogs/${suggestion.slug}`);
    setIsOpen(false);
  };

  if (!isOpen || suggestions.length === 0) return null;

  return (
    <div
      ref={suggestionsRef}
      className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-w-md ${
        isUrdu ? 'right-0' : 'left-0'
      }`}
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Suggestions List - Hide scrollbar with custom CSS */}
      <style>{`
        .suggestions-scroll::-webkit-scrollbar {
          display: none;
        }
        .suggestions-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="suggestions-scroll max-h-96 overflow-y-auto divide-y divide-gray-100">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion._id}
            onClick={() => handleSelectSuggestion(suggestion)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
              selectedIndex === index ? 'bg-gray-50' : ''
            }`}
          >
            {/* Thumbnail - Smaller */}
            <div className="shrink-0 w-10 h-10 rounded overflow-hidden bg-gray-100">
              <img
                src={suggestion.image || ''}
                alt={suggestion.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                {isUrdu ? suggestion.titleUrdu || suggestion.title : suggestion.title}
              </h4>
           
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
