import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ExternalLink, Copy } from "lucide-react";

type GalleryDoc = {
  id?: string;
  images: string[];
  updated_at?: string;
};

const API_BASE = "https://api.srinivasiasacademy.in/gallery";

export default function GallerySectionsAuto() {
  const [gallery, setGallery] = useState<GalleryDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CHUNK_SIZE = 8;

  useEffect(() => {
    let cancelled = false;

    async function fetchGallery() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/`);
        if (!res.ok) throw new Error("Failed to load gallery");

        const data = await res.json();
        let imgs: string[] = [];

        if (data.items?.length > 0) {
          imgs = Array.isArray(data.items[0].images) ? data.items[0].images : [];
        } else if (Array.isArray(data.images)) {
          imgs = data.images;
        } else if (Array.isArray(data.items)) {
          imgs = data.items.flatMap((it: any) => it.images || []);
        }

        if (!cancelled) {
          setGallery({ id: data.id || "gallery_images", images: imgs, updated_at: data.updated_at });
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGallery();
    return () => { cancelled = true; };
  }, []);

  const sections = useMemo(() => {
    if (!gallery) return [];
    const chunks: string[][] = [];
    for (let i = 0; i < gallery.images.length; i += CHUNK_SIZE) {
      chunks.push(gallery.images.slice(i, i + CHUNK_SIZE));
    }
    return chunks.length ? chunks : [[]];
  }, [gallery]);

  const sliderSettings = {
    infinite: true,
    speed: 9000,
    cssEase: "linear" as const,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 4 } },  // 2XL
      { breakpoint: 1280, settings: { slidesToShow: 3 } },  // XL
      { breakpoint: 1024, settings: { slidesToShow: 2 } },  // LG
      { breakpoint: 768,  settings: { slidesToShow: 2 } },  // MD
      { breakpoint: 640,  settings: { slidesToShow: 1 } },  // SM
    ],
  };

  if (loading)
    return <div className="min-h-[40vh] flex items-center justify-center text-slate-600">Loading gallery…</div>;

  if (error)
    return <div className="min-h-[40vh] flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <header className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Gallery Sections</h2>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Auto-grouped images in continuously scrolling rows. Hover to pause.
        </p>

        <div className="mt-4 flex justify-center">
          <a
            href="/gallery"
            className="px-5 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition"
          >
            View More
          </a>
        </div>
      </header>

      <div className="space-y-10">
        {sections.map((imgs, sidx) => (
          <section key={sidx} className="bg-white rounded-2xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm md:text-base text-slate-500">
                {imgs.length} {imgs.length === 1 ? "image" : "images"}
              </div>
            </div>

            {imgs.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No images in this section</div>
            ) : (
              <Slider {...sliderSettings} className="!overflow-visible">
                {[...imgs, ...imgs].map((url, idx) => (
                  <div key={`${sidx}-${idx}`} className="px-2 md:px-3">
                    <div
                      className="rounded-lg overflow-hidden bg-slate-100 shadow hover:shadow-lg cursor-pointer"
                      onClick={() => window.open(url, "_blank")}
                    >
                      {/* FULLY RESPONSIVE IMAGE HEIGHTS */}
                      <div className="w-full h-40 sm:h-48 md:h-52 xl:h-64 bg-slate-200 overflow-hidden flex items-center justify-center">
                        <img
                          src={url}
                          alt="gallery-img"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="p-3 flex items-center justify-between">
                        <div className="truncate text-xs md:text-sm text-slate-700 pr-2">{url}</div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(url);
                            }}
                            className="p-1 rounded hover:bg-slate-100"
                          >
                            <Copy size={16} className="text-slate-600" />
                          </button>

                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded hover:bg-slate-100"
                          >
                            <ExternalLink size={16} className="text-slate-600" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
