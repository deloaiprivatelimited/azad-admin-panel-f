import React, { useState } from 'react';
import { Calendar, Clock, Globe, TrendingUp, Filter, Search, Eye, Download, BookOpen } from 'lucide-react';

interface CurrentAffair {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  importance: 'High' | 'Medium' | 'Low';
  tags: string[];
  content: string;
  source: string;
  image?: string;
}

const currentAffairs: CurrentAffair[] = [
  {
    id: '1',
    title: 'India-Japan Strategic Partnership: New Defense Cooperation Agreement',
    summary: 'India and Japan signed a comprehensive defense cooperation agreement focusing on technology transfer and joint military exercises.',
    category: 'International Relations',
    date: '2024-03-15',
    readTime: '5 min read',
    importance: 'High',
    tags: ['India-Japan Relations', 'Defense', 'Strategic Partnership'],
    content: 'Detailed analysis of the India-Japan defense cooperation agreement and its implications for regional security...',
    source: 'Ministry of External Affairs',
    image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Digital India Initiative: New Cybersecurity Framework Launched',
    summary: 'Government launches comprehensive cybersecurity framework to protect critical digital infrastructure.',
    category: 'Science & Technology',
    date: '2024-03-14',
    readTime: '4 min read',
    importance: 'High',
    tags: ['Digital India', 'Cybersecurity', 'Technology Policy'],
    content: 'Analysis of the new cybersecurity framework and its impact on digital governance...',
    source: 'Ministry of Electronics and IT',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Climate Change: India\'s Updated Nationally Determined Contributions',
    summary: 'India submits enhanced climate commitments with ambitious renewable energy targets for 2030.',
    category: 'Environment',
    date: '2024-03-13',
    readTime: '6 min read',
    importance: 'High',
    tags: ['Climate Change', 'NDC', 'Renewable Energy'],
    content: 'Comprehensive overview of India\'s climate commitments and renewable energy strategy...',
    source: 'Ministry of Environment',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Economic Survey 2024: GDP Growth Projections and Key Highlights',
    summary: 'Economic Survey projects 6.5% GDP growth with focus on manufacturing and services sector expansion.',
    category: 'Economy',
    date: '2024-03-12',
    readTime: '7 min read',
    importance: 'High',
    tags: ['Economic Survey', 'GDP Growth', 'Manufacturing'],
    content: 'Detailed analysis of Economic Survey findings and their implications for policy making...',
    source: 'Ministry of Finance',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Supreme Court Verdict: Right to Privacy in Digital Age',
    summary: 'Supreme Court delivers landmark judgment on digital privacy rights and data protection.',
    category: 'Polity & Governance',
    date: '2024-03-11',
    readTime: '5 min read',
    importance: 'High',
    tags: ['Supreme Court', 'Privacy Rights', 'Digital Rights'],
    content: 'Analysis of the Supreme Court judgment on digital privacy and its constitutional implications...',
    source: 'Supreme Court of India',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Karnataka State Budget 2024-25: Key Allocations and Schemes',
    summary: 'Karnataka presents budget with increased allocation for education, healthcare, and rural development.',
    category: 'State Affairs',
    date: '2024-03-10',
    readTime: '6 min read',
    importance: 'Medium',
    tags: ['Karnataka Budget', 'State Finance', 'Rural Development'],
    content: 'Comprehensive analysis of Karnataka state budget and its impact on development priorities...',
    source: 'Government of Karnataka',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    title: 'Space Technology: ISRO\'s Chandrayaan-4 Mission Approved',
    summary: 'Government approves ISRO\'s ambitious Chandrayaan-4 mission for lunar sample return.',
    category: 'Science & Technology',
    date: '2024-03-09',
    readTime: '4 min read',
    importance: 'Medium',
    tags: ['ISRO', 'Space Mission', 'Chandrayaan'],
    content: 'Details about ISRO\'s upcoming lunar mission and its scientific objectives...',
    source: 'Indian Space Research Organisation',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    title: 'Agricultural Reforms: New Crop Insurance Scheme Launched',
    summary: 'Government launches enhanced crop insurance scheme with better coverage and faster claim settlement.',
    category: 'Agriculture',
    date: '2024-03-08',
    readTime: '5 min read',
    importance: 'Medium',
    tags: ['Agriculture', 'Crop Insurance', 'Farmer Welfare'],
    content: 'Analysis of the new crop insurance scheme and its benefits for farmers...',
    source: 'Ministry of Agriculture',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export function CurrentAffairsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAffair, setSelectedAffair] = useState<CurrentAffair | null>(null);

  const categories = ['All', ...Array.from(new Set(currentAffairs.map(affair => affair.category)))];
  const importanceLevels = ['All', 'High', 'Medium', 'Low'];

  const filteredAffairs = currentAffairs.filter(affair => {
    const matchesCategory = selectedCategory === 'All' || affair.category === selectedCategory;
    const matchesImportance = selectedImportance === 'All' || affair.importance === selectedImportance;
    const matchesSearch = searchTerm === '' || 
      affair.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affair.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affair.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesImportance && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'International Relations': 'bg-blue-100 text-blue-800',
      'Science & Technology': 'bg-purple-100 text-purple-800',
      'Environment': 'bg-green-100 text-green-800',
      'Economy': 'bg-yellow-100 text-yellow-800',
      'Polity & Governance': 'bg-red-100 text-red-800',
      'State Affairs': 'bg-indigo-100 text-indigo-800',
      'Agriculture': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (selectedAffair) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => setSelectedAffair(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            ← Back to Current Affairs
          </button>

          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {selectedAffair.image && (
              <img 
                src={selectedAffair.image} 
                alt={selectedAffair.title}
                className="w-full h-[400px] object-cover"
              />
            )}
            
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedAffair.category)}`}>
                  {selectedAffair.category}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getImportanceColor(selectedAffair.importance)}`}>
                  {selectedAffair.importance} Priority
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedAffair.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(selectedAffair.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{selectedAffair.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{selectedAffair.source}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 mb-6">{selectedAffair.summary}</p>
                <p className="text-gray-700">{selectedAffair.content}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAffair.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Current Affairs</h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest developments in politics, economy, science, and more
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{currentAffairs.length}</div>
            <div className="text-gray-600">Total Updates</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{categories.length - 1}</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{currentAffairs.filter(a => a.importance === 'High').length}</div>
            <div className="text-gray-600">High Priority</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">Daily</div>
            <div className="text-gray-600">Updates</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Current Affairs</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Importance Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={selectedImportance}
                onChange={(e) => setSelectedImportance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {importanceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search current affairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredAffairs.length} of {currentAffairs.length} updates
          </div>
        </div>

        {/* Current Affairs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAffairs.map((affair) => (
            <div key={affair.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {affair.image && (
                <img 
                  src={affair.image} 
                  alt={affair.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              
              <div className="p-6">
                {/* Header with badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(affair.category)}`}>
                    {affair.category}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getImportanceColor(affair.importance)}`}>
                    {affair.importance}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{affair.title}</h3>
                
                {/* Summary */}
                <p className="text-gray-600 mb-4 line-clamp-3">{affair.summary}</p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(affair.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{affair.readTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {affair.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {affair.tags.length > 2 && (
                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{affair.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedAffair(affair)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Read More
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAffairs.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No current affairs found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Study Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
          <div className="text-center mb-6">
            <BookOpen className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">How to Study Current Affairs Effectively</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Daily Routine:</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Read 2-3 high priority updates daily</li>
                <li>• Make concise notes with key points</li>
                <li>• Connect current events with static topics</li>
                <li>• Practice writing short summaries</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Exam Strategy:</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Focus on government policies and schemes</li>
                <li>• Track international relations developments</li>
                <li>• Monitor economic indicators and reforms</li>
                <li>• Stay updated on scientific breakthroughs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}