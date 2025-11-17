import React, { useEffect, useState, useCallback } from "react";
import { X, ArrowLeft, ArrowRight, Download, Copy, ImageIcon } from "lucide-react";

const API_BASE = "https://api.srinivasiasacademy.in/gallery"; // single-document gallery endpoints

export default function GalleryPage(): JSX.Element {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lightbox state
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchGallery() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/`);
        if (!res.ok) throw new Error("Failed to load gallery");
        const data = await res.json();

        // handle either modal-like structure or single-doc shape
        let imgs: string[] = [];
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          const item = data.items[0];
          imgs = Array.isArray(item.images) ? item.images : [];
        } else if (Array.isArray(data.images)) {
          imgs = data.images;
        } else if (data.items && Array.isArray(data.items)) {
          // fallback: maybe items are direct images arrays
          imgs = data.items.flatMap((it: any) => (it.images && Array.isArray(it.images) ? it.images : []));
        }

        if (!cancelled) setImages(imgs);
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

  // Open viewer at index
  const openViewer = (idx: number) => {
    setCurrentIndex(idx);
    setViewerOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setViewerOpen(false);
    document.body.style.overflow = "";
  };

  const showPrev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const showNext = useCallback(() => {
    setCurrentIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // keyboard navigation for lightbox
  useEffect(() => {
    if (!isViewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeViewer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isViewerOpen, showNext, showPrev]);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // small visual confirmation could be added by state; keeping minimal
    } catch {
      // ignore copy errors silently
    }
  };

  const handleDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-lg text-slate-600">Loading gallery…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-2">Error</div>
          <div className="text-slate-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">Gallery</h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Browse our curated images. Click any image to enlarge, navigate with arrows or swipe.
          </p>
        </header>

        {/* Masonry-like responsive grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {images.length === 0 ? (
            <div className="rounded-xl bg-white p-8 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 mb-4">
                <ImageIcon size={28} className="text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No images yet</h3>
              <p className="text-slate-500 mt-2">The gallery is empty for now</p>
            </div>
          ) : (
            images.map((url, idx) => (
              <figure
                key={idx}
                className="break-inside-avoid rounded-lg overflow-hidden relative bg-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openViewer(idx)}
                aria-label={`Open image ${idx + 1}`}
              >
                <div className="w-full h-56 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={url}
                    alt={`Gallery image ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'600'%20height%3D'400'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20fill%3D'%23f1f5f9'%20width%3D'100%25'%20height%3D'100%25'/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20fill%3D'%23959eab'%20font-family%3D'Arial'%20font-size%3D'18'%3EImage%20not%20available%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                <figcaption className="p-3 text-xs text-slate-500 truncate">{url}</figcaption>
              </figure>
            ))
          )}
        </div>

        {/* Lightbox / Viewer */}
        {isViewerOpen && images[currentIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-w-5xl w-full max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={closeViewer}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow"
                aria-label="Close viewer"
              >
                <X size={18} />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow"
                aria-label="Previous image"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow"
                aria-label="Next image"
              >
                <ArrowRight size={18} />
              </button>

              {/* Image container */}
              <div
                className="bg-black rounded-lg overflow-hidden flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[currentIndex]}
                  alt={`Enlarged image ${currentIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>

              {/* Footer actions */}
              <div className="mt-3 flex items-center justify-between text-sm text-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopy(urlToCopy(images[currentIndex]))}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                    title="Copy URL"
                  >
                    <Copy size={14} />
                    Copy URL
                  </button>

                  <button
                    onClick={() => handleDownload(images[currentIndex])}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                    title="Download image"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>

                <div className="text-slate-300">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // helper functions used inside component (declared after return for readability)
  function urlToCopy(u: string) {
    return u;
  }

  async function handleCopy(u: string) {
    try {
      await navigator.clipboard.writeText(u);
      // transient user feedback could be added here
    } catch {
      // ignore
    }
  }


}
