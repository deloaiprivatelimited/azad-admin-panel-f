import { useState, useEffect } from 'react';
import { FileText, Filter, Calendar, BookOpen, Search, ChevronDown, Eye } from 'lucide-react';

interface PYQItem {
  id: string;
  category: string;
  year: number;
  name: string;
  language: string;
  pdf_url: string;
}

interface FilterResponse {
  total: number;
  limit: number;
  offset: number;
  items: PYQItem[];
}

const API_BASE_URL = 'https://api.srinivasiasacademy.in/pyq';

export default function PYQUserPage() {
  const [items, setItems] = useState<PYQItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    year: '',
    year_min: '',
    year_max: '',
    name: '',
    language: '',
    sort: 'year:desc',
    limit: 50,
    offset: 0,
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);

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

      const uniqueCategories = [...new Set(allItems.map((item: PYQItem) => item.category))].sort();
      const uniqueLanguages = [...new Set(allItems.map((item: PYQItem) => item.language))].sort();
      const uniqueYears = [...new Set(allItems.map((item: PYQItem) => item.year))].sort((a, b) => b - a);

      setCategories(uniqueCategories);
      setLanguages(uniqueLanguages);
      setYears(uniqueYears);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  const fetchFilteredItems = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();

      if (filters.category) params.append('category', filters.category);
      if (filters.year) params.append('year', filters.year);
      if (filters.year_min) params.append('year_min', filters.year_min);
      if (filters.year_max) params.append('year_max', filters.year_max);
      if (filters.name) params.append('name', filters.name);
      if (filters.language) params.append('language', filters.language);
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
      year: '',
      year_min: '',
      year_max: '',
      name: '',
      language: '',
      sort: 'year:desc',
      limit: 50,
      offset: 0,
    });
  };

  const hasActiveFilters = filters.category || filters.year || filters.year_min ||
                           filters.year_max || filters.name || filters.language;

  const groupedItems = items.reduce((acc, item) => {
    const key = `${item.category}-${item.year}`;
    if (!acc[key]) {
      acc[key] = {
        category: item.category,
        year: item.year,
        items: [],
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {} as Record<string, { category: string; year: number; items: PYQItem[] }>);

  const groups = Object.values(groupedItems);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
            <FileText size={32} className="text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Previous Year Questions</h1>
          <p className="text-lg text-slate-600">Access past exam papers and practice materials</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between mb-4 text-left"
          >
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-900">Filter Papers</h3>
              {hasActiveFilters && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => handleFilterChange('language', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All Languages</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Specific Year
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Any Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Year Range From
                  </label>
                  <input
                    type="number"
                    value={filters.year_min}
                    onChange={(e) => handleFilterChange('year_min', e.target.value)}
                    placeholder="e.g., 2010"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Year Range To
                  </label>
                  <input
                    type="number"
                    value={filters.year_max}
                    onChange={(e) => handleFilterChange('year_max', e.target.value)}
                    placeholder="e.g., 2024"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search by Name
                </label>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    placeholder="Search paper names..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Sort by:</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm"
                  >
                    <option value="year:desc">Year (Newest First)</option>
                    <option value="year:asc">Year (Oldest First)</option>
                    <option value="name:asc">Name (A-Z)</option>
                    <option value="name:desc">Name (Z-A)</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors font-medium"
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-600"></div>
            <p className="mt-4 text-slate-600">Loading papers...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <FileText size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Papers Found</h3>
            <p className="text-slate-600">
              {hasActiveFilters
                ? 'No papers match your current filters. Try adjusting them.'
                : 'No previous year question papers are available yet.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{items.length}</span> of{' '}
                <span className="font-semibold text-slate-900">{total}</span> papers
              </p>
            </div>

            <div className="space-y-6">
              {groups.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
                    <div className="flex items-center gap-3 text-white">
                      <Calendar size={20} />
                      <div>
                        <h2 className="text-xl font-bold">{group.category}</h2>
                        <p className="text-sm text-amber-100">Year {group.year}</p>
                      </div>
                      <span className="ml-auto text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        {group.items.length} {group.items.length === 1 ? 'paper' : 'papers'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-amber-300 bg-slate-50"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                              <BookOpen size={24} className="text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  {item.language}
                                </span>
                              </div>

                              <a
                                href={`/pdf?url=${encodeURIComponent(item.pdf_url)}&title=${encodeURIComponent(item.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full px-3 py-2 text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium"
                              >
                                <Eye size={16} />
                                View PDF
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
