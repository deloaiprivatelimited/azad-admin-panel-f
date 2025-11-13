import { useState, useEffect } from 'react';
import { Newspaper, Search, Filter, ChevronDown, Calendar, Tag, ArrowRight } from 'lucide-react';

interface CurrentAffairItem {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  image_url?: string;
}

interface FilterResponse {
  total: number;
  limit: number;
  offset: number;
  items: CurrentAffairItem[];
}

const API_BASE_URL = 'https://api.srinivasiasacademy.in/current-affairs';

export default function CurrentAffairsListPage() {
  const [items, setItems] = useState<CurrentAffairItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState({
    category: '',
    tag: '',
    start: '',
    end: '',
    search: '',
    sort: 'date:desc',
    limit: 20,
    offset: 0,
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchAllMetadata();
  }, []);

  useEffect(() => {
    fetchFilteredItems();
  }, [filters]);

  const fetchAllMetadata = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      const data = await response.json();
      const allItems = data.items || [];

      const uniqueCategories = [...new Set(allItems.map((item: CurrentAffairItem) => item.category))].sort();
      const tags = allItems.flatMap((item: CurrentAffairItem) => item.tags || []);
      const uniqueTags = [...new Set(tags)].sort();

      setCategories(uniqueCategories);
      setAllTags(uniqueTags);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  const fetchFilteredItems = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();

      if (filters.category) params.append('category', filters.category);
      if (filters.tag) params.append('tag', filters.tag);
      if (filters.start) params.append('start', filters.start);
      if (filters.end) params.append('end', filters.end);
      if (filters.search) params.append('search', filters.search);
      params.append('sort', filters.sort);
      params.append('limit', filters.limit.toString());
      params.append('offset', filters.offset.toString());

      const response = await fetch(`${API_BASE_URL}/items/filter?${params.toString()}`);
      const data: FilterResponse = await response.json();

      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [field]: value, offset: 0 }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      tag: '',
      start: '',
      end: '',
      search: '',
      sort: 'date:desc',
      limit: 20,
      offset: 0,
    });
  };

  const hasActiveFilters = filters.category || filters.tag || filters.start ||
                           filters.end || filters.search;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Newspaper size={32} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Current Affairs</h1>
          <p className="text-lg text-slate-600">Stay updated with the latest news and events</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between mb-4 text-left"
          >
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Filter News</h3>
              {hasActiveFilters && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Active
                </span>
              )}
            </div>
            <ChevronDown
              size={20}
              className={`text-slate-600 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>

          {showFilters && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tag
                  </label>
                  <select
                    value={filters.tag}
                    onChange={(e) => handleFilterChange('tag', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All Tags</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={filters.start}
                    onChange={(e) => handleFilterChange('start', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={filters.end}
                    onChange={(e) => handleFilterChange('end', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search title or content..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Sort by:</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  >
                    <option value="date:desc">Date (Newest First)</option>
                    <option value="date:asc">Date (Oldest First)</option>
                    <option value="title:asc">Title (A-Z)</option>
                    <option value="title:desc">Title (Z-A)</option>
                    <option value="category:asc">Category (A-Z)</option>
                    <option value="category:desc">Category (Z-A)</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading news...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Newspaper size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No News Found</h3>
            <p className="text-slate-600">
              {hasActiveFilters
                ? 'No news articles match your current filters. Try adjusting them.'
                : 'No current affairs articles are available yet.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{items.length}</span> of{' '}
                <span className="font-semibold text-slate-900">{total}</span> articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {item.image_url && (
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar size={14} />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>

                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {truncateContent(item.content)}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Tag size={14} className="text-slate-400" />
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-slate-500">+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    )}

                    <a
                      href={`/current-affair/${item.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Read More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {total > filters.limit && (
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => handleFilterChange('offset', Math.max(0, filters.offset - filters.limit))}
                  disabled={filters.offset === 0}
                  className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-slate-600">
                  Page {Math.floor(filters.offset / filters.limit) + 1} of{' '}
                  {Math.ceil(total / filters.limit)}
                </span>
                <button
                  onClick={() => handleFilterChange('offset', filters.offset + filters.limit)}
                  disabled={filters.offset + filters.limit >= total}
                  className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
