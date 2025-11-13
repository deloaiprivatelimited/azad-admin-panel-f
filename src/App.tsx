// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FacultyShowcase } from './components/Testimonials';
import { About } from './components/About';
import { AboutIAS } from './components/AboutIAS';
import { Myths } from './components/Myths';
import { Features } from './components/Features';
import { FounderMessage } from './components/FounderMessage';
import { StudyFacilities } from './components/StudyFacilities';
import { Footer } from './components/Footer';
import { StudyMaterialPage } from './components/StudyMaterialPage';
import { CoursesPage } from './components/CoursesPage';
import CurrentAffairsViewPage from './components/CurrentAffairsViewPage';
// import { DMQ } from './components/DailyMainQuestions';
// import { PYQPage } from './components/PYQPage';
import PDFViewer from './components/PDFViewer';
import PYQUserPage from './components/PYQPage';
// import { CurrentAffairsPage } from './components/CurrentAffairsPage';
import CurrentAffairsListPage from './components/CurrentAffairsPage';
import { Contact } from './components/Contact';
import DMQUserPage from './components/DailyMainQuestions';
type SelectedMaterial = {
  language: string;
  course: string;
  subject: string;
} | null;

/**
 * Top-level App that mounts the Router.
 * Keeps BrowserRouter at top level so inner components can use router hooks.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

/**
 * AppRoutes contains the UI, hooks and routes.
 * This component uses useNavigate and other hooks safely inside the Router context.
 */
function AppRoutes() {
  const [selectedMaterial, setSelectedMaterial] = useState<SelectedMaterial>(null);
  const [facultyList, setFacultyList] = useState<any[]>([]);
  const [toppersList, setToppersList] = useState<any[]>([]);

  const navigate = useNavigate();

  const dummyFaculty = [
    {
      name: 'Dr. Ramesh Verma',
      title: 'Senior Faculty - Polity & Governance',
      image_url: 'https://via.placeholder.com/300x200?text=Dr+Ramesh+Verma',
      one_line_sec: 'Ex-Professor at Delhi University, 20+ years of teaching experience.',
      full_desc:
        'Dr. Verma has been mentoring UPSC aspirants for over two decades, specializing in Indian Polity and Governance. Known for his conceptual clarity and student-friendly teaching style.',
    },
    {
      name: 'Ms. Priya Sharma',
      title: 'Economics & Current Affairs Expert',
      image_url: 'https://via.placeholder.com/300x200?text=Ms+Priya+Sharma',
      one_line_sec: 'Former RBI Analyst with deep insights into India’s economic landscape.',
      full_desc:
        'Ms. Sharma has a strong academic and practical background in economics and public policy. She simplifies complex economic topics and integrates current affairs for UPSC relevance.',
    },
    {
      name: 'Mr. Arjun Singh',
      title: 'Geography Specialist',
      image_url: 'https://via.placeholder.com/300x200?text=Mr+Arjun+Singh',
      one_line_sec: 'Geography mentor with a focus on map-based learning and visualization.',
      full_desc:
        'Mr. Singh combines theory with practical learning tools to make geography engaging. His sessions are popular for interactive teaching and real-world mapping techniques.',
    },
  ];

  // set faculty (mock)
  useEffect(() => {
    setFacultyList(dummyFaculty);
  }, []);

  // fetch toppers (mocked external fetch)
  useEffect(() => {
    fetch('https://backend.azad.deloai.com/toppers')
      .then((res) => res.json())
      .then((data) => {
        if (data.toppers) setToppersList(data.toppers);
      })
      .catch((err) => console.error('Error fetching toppers:', err));
  }, []);

  // when selectedMaterial is set, navigate to study-material page
  useEffect(() => {
    if (selectedMaterial) {
      // navigate with state so StudyMaterialPage can also read location.state if needed
      navigate('/study-material');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMaterial]);

  // helper to clear selection and go back to home
  const handleBackFromMaterial = () => {
    setSelectedMaterial(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMaterialSelect={setSelectedMaterial} />
      <div className="relative pt-16">
        <div className="w-[90%] mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero toppers={toppersList} />
                  <FacultyShowcase faculty={facultyList} />
                  <section id="about">
                    <About />
                  </section>
                  <section id="about-ias">
                    <AboutIAS />
                  </section>
                  <section id="myths">
                    <Myths />
                  </section>
                  <section id="features">
                    <Features />
                  </section>
                  <section id="founder">
                    <FounderMessage />
                  </section>
                  <section id="facilities">
                    <StudyFacilities />
                  </section>
                </>
              }
            />
<Route path="/current-affair/:id" element={<CurrentAffairsViewPage />} />

            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/daily-questions" element={<DMQUserPage />} />
            <Route path="/pyq" element={<PYQUserPage />} />
            <Route path="/current-affairs" element={<CurrentAffairsListPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/pdf' element={<PDFViewer />} />

            {/* Study material route: if selectedMaterial exists we pass props, otherwise redirect to home */}
            <Route
              path="/study-material"
              element={
                selectedMaterial ? (
                  <StudyMaterialPage
                    language={selectedMaterial.language}
                    course={selectedMaterial.course}
                    subject={selectedMaterial.subject}
                    onBack={handleBackFromMaterial}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}
