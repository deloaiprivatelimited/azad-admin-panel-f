import React, { useRef, useState, useEffect } from 'react';

type Faculty = {
  id: string;
  name: string;
  title: string;
  image_url: string;
  one_line_description: string;
  full_description: string;
  created_at: string;
  updated_at: string;
};

export function FacultyShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch('https://api.srinivasiasacademy.in/faculty/items');
        if (!response.ok) {
          throw new Error('Failed to fetch faculty data');
        }
        const data = await response.json();
        setFaculty(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch faculty data');
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <div className="bg-gray-50 py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto rounded-xl p-8 relative">
        <h2 className="text-3xl font-bold text-center text-[#FF5722] mb-12">
          Meet Our Expert Faculty
        </h2>

        {loading ? (
          <div className="text-center py-8">Loading faculty data...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : faculty.length === 0 ? (
          <div className="text-center py-8">No faculty members found.</div>
        ) : (
          <>
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-20 hover:bg-gray-100"
            >
              ◀
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-20 hover:bg-gray-100"
            >
              ▶
            </button>

            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 w-max">
                {faculty.map((f) => (
                  <div
                    key={f.id}
                    className="bg-gray-50 rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0"
                  >
                    <img
                      src={f.image_url}
                      alt={f.name}
                      className="w-full h-48 object-contain"
                    />
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900">{f.name}</h3>
                      <p className="text-sm text-[#FF5722] mb-2">{f.title}</p>
                      <p className="text-gray-600 text-sm mb-4">{f.one_line_description}</p>
                      <button
                        onClick={() => setSelectedFaculty(f)}
                        className="text-[#FF5722] font-medium hover:underline"
                      >
                        View More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <img
              src={selectedFaculty.image_url}
              alt={selectedFaculty.name}
              className="w-full h-48 object-contain rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">{selectedFaculty.name}</h3>
            <p className="text-sm text-blue-600 mb-2">{selectedFaculty.title}</p>
            <p className="text-gray-700">{selectedFaculty.full_description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
