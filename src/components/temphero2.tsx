import React, { useEffect, useRef, useState } from 'react';
import TopperScrollSection from './TopperCoursel';
import img1 from'../srinivas.jpg';  
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

// Duplicate first slide for seamless looping
const extendedBannerData = [...bannerData, bannerData[0]];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 for seamless loop
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const sliderRef = useRef(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const announcements = [
    { text: "OGP 2026 Admissions Open", url: "https://example.com/ogp-2026" },
    { text: "IAS 2025 Prelims Date Announced", url: "https://example.com/prelims-date" },
    { text: "Download UPSC 2025 Notification", url: "https://example.com/upsc-2025-notification" },
    { text: "New Batches Starting Soon", url: "https://example.com/new-batches" },
    { text: "Join SRINIVAS IAS Academy Today", url: "https://example.com/azad-ics" }
  ];

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    // Seamless loop back to first real slide when hitting the duplicate
    if (currentIndex === extendedBannerData.length - 1) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(1);
      }, 600); // wait for transition to complete
    } else {
      setTransitionEnabled(true);
    }
  }, [currentIndex]);

  const handleClick = () => {
    const index = currentIndex === extendedBannerData.length - 1 ? 0 : currentIndex;
    window.location.href = bannerData[index].url;
  };

  return (
    <>
      {/* Marquee Animation Style */}
      <style>
        {`
          @keyframes scroll-text {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      {/* Marquee Container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '10px 0',
        }}
        onMouseEnter={() => setIsMarqueePaused(true)}
        onMouseLeave={() => setIsMarqueePaused(false)}
      >
        {/* Mic Icon */}
        <div style={{ flex: '0 0 auto', padding: '0 20px' }}>
          <img
            src="https://www.insightsonindia.com/wp-content/uploads/2024/09/announcement.png"
            alt="Mic Icon"
            style={{ width: '24px', height: '24px' }}
          />
        </div>

        {/* Scrolling Text */}
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', flex: 1 }}>
          <div
            style={{
              display: 'inline-block',
              animation: 'scroll-text 25s linear infinite',
              animationPlayState: isMarqueePaused ? 'paused' : 'running',
            }}
          >
            {announcements.map((item, index) => (
              <span key={index} style={{ marginRight: '30px' }}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FF5722', fontWeight: 'bold', textDecoration: 'none' }}
                >
                  {item.text}
                </a>
                {index !== announcements.length - 1 && (
                  <span style={{ color: 'black', margin: '0 20px' }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Carousel */}
      <div
        style={{
          marginTop: "20px",
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={handleClick}
      >
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            width: `${extendedBannerData.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / extendedBannerData.length)}%)`,
            transition: transitionEnabled ? 'transform 0.6s ease-in-out' : 'none',
          }}
        >
          {extendedBannerData.map((banner, index) => (
            <img
              key={index}
              src={banner.image}
              alt={`Banner ${index}`}
              style={{
                width: `${100 / extendedBannerData.length}%`,
                flexShrink: 0,
                height: 'auto',
                display: 'block',
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content: 3 Columns */}
      <div
        style={{
          display: 'flex',
          marginTop: '40px',
          marginInline: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
          gap: '20px',
        }}
      >
        {/* Left Column */}
        <div
          style={{
            flex: '0 0 30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '70vh',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#FF5722',
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: '1.4',
            }}
          >
            <div>Welcome to</div>
            <div>SRINIVAS IAS ACADEMY</div>
          </div>

          <img
            src={img1}
            alt="Azad ICS Academy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover',
              flexGrow: 1,
            }}
          />
        </div>

        {/* Middle Column */}
        <div
          style={{
            flex: '0 0 45%',
            paddingLeft: '20px',
            height: '70vh',
            overflowY: 'auto',
          }}
        >
          <TopperScrollSection />
        </div>

        {/* Right Column – Latest Updates */}
        <div
          style={{
            flex: '0 0 25%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '5px',
              backgroundColor: 'red',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
            }}
          >
            Latest Updates
          </h3>

          {[
            { title: "UPSC IAS 2025 Notification Released", url: "https://example.com/upsc-ias-2025-notification" },
            { title: "IAS 2025 Prelims Exam Date Announced", url: "https://example.com/ias-2025-prelims-date" },
            { title: "New UPSC Syllabus for IAS 2025 Published", url: "https://example.com/upsc-ias-2025-syllabus" },
            { title: "IAS 2024 Mains Result Declared", url: "https://example.com/ias-2024-mains-result" },
            { title: "UPSC Admit Card for IAS Prelims 2025 Released", url: "https://example.com/ias-2025-admit-card" },
            { title: "UPSC IAS 2024 Final Cutoff Marks Published", url: "https://example.com/ias-2024-final-cutoff" }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  color: '#FF5722',
                  textDecoration: 'none',
                }}
              >
                {item.title}
              </a>
              {idx < 5 && <hr style={{ margin: '0 0' }} />}
            </React.Fragment>
          ))}

          <img
            src="https://new-chemical-today.s3.amazonaws.com/advertisements/rockwell-1/rockwell-1/Hero_Banner_400x200px.jpg"
            alt="Ad Poster"
            style={{
              width: '400px',
              height: '200px',
              marginTop: '20px',
              borderRadius: '8px',
              objectFit: 'fill',
            }}
          />
        </div>
      </div>
    </>
  );
}
