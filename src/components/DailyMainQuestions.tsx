import { useState, useEffect } from 'react';
import { Calendar, HelpCircle, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';

interface DMQItem {
  id: string;
  date_time: string;
  category: string;
  question: string;
  answer: string;
}

const API_BASE_URL = 'https://api.srinivasiasacademy.in/dmq';

export default function DMQUserPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [items, setItems] = useState<DMQItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAnswers, setVisibleAnswers] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchItemsByDate(selectedDate);
  }, [selectedDate]);

  const fetchItemsByDate = async (date: string) => {
    setIsLoading(true);
    setVisibleAnswers(new Set());

    try {
      const response = await fetch(`${API_BASE_URL}/items/by_date?date=${date}`);
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAnswer = (id: string) => {
    setVisibleAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const changeDate = (direction: 'prev' | 'next') => {
    const current = new Date(selectedDate);
    if (direction === 'prev') {
      current.setDate(current.getDate() - 1);
    } else {
      current.setDate(current.getDate() + 1);
    }
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 mb-4">
            <HelpCircle size={32} className="text-violet-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Daily MCQ</h1>
          <p className="text-lg text-slate-600">Practice questions for your exam preparation</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Calendar size={20} className="text-violet-600" />
              Select Date
            </h2>
            {!isToday && (
              <button
                onClick={goToToday}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                Go to Today
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => changeDate('prev')}
              className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
              title="Previous day"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-center font-medium text-slate-900"
            />

            <button
              onClick={() => changeDate('next')}
              className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
              title="Next day"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">{formatDate(selectedDate)}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600"></div>
            <p className="mt-4 text-slate-600">Loading questions...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <HelpCircle size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Questions Available</h3>
            <p className="text-slate-600">
              There are no MCQ questions for {formatDate(selectedDate)}.
            </p>
            <p className="text-sm text-slate-500 mt-2">Try selecting a different date.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-slate-900">
                {items.length} {items.length === 1 ? 'Question' : 'Questions'} for {formatDate(selectedDate)}
              </p>
            </div>

            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-20 text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-violet-100">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2">QUESTION</h3>
                    <p className="text-lg text-slate-900 leading-relaxed">
                      {item.question}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <button
                      onClick={() => toggleAnswer(item.id)}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        visibleAnswers.has(item.id)
                          ? 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                          : 'bg-violet-600 text-white hover:bg-violet-700'
                      }`}
                    >
                      {visibleAnswers.has(item.id) ? (
                        <>
                          <EyeOff size={20} />
                          Hide Answer
                        </>
                      ) : (
                        <>
                          <Eye size={20} />
                          View Answer
                        </>
                      )}
                    </button>

                    {visibleAnswers.has(item.id) && (
                      <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg animate-fadeIn">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">ANSWER</h3>
                        <p className="text-base text-green-900 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
