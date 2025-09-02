import React, { useState } from 'react';
import { Download, FileText, Calendar, Search, Filter } from 'lucide-react';

interface PYQPaper {
  id: string;
  exam: string;
  year: number;
  paper: string;
  language: string;
  fileSize: string;
  downloadUrl: string;
  category: 'Prelims' | 'Mains' | 'Interview';
}

const pyqPapers: PYQPaper[] = [
  // UPSC Papers
  {
    id: '1',
    exam: 'UPSC',
    year: 2023,
    paper: 'General Studies Paper I',
    language: 'English',
    fileSize: '2.5 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '2',
    exam: 'UPSC',
    year: 2023,
    paper: 'General Studies Paper II (CSAT)',
    language: 'English',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '3',
    exam: 'UPSC',
    year: 2023,
    paper: 'Essay Paper',
    language: 'English',
    fileSize: '1.2 MB',
    downloadUrl: '#',
    category: 'Mains'
  },
  {
    id: '4',
    exam: 'UPSC',
    year: 2023,
    paper: 'General Studies Paper I (Mains)',
    language: 'English',
    fileSize: '3.1 MB',
    downloadUrl: '#',
    category: 'Mains'
  },
  {
    id: '5',
    exam: 'UPSC',
    year: 2022,
    paper: 'General Studies Paper I',
    language: 'English',
    fileSize: '2.3 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '6',
    exam: 'UPSC',
    year: 2022,
    paper: 'General Studies Paper II (CSAT)',
    language: 'English',
    fileSize: '1.9 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  // KAS Papers
  {
    id: '7',
    exam: 'KAS',
    year: 2023,
    paper: 'General Studies Paper I',
    language: 'English',
    fileSize: '2.1 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '8',
    exam: 'KAS',
    year: 2023,
    paper: 'General Studies Paper I',
    language: 'Kannada',
    fileSize: '2.2 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '9',
    exam: 'KAS',
    year: 2023,
    paper: 'General Studies Paper II',
    language: 'English',
    fileSize: '1.7 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '10',
    exam: 'KAS',
    year: 2022,
    paper: 'General Studies Paper I',
    language: 'English',
    fileSize: '2.0 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  // PDO Papers
  {
    id: '11',
    exam: 'PDO',
    year: 2023,
    paper: 'General Knowledge',
    language: 'English',
    fileSize: '1.5 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '12',
    exam: 'PDO',
    year: 2023,
    paper: 'General Knowledge',
    language: 'Kannada',
    fileSize: '1.6 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  // VAO Papers
  {
    id: '13',
    exam: 'VAO',
    year: 2023,
    paper: 'General Studies',
    language: 'English',
    fileSize: '1.4 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '14',
    exam: 'VAO',
    year: 2023,
    paper: 'General Studies',
    language: 'Kannada',
    fileSize: '1.5 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  // Group B Papers
  {
    id: '15',
    exam: 'Group B',
    year: 2023,
    paper: 'General Studies',
    language: 'English',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    category: 'Prelims'
  },
  {
    id: '16',
    exam: 'CTI',
    year: 2023,
    paper: 'General Studies',
    language: 'English',
    fileSize: '1.6 MB',
    downloadUrl: '#',
    category: 'Prelims'
  }
];

export function PYQPage() {
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const exams = ['All', ...Array.from(new Set(pyqPapers.map(paper => paper.exam)))];
  const years = ['All', ...Array.from(new Set(pyqPapers.map(paper => paper.year.toString()))).sort().reverse()];
  const categories = ['All', 'Prelims', 'Mains', 'Interview'];

  const filteredPapers = pyqPapers.filter(paper => {
    const matchesExam = selectedExam === 'All' || paper.exam === selectedExam;
    const matchesYear = selectedYear === 'All' || paper.year.toString() === selectedYear;
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      paper.paper.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.exam.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesExam && matchesYear && matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prelims':
        return 'bg-blue-100 text-blue-800';
      case 'Mains':
        return 'bg-green-100 text-green-800';
      case 'Interview':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamColor = (exam: string) => {
    const colors: { [key: string]: string } = {
      'UPSC': 'bg-red-100 text-red-800',
      'KAS': 'bg-orange-100 text-orange-800',
      'PDO': 'bg-teal-100 text-teal-800',
      'VAO': 'bg-indigo-100 text-indigo-800',
      'Group B': 'bg-pink-100 text-pink-800',
      'CTI': 'bg-yellow-100 text-yellow-800'
    };
    return colors[exam] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Previous Year Questions (PYQ)</h1>
          <p className="text-xl text-gray-600">
            Download previous year question papers for comprehensive exam preparation
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Papers</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            {/* Exam Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {exams.map(exam => (
                  <option key={exam} value={exam}>{exam}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

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

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredPapers.length} of {pyqPapers.length} papers
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                {/* Header with badges */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getExamColor(paper.exam)}`}>
                      {paper.exam}
                    </span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(paper.category)}`}>
                      {paper.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{paper.year}</span>
                  </div>
                </div>

                {/* Paper Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{paper.paper}</h3>
                
                {/* Language and File Size */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Language: {paper.language}</span>
                  <span>Size: {paper.fileSize}</span>
                </div>

                {/* Download Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No papers found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Statistics Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{pyqPapers.length}</div>
              <div className="text-blue-100">Total Papers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{exams.length - 1}</div>
              <div className="text-blue-100">Different Exams</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{years.length - 1}</div>
              <div className="text-blue-100">Years Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2</div>
              <div className="text-blue-100">Languages</div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">📚 How to Use PYQ Effectively</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Start with recent years and work backwards to understand exam patterns</li>
            <li>• Time yourself while solving to simulate exam conditions</li>
            <li>• Analyze your mistakes and identify weak areas for focused study</li>
            <li>• Practice papers from the same exam multiple times for better retention</li>
            <li>• Use PYQs to validate your preparation level before the actual exam</li>
          </ul>
        </div>
      </div>
    </div>
  );
}