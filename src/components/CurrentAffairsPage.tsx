import React, { useState, useEffect } from "react";
import { Search, Eye, TrendingUp } from "lucide-react";

interface CurrentAffair {
  id: string;
  title: string;
  summary?: string;
  category: string;
  date: string;
  readTime?: string;
  importance?: "High" | "Medium" | "Low";
  tags: string[];
  content: string;
  source?: string;
  image_url?: string;
}

export function CurrentAffairsPage() {
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAffair, setSelectedAffair] = useState<CurrentAffair | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string>("All");

  useEffect(() => {
    const fetchCurrentAffairs = async () => {
      try {
        const response = await fetch("https://backend.azad.deloai.com/currentaffairs");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: CurrentAffair[] = await response.json();
        setCurrentAffairs(data);
      } catch (err: any) {
        console.error("Error fetching current affairs:", err);
        setError("Failed to load current affairs.");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentAffairs();
  }, []);

  const categories = ["All", ...Array.from(new Set(currentAffairs.map(a => a.category)))];

  const filteredAffairs = currentAffairs.filter((affair) => {
    const matchesCategory = selectedCategory === "All" || affair.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      affair.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affair.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affair.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const affairDate = new Date(affair.date).getTime();
    const now = Date.now();
    let matchesDate = true;

    switch (dateRange) {
      case "1Week":
        matchesDate = affairDate >= now - 7 * 24 * 60 * 60 * 1000;
        break;
      case "1Month":
        matchesDate = affairDate >= new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime();
        break;
      case "6Months":
        matchesDate = affairDate >= new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime();
        break;
      case "1Year":
        matchesDate = affairDate >= new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime();
        break;
      default:
        matchesDate = true;
    }

    return matchesCategory && matchesSearch && matchesDate;
  });

  const formatCardDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear().toString().slice(-2);

    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${getOrdinal(day)} ${month} ${year}`;
  };

  if (loading) return <div className="text-center mt-20">Loading current affairs...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

  if (selectedAffair) {
    return (
      <div className="min-h-screen bg-gray-50 pt-5">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <button onClick={() => setSelectedAffair(null)} className="flex items-center text-blue-600 hover:text-blue-800 mb-8">
            ← Back to Current Affairs
          </button>
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {selectedAffair.image_url && (
              <img src={selectedAffair.image_url} alt={selectedAffair.title} className="w-full h-[400px] object-cover" />
            )}
            <div className="p-8">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-3">
                {selectedAffair.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedAffair.title}</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 mb-6">{selectedAffair.summary}</p>
                <p className="text-gray-700">{selectedAffair.content}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Current Affairs</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest developments in politics, economy, science, and more</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Search current affairs..." value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="All">All Time</option>
                <option value="1Week">Last 1 Week</option>
                <option value="1Month">Last 1 Month</option>
                <option value="6Months">Last 6 Months</option>
                <option value="1Year">Last 1 Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Affairs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAffairs.map(affair => (
            <div key={affair.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {affair.image_url && <img src={affair.image_url} alt={affair.title} className="w-full h-48 object-cover rounded-t-lg" />}
              <div className="p-6">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">{affair.category}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{affair.title}</h3>
                <div className="text-sm text-gray-500 mb-2">{formatCardDate(affair.date)}</div>
                <p className="text-gray-600 mb-4 line-clamp-2">{affair.content}</p>
                <button onClick={() => setSelectedAffair(affair)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-1" /> Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAffairs.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No current affairs found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
