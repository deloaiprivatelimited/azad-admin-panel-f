import React, { useState, useEffect } from "react";
import { FileText, AlertCircle } from "lucide-react";

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get("url");
    if (urlParam) {
      setPdfUrl(urlParam);
    } else {
      setError("no-pdf");
    }
  }, []);

  const handleError = () => setError(true);
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="flex-1 min-h-0 flex items-center justify-center p-6">
      <div className="w-full h-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {error === "no-pdf" ? (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <div className="bg-yellow-50 p-4 rounded-full mb-4">
              <FileText className="w-12 h-12 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No PDF Found</h2>
            <p className="text-slate-600 max-w-md">
              Please provide a valid PDF URL using the <code>?url=</code> query parameter.
            </p>
          </div>
        ) : error === true ? (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Failed to Load PDF</h2>
            <p className="text-slate-600 max-w-md">
              The PDF document could not be loaded. Please check the URL and try again.
            </p>
          </div>
        ) : (
          <div className="relative w-full h-[calc(100vh-72px)]">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=${currentPage}&view=FitH`}
              className="w-full h-full border-0"
              title="PDF Viewer"
              onError={handleError}
            />
          </div>
        )}
      </div>
    </div>
  );
}
