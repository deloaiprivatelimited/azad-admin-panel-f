import { useState, useEffect } from 'react';
import { BookOpen, ArrowLeft, FileText, Loader, Eye } from 'lucide-react';

interface StudyPDFItem {
  id: string;
  language: string;
  course: string;
  topic: string;
  title: string;
  pdf_url: string;
  created_at?: string;
  updated_at?: string;
}

interface SearchResponse {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  items: StudyPDFItem[];
}

interface StudyMaterialPageProps {
  language: string;
  course: string;
  subject: string;
  onBack: () => void;
}

const API_BASE_URL = 'https://api.srinivasiasacademy.in/study-pdfs';

export function StudyMaterialPage({ language, course, subject, onBack }: StudyMaterialPageProps) {
  const [items, setItems] = useState<StudyPDFItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const perPage = 20;

  useEffect(() => {
    fetchItems();
  }, [page, language, course, subject]);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        language,
        course,
        topic: subject,
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch study materials');
      }

      const data: SearchResponse = await response.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.total_pages || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load study materials');
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openPDF = (pdfUrl: string, title: string) => {
    const viewerUrl = `/pdf?url=${encodeURIComponent(pdfUrl)}&title=${encodeURIComponent(title)}`;
    window.open(viewerUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <BookOpen size={28} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{subject}</h1>
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                    {course}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">
                    {language}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <Loader size={48} className="text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading study materials...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <FileText size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Materials</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={() => fetchItems()}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <FileText size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Study Materials Found</h3>
            <p className="text-slate-600">
              There are no study materials available for {subject} in {language} for {course}.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{items.length}</span> of{' '}
                <span className="font-semibold text-slate-900">{total}</span> materials
                {totalPages > 1 && (
                  <span> (Page {page} of {totalPages})</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white bg-opacity-20 mx-auto">
                      <FileText size={24} className="text-white" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-3 line-clamp-2 min-h-[3rem] text-lg">
                      {item.title || item.topic}
                    </h3>

                    <div className="mb-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        {item.topic}
                      </span>
                    </div>

                    <button
                      onClick={() => openPDF(item.pdf_url, item.title || item.topic)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-semibold group-hover:bg-emerald-600 group-hover:text-white"
                    >
                      <Eye size={16} />
                      View PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {page > 2 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                      >
                        1
                      </button>
                      {page > 3 && (
                        <span className="px-2 text-slate-500">...</span>
                      )}
                    </>
                  )}

                  {page > 1 && (
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                    >
                      {page - 1}
                    </button>
                  )}

                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-semibold"
                  >
                    {page}
                  </button>

                  {page < totalPages && (
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                    >
                      {page + 1}
                    </button>
                  )}

                  {page < totalPages - 1 && (
                    <>
                      {page < totalPages - 2 && (
                        <span className="px-2 text-slate-500">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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

export default StudyMaterialPage;
