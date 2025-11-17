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

/**
 * GallerySectionsAuto
 *
 * - Fetches the single-document gallery (handles modal-like or direct shape)
 * - Splits images into numbered sections automatically (chunk size adjustable)
 * - Renders each section as an auto-playing, infinite, horizontally scrolling carousel
 * - Good UX: lazy-loaded images, pause on hover/focus, small controls for copy/open
 */
export default function GallerySectionsAuto(): JSX.Element {
  const [gallery, setGallery] = useState<GalleryDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // configure how many images per section
  const CHUNK_SIZE = 8;

  useEffect(() => {
    let cancelled = false;
    async function fetchGallery() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/`);
        if (!res.ok) throw new Error("Failed to load gallery");
        const data = await res.json();

        let imgs: string[] = [];
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          const item = data.items[0];
          imgs = Array.isArray(item.images) ? item.images : [];
        } else if (Array.isArray(data.images)) {
          imgs = data.images;
        } else if (data.items && Array.isArray(data.items)) {
          imgs = data.items.flatMap((it: any) => (it.images && Array.isArray(it.images) ? it.images : []));
        }

        if (!cancelled) setGallery({ id: data.id || "gallery_images", images: imgs, updated_at: data.updated_at });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load gallery");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchGallery();
    return () => {
      cancelled = true;
    };
  }, []);

  const sections = useMemo(() => {
    if (!gallery) return [];
    const chunks: string[][] = [];
    for (let i = 0; i < gallery.images.length; i += CHUNK_SIZE) {
      chunks.push(gallery.images.slice(i, i + CHUNK_SIZE));
    }
    // if no images, create one empty section to show UI
    return chunks.length > 0 ? chunks : [[]];
  }, [gallery]);

  const sliderSettings = {
    infinite: true,
    speed: 6000, // long duration for smooth continuous feel
    cssEase: "linear" as const,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // we use speed + linear easing for continuous scroll
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-8">
        <div className="text-slate-600">Loading gallery…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-8">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
    <header className="mb-8 text-center">
  <h2 className="text-3xl font-bold text-slate-900">Gallery Sections</h2>
  <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
    Images are grouped into automatic sections and each row scrolls continuously in a loop. Hover to pause.
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
          <section key={sidx} className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-500">
                {imgs.length} {imgs.length === 1 ? "image" : "images"}
              </div>
            </div>

            {imgs.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No images in this section</div>
            ) : (
              <div className="relative">
                {/* Slider duplicates items smoothly by concatenating the array so the loop looks continuous */}
                <Slider {...sliderSettings} className="!overflow-visible">
                  {/* render two copies so linear autoplay wraps seamlessly */}
                  {[...imgs, ...imgs].map((url, idx) => (
                    <div key={`${sidx}-${idx}`} className="px-2">
                      <div
                        className="rounded-lg overflow-hidden bg-slate-100 hover:shadow-lg transition-shadow cursor-pointer"
                        title={url}
                        onClick={() => window.open(url, "_blank", "noopener")}
                      >
                        <div className="w-full h-44 bg-slate-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={url}
                            alt={`section-${sidx}-img-${idx}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'600'%20height%3D'400'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20fill%3D'%23f1f5f9'%20width%3D'100%25'%20height%3D'100%25'/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20fill%3D'%23959eab'%20font-family%3D'Arial'%20font-size%3D'18'%3EImage%20not%20available%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>

                        <div className="p-3 flex items-center justify-between gap-2">
                          <div className="truncate text-sm text-slate-700 pr-2">{url}</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard?.writeText(url).catch(() => {});
                              }}
                              className="p-1 rounded hover:bg-slate-100"
                              aria-label="Copy URL"
                            >
                              <Copy size={16} className="text-slate-600" />
                            </button>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded hover:bg-slate-100"
                              aria-label="Open image"
                            >
                              <ExternalLink size={16} className="text-slate-600" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
