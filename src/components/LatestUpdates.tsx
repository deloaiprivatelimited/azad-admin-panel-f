import React, { useEffect, useRef, useState } from 'react';

export function LatestUpdates() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const updates = [
    {
      id: 1,
      title: "New Study Materials Added",
      date: "March 15, 2024",
      description: "Latest UPSC Economics materials now available"
    },
    {
      id: 2,
      title: "Mock Test Series Starting",
      date: "March 14, 2024",
      description: "Comprehensive test series for UPSC Prelims"
    },
    {
      id: 3,
      title: "Special Workshop Announced",
      date: "March 13, 2024",
      description: "Interview preparation workshop by top experts"
    },
    {
      id: 4,
      title: "KAS Study Circle",
      date: "March 12, 2024",
      description: "New batch starting for KAS aspirants"
    },
    {
      id: 5,
      title: "Success Story",
      date: "March 11, 2024",
      description: "Our student ranks in top 100 in UPSC"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let currentPosition = 0;
    const scrollHeight = scrollContainer.scrollHeight;
    const containerHeight = scrollContainer.clientHeight;

    const scroll = () => {
      if (!scrollContainer || isPaused) return;
      
      currentPosition += 1;
      scrollContainer.scrollTop = currentPosition;

      if (currentPosition >= scrollHeight - containerHeight) {
        currentPosition = 0;
      }
    };

    const intervalId = setInterval(scroll, 50);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-6rem)] border-2 border-red-200">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg mb-4 shadow-md">
        <h2 className="text-xl font-bold text-center">Latest Updates</h2>
      </div>
      <div 
        ref={scrollRef}
        className="overflow-hidden h-[calc(100%-5rem)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="border-b border-gray-200 pb-4 last:border-b-0 hover:bg-red-50 transition-colors duration-200 p-2 rounded">
              <h3 className="font-semibold text-red-700 hover:text-red-800">{update.title}</h3>
              <p className="text-sm text-red-500 font-medium">{update.date}</p>
              <p className="text-gray-700 mt-1">{update.description}</p>
            </div>
          ))}
          {/* Duplicate items for smooth infinite scroll */}
          {updates.map((update) => (
            <div key={`duplicate-${update.id}`} className="border-b border-gray-200 pb-4 last:border-b-0 hover:bg-red-50 transition-colors duration-200 p-2 rounded">
              <h3 className="font-semibold text-red-700 hover:text-red-800">{update.title}</h3>
              <p className="text-sm text-red-500 font-medium">{update.date}</p>
              <p className="text-gray-700 mt-1">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}