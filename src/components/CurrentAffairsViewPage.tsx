import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Tag, Newspaper, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

interface CurrentAffairItem {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  images?: string[]; // now supports multiple image URLs
}

const API_BASE_URL = 'https://api.srinivasiasacademy.in/current-affairs';

export default function CurrentAffairsViewPage() {
  const [item, setItem] = useState<CurrentAffairItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const params = useParams();
  const id = params.id; // string | undefined
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchItem(id);
    } else {
      setError('No article ID provided');
      setIsLoading(false);
    }
  }, [id]);

  const fetchItem = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`);

      if (!response.ok) {
        throw new Error('Article not found');
      }

      const data = await response.json();

      // Ensure images is an array (backend returns images[]). Keep backwards compatibility: if image_url exists, convert it.
      if (data) {
        if (!Array.isArray(data.images) && data.image_url) {
          data.images = [data.image_url];
        }
        data.images = Array.isArray(data.images) ? data.images : [];
      }

      setItem(data);
      setMainImageIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => navigate(-1);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <Newspaper size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h2>
          <p className="text-slate-600 mb-6">{error || 'The requested article could not be found.'}</p>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = item.images || [];
  const mainImage = images.length > 0 ? images[mainImageIndex] : undefined;

  const showPrevImage = () => {
    setMainImageIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0));
  };
  const showNextImage = () => {
    setMainImageIndex((i) => (images.length ? (i + 1) % images.length : 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm"
          >
            <ArrowLeft size={18} />
            Back to List
          </button>
        </div>

        <article className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {mainImage ? (
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img src={mainImage} alt={`${item.title} — image ${mainImageIndex + 1}`} className="w-full h-full object-cover" />

              {images.length > 1 && (
                <>
                  <button
                    onClick={showPrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow-md hover:scale-105 transition-transform"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={showNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow-md hover:scale-105 transition-transform"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-slate-100 text-slate-400">
              No image available
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                {item.category}
              </span>
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar size={16} />
                <span className="text-sm">{formatDate(item.date)}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">{item.title}</h1>

            {images.length > 1 && (
              <div className="mb-6 px-1">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImageIndex(idx)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border ${idx === mainImageIndex ? 'ring-2 ring-blue-400' : 'border-slate-200'} bg-white`}
                      style={{ width: 110, height: 66 }}
                      aria-label={`Show image ${idx + 1}`}>
                      <img src={src} alt={`${item.title} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-8 flex-wrap pb-6 border-b border-slate-200">
                <Tag size={16} className="text-slate-400" />
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">{tag}</span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">{item.content}</div>
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .prose {
          color: #334155;
          font-size: 1.125rem;
          line-height: 1.75;
        }
        .prose p {
          margin-bottom: 1.25rem;
        }
        .prose strong {
          font-weight: 600;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
}
