import React, { useRef, useEffect, useState } from 'react';

type Topper = {
  name: string;
  exam: string;
  rank: string;
  image_url: string;
};

const TopperScrollSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://backend.azad.deloai.com/toppers')
      .then((res) => res.json())
      .then((data) => {
        if (data.toppers) {
          setToppers(data.toppers);
        }
      })
      .catch((err) => console.error('Error fetching toppers:', err))
      .finally(() => setLoading(false)); // ✅ stop loading after fetch
  }, []);

  return (
    <div style={{ flex: '0 0 60%', paddingLeft: '20px', position: 'relative' }}>
      <h2
        style={{
          fontSize: '32px',
          fontWeight: '600',
          fontFamily: "'Playfair Display', serif",
          marginBottom: '20px',
          color: '#222',
          textAlign: 'center',
        }}
      >
        Our Toppers. Your Future.
      </h2>

      {/* ✅ Loading placeholder */}
      {loading ? (
        <div
          style={{
            height: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#777',
          }}
        >
          Loading toppers...
        </div>
      ) : (
        <div
          ref={scrollRef}
          style={{
            height: '70vh',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            paddingRight: '10px',
          }}
        >
          {toppers.map((topper, index) => (
            <div
              key={index}
              style={{
                background: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={topper.image_url}
                alt={topper.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '12px',
                }}
              />
              <h3 style={{ margin: '4px 0', fontSize: '18px' }}>{topper.name}</h3>
              {topper.rank && topper.rank !== '-' && (
                <p style={{ margin: '2px 0', fontWeight: 'bold', color: '#333' }}>
                  Rank: {topper.rank}
                </p>
              )}
              <p style={{ margin: '2px 0', color: '#777' }}>{topper.exam}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopperScrollSection;
