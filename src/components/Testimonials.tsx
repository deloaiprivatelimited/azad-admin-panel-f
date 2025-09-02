import React, { useRef, useState } from 'react';

type Faculty = {
  name: string;
  title: string;
  image_url: string;
  one_line_sec: string;
  full_desc: string;
};

export function FacultyShowcase({ faculty }: { faculty: Faculty[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 300; // Adjust as needed

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto rounded-xl p-8 relative">
        <h2 className="text-3xl font-bold text-center text-[#FF5722] mb-12">
          Meet Our Expert Faculty
        </h2>

        {/* Arrows */}
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
            {faculty.map((f, idx) => (
              <div
                key={idx}
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
                  <p className="text-gray-600 text-sm mb-4">{f.one_line_sec}</p>
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
              className="w-full h-48 object-contain  rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">{selectedFaculty.name}</h3>
            <p className="text-sm text-blue-600 mb-2">{selectedFaculty.title}</p>
            <p className="text-gray-700">{selectedFaculty.full_desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
