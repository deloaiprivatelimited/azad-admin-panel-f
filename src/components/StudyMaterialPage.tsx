import React from 'react';
import { ChevronRight, FileText, FileType2, Headphones } from 'lucide-react';

interface StudyMaterialPageProps {
  language: string;
  course: string;
  subject: string;
  onBack: () => void;
}

export function StudyMaterialPage({ language, course, subject, onBack }: StudyMaterialPageProps) {
  const materials = {
    PDFs: [
      { title: "Chapter 1 - Introduction", size: "2.5 MB" },
      { title: "Chapter 2 - Core Concepts", size: "3.1 MB" },
      { title: "Practice Questions", size: "1.8 MB" },
      { title: "Previous Year Papers", size: "4.2 MB" }
    ],
    Presentations: [
      { title: "Topic Overview", size: "5.6 MB" },
      { title: "Key Points Summary", size: "4.3 MB" },
      { title: "Visual Aids and Diagrams", size: "8.1 MB" }
    ],
    "Audio Notes": [
      { title: "Lecture 1 - Fundamentals", duration: "45 mins" },
      { title: "Lecture 2 - Advanced Topics", duration: "55 mins" },
      { title: "Quick Revision", duration: "30 mins" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <button onClick={onBack} className="hover:text-blue-600">
              Study Material
            </button>
            <ChevronRight className="h-4 w-4" />
            <span>{language}</span>
            <ChevronRight className="h-4 w-4" />
            <span>{course}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-blue-600">{subject}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{subject}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* PDFs Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">PDFs</h2>
            </div>
            <ul className="space-y-3">
              {materials.PDFs.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <a href="#" className="text-blue-600 hover:underline">{item.title}</a>
                  <span className="text-sm text-gray-500">{item.size}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Presentations Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FileType2 className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Presentations</h2>
            </div>
            <ul className="space-y-3">
              {materials.Presentations.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <a href="#" className="text-blue-600 hover:underline">{item.title}</a>
                  <span className="text-sm text-gray-500">{item.size}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Audio Notes Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Headphones className="h-6 w-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">Audio Notes</h2>
            </div>
            <ul className="space-y-3">
              {materials["Audio Notes"].map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <a href="#" className="text-blue-600 hover:underline">{item.title}</a>
                  <span className="text-sm text-gray-500">{item.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}