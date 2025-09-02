import React, { useEffect, useRef, useState } from 'react';

const bannerData = [
  {
    image: "https://www.insightsonindia.com/wp-content/uploads/2025/07/OGP-2026-Batch-7-Bengaluru-desktop-ad-banner.png",
    url: "https://example.com/page1",
  },
  {
    image: "https://www.insightsonindia.com/wp-content/uploads/2025/07/IPM-2.0-2026-Desktop-ad-banner.png",
    url: "https://example.com/page2",
  },
  {
    image: "https://www.insightsonindia.com/wp-content/uploads/2025/07/OGP-2026-Batch-7-Bengaluru-desktop-ad-banner.png",
    url: "https://example.com/page1",
  },
  {
    image: "https://www.insightsonindia.com/wp-content/uploads/2025/07/IPM-2.0-2026-Desktop-ad-banner.png",
    url: "https://example.com/page2",
  }
];

// Clone first slide to end for smooth loop
const carouselSlides = [...bannerData, bannerData[0]];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsTransitioning(true);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset transition when reaching cloned slide
  useEffect(() => {
    if (currentIndex === bannerData.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Disable transition
        setCurrentIndex(0);        // Jump to original first
      }, 700); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">

      {/* Banner Carousel */}
      <div className="w-full overflow-hidden h-24 z-20 relative">
        <div
          ref={sliderRef}
          className="flex"
          style={{
            width: `${carouselSlides.length * 100}%`,
            transform: `translateX(-${(100 / carouselSlides.length) * currentIndex}%)`,
            transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none',
          }}
        >
          {carouselSlides.map((banner, index) => (
            <a
              key={index}
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex-shrink-0"
            >
              <img
                src={banner.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-24 object-contain cursor-pointer"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/deloaiprivatelimited/qdb/main/WhatsApp%20Image%202025-06-23%20at%207.42.11%20PM.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto mt-10">
        <h1 className="text-5xl font-bold text-white mb-6">WELCOME</h1>
        <h1 className="text-5xl font-bold text-white mb-6">TO</h1>
        <h1 className="text-5xl font-bold text-white mb-6">AZAD ICS ACADEMY</h1>
        <p className="text-xl text-gray-200">
          Civil Services Examination is the most coveted Examination in the country, which gives you the golden opportunity to be a part of the team driving the nation.
        </p>
      </div>
    </div>
  );
}
