import React, { useEffect, useRef, useState } from 'react';
import TopperScrollSection from './TopperCoursel';
import img1 from '../srinivas.jpg';
import { MdCampaign } from 'react-icons/md';

interface BannerItem {
  id: string;
  name: string;
  image_url: string;
  redirect_url: string | null;
  created_at: string;
  updated_at: string;
}

interface LatestUpdateItem {
  id: string;
  text_content: string;
  redirect_url: string | null;
  created_at: string;
  updated_at: string;
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  interface Announcement {
    id: string;
    text_content: string;
    redirect_url: string | null;
    created_at: string;
    updated_at: string;
  }

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [bannerData, setBannerData] = useState<BannerItem[]>([]);
  const [latestUpdates, setLatestUpdates] = useState<LatestUpdateItem[]>([]);

  // --- NEW: ad image rotation with redirect links (fetched from API) ---
  interface SideBannerItem {
    id: string;
    name: string;
    image_url: string;
    redirect_url: string | null;
    created_at: string;
    updated_at: string;
  }

  const [adImages, setAdImages] = useState<SideBannerItem[]>([]);
  const [adIndex, setAdIndex] = useState(0);
  const [isAdPaused, setIsAdPaused] = useState(false);

  // Fetch ad images from /side-banner/items
  useEffect(() => {
    const fetchAdImages = async () => {
      try {
        const response = await fetch('https://api.srinivasiasacademy.in/side-banner/items');
        if (!response.ok) throw new Error('Failed to fetch side banner ads');
        const data = await response.json();
        setAdImages(data.items || []);
        // Preload images
        (data.items || []).forEach((item: SideBannerItem) => {
          const img = new window.Image();
          img.src = item.image_url;
        });
      } catch (error) {
        console.error('Error fetching side banner ads:', error);
      }
    };
    fetchAdImages();
  }, []);

  // automatic rotation every 3s
  useEffect(() => {
    if (!adImages.length) return;
    const interval = setInterval(() => {
      if (!isAdPaused && adImages.length > 0) {
        setAdIndex((prev) => (prev + 1) % adImages.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAdPaused, adImages.length]);

  // --- existing data fetches ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerResponse, updatesResponse] = await Promise.all([
          fetch('https://api.srinivasiasacademy.in/horizontal-banner/items'),
          fetch('https://api.srinivasiasacademy.in/latestupdates/items')
        ]);

        if (!bannerResponse.ok) throw new Error('Failed to fetch banner data');
        if (!updatesResponse.ok) throw new Error('Failed to fetch latest updates');

        const bannerJson = await bannerResponse.json();
        const updatesJson = await updatesResponse.json();

        const items = bannerJson.items || [];
        setBannerData([...items, items[0] || {}, items[1] || {}]);
        setLatestUpdates(updatesJson.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://api.srinivasiasacademy.in/topscroll/items');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(data.items || []);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (currentIndex === bannerData.length - 1) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(1);
      }, 600);
    } else {
      setTransitionEnabled(true);
    }
  }, [currentIndex, bannerData.length]);

  const handleClick = () => {
    const index = currentIndex === bannerData.length - 1 ? 0 : currentIndex;
    const redirectUrl = bannerData[index]?.redirect_url;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes scroll-text {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          @media (max-width: 768px) {
            .hero-columns {
              flex-direction: column !important;
            }

            .hero-column {
              flex: 1 1 100% !important;
              width: 100% !important;
              height: auto !important;
              min-height: auto !important;
            }

            .welcome-section {
              height: auto !important;
              min-height: 300px !important;
            }

            .topper-section {
              height: auto !important;
              max-height: 500px !important;
              padding-left: 0 !important;
            }

            .ad-image {
              width: 100% !important;
              height: auto !important;
            }

            .marquee-icon {
              padding: 0 10px !important;
            }

            .welcome-title {
              font-size: 20px !important;
            }
          }
        `}
      </style>

      {/* Announcement Marquee */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '10px 0'
        }}
        onMouseEnter={() => setIsMarqueePaused(true)}
        onMouseLeave={() => setIsMarqueePaused(false)}
      >
        <div
          className="marquee-icon"
          style={{
            flex: '0 0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff0000'
          }}
        >
          <MdCampaign size={26} aria-label="Announcement Speaker" />
        </div>

        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', flex: 1 }}>
          <div
            style={{
              display: 'inline-block',
              animation: 'scroll-text 25s linear infinite',
              animationPlayState: isMarqueePaused ? 'paused' : 'running'
            }}
          >
            {announcements.map((item, index) => (
              <span key={item.id} style={{ marginRight: '30px' }}>
                <a
                  href={item.redirect_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#FF5722',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  {item.text_content}
                </a>
                {index !== announcements.length - 1 && (
                  <span style={{ color: 'black', margin: '0 20px' }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Banner */}
      <div
        style={{
          marginTop: '20px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={handleClick}
      >
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            width: `${bannerData.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / Math.max(1, bannerData.length))}%)`,
            transition: transitionEnabled ? 'transform 0.6s ease-in-out' : 'none'
          }}
        >
          {bannerData.map((banner, index) => (
            <img
              key={index}
              src={banner.image_url}
              alt={banner.name || `Banner ${index}`}
              style={{
                width: `${100 / Math.max(1, bannerData.length)}%`,
                flexShrink: 0,
                height: '80px',
                display: 'block'
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Columns */}
      <div
        className="hero-columns"
        style={{
          display: 'flex',
          marginTop: '40px',
          marginInline: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
          gap: '20px',
          maxWidth: '1400px'
        }}
      >
        {/* Welcome Section */}
        <div
          className="hero-column welcome-section"
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
            boxSizing: 'border-box'
          }}
        >
          <div
            className="welcome-title"
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#FF5722',
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: '1.4'
            }}
          >
            <div>Welcome to</div>
            <div>SRINIVAS IAS ACADEMY</div>
          </div>

          <img
            src={img1}
            alt="Srinivas IAS Academy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover',
              flexGrow: 1
            }}
          />
        </div>

        {/* Topper Section */}
        <div
          className="hero-column topper-section"
          style={{
            flex: '0 0 45%',
            paddingLeft: '20px',
            height: '70vh',
            overflowY: 'auto'
          }}
        >
          <TopperScrollSection />
        </div>

        {/* Latest Updates + Ad Section */}
        <div
          className="hero-column"
          style={{
            flex: '0 0 25%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
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
              borderRadius: '4px'
            }}
          >
            Latest Updates
          </h3>

          {latestUpdates.map((item, idx) => (
            <React.Fragment key={item.id}>
              <a
                href={item.redirect_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  color: '#FF5722',
                  textDecoration: 'none'
                }}
              >
                {item.text_content}
              </a>
              {idx < latestUpdates.length - 1 && <hr style={{ margin: '0 0' }} />}
            </React.Fragment>
          ))}

          {/* Rotating Ad Image with Redirect (from API) */}
          {adImages.length > 0 && (
            <div
              style={{
                marginTop: '20px',
                borderRadius: '8px',
                overflow: 'hidden',
                maxWidth: '400px',
                position: 'relative'
              }}
            >
              <a
                href={adImages[adIndex].redirect_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="ad-image"
                  src={adImages[adIndex].image_url}
                  alt={adImages[adIndex].name || `Ad ${adIndex + 1}`}
                  onMouseEnter={() => setIsAdPaused(true)}
                  onMouseLeave={() => setIsAdPaused(false)}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    transition: 'opacity 0.6s ease-in-out'
                  }}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
