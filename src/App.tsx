// App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FacultyShowcase } from "./components/Testimonials";
import { About } from "./components/About";
import { AboutIAS } from "./components/AboutIAS";
import { Myths } from "./components/Myths";
import { Features } from "./components/Features";
import { FounderMessage } from "./components/FounderMessage";
import { Testimonial } from "./components/Testimonial";
import { StudyFacilities } from "./components/StudyFacilities";
import { Footer } from "./components/Footer";
import { StudyMaterialPage } from "./components/StudyMaterialPage";
import { CoursesPage } from "./components/CoursesPage";
import { BooksPage } from "./components/ourbooks";
import CurrentAffairsViewPage from "./components/CurrentAffairsViewPage";
import PDFViewer from "./components/PDFViewer";
import PYQUserPage from "./components/PYQPage";
import CurrentAffairsListPage from "./components/CurrentAffairsPage";
import { Contact } from "./components/Contact";
import DMQUserPage from "./components/DailyMainQuestions";

type SelectedMaterial = {
  language: string;
  course: string;
  subject: string;
} | null;

type TestimonialItem = {
  id: number;
  name: string;
  message: string;
  role?: string;
  image?: string;
};

/* ----------------- MAIN APP WRAPPER ----------------- */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

/* ----------------- ROUTES + LOGIC COMPONENT ----------------- */
function AppRoutes() {
  const [selectedMaterial, setSelectedMaterial] = useState<SelectedMaterial>(null);
  const [facultyList, setFacultyList] = useState<any[]>([]);
  const [toppersList, setToppersList] = useState<any[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  const navigate = useNavigate();

  /* ----------------- DUMMY FACULTY ----------------- */
  const dummyFaculty = [
    {
      name: "Dr. Ramesh Verma",
      title: "Senior Faculty - Polity & Governance",
      image_url: "https://via.placeholder.com/300x200?text=Dr+Ramesh+Verma",
      one_line_sec: "Ex-Professor at Delhi University, 20+ years of teaching experience.",
      full_desc:
        "Dr. Verma has been mentoring UPSC aspirants for over two decades, specializing in Indian Polity and Governance.",
    },
    {
      name: "Ms. Priya Sharma",
      title: "Economics & Current Affairs Expert",
      image_url: "https://via.placeholder.com/300x200?text=Ms+Priya+Sharma",
      one_line_sec: "Former RBI Analyst with deep insights into India’s economic landscape.",
      full_desc:
        "Ms. Sharma has a strong academic background and simplifies complex economic topics effectively.",
    },
    {
      name: "Mr. Arjun Singh",
      title: "Geography Specialist",
      image_url: "https://via.placeholder.com/300x200?text=Mr+Arjun+Singh",
      one_line_sec: "Expert in map-based learning and visualization.",
      full_desc:
        "Mr. Singh is known for his practical teaching method and interactive sessions.",
    },
  ];

  /* ----------------- SET FACULTY ----------------- */
  useEffect(() => {
    setFacultyList(dummyFaculty);
  }, []);

  /* ----------------- FETCH TOPPERS ----------------- */
  useEffect(() => {
    fetch("https://backend.azad.deloai.com/toppers")
      .then((res) => res.json())
      .then((data) => {
        if (data?.toppers) setToppersList(data.toppers);
      })
      .catch((err) => console.error("Error fetching toppers:", err));
  }, []);

  /* ----------------- FETCH TESTIMONIALS ----------------- */
  useEffect(() => {
    setLoadingTestimonials(true);
    fetch("http://localhost:5000/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonialsList(data);
      })
      .catch((err) => console.error("Error fetching testimonials:", err))
      .finally(() => setLoadingTestimonials(false));
  }, []);

  /* ----------------- AUTO NAVIGATE ON STUDY MATERIAL SELECT ----------------- */
  useEffect(() => {
    if (selectedMaterial) {
      navigate("/study-material");
    }
  }, [selectedMaterial, navigate]);

  /* ----------------- BACK BUTTON HANDLER ----------------- */
  const handleBackFromMaterial = () => {
    setSelectedMaterial(null);
    navigate("/");
  };

  /* ----------------- RENDER UI ----------------- */
  return (
    <div className="min-h-screen bg-white">
      <Header onMaterialSelect={setSelectedMaterial} />

      <div className="relative pt-16">
        <div className="w-[90%] mx-auto">
          <Routes>
            {/* ----------------- HOME PAGE ----------------- */}
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

                  <section id="testimonials">
                    {loadingTestimonials ? (
                      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
                        Loading testimonials...
                      </p>
                    ) : (
                      <Testimonial testimonials={testimonialsList} />
                    )}
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

            {/* ----------------- OTHER ROUTES ----------------- */}
            <Route path="/current-affair/:id" element={<CurrentAffairsViewPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/daily-questions" element={<DMQUserPage />} />
            <Route path="/pyq" element={<PYQUserPage />} />
            <Route path="/current-affairs" element={<CurrentAffairsListPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pdf" element={<PDFViewer />} />

            {/* ----------------- STUDY MATERIAL ROUTE ----------------- */}
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

            {/* ----------------- FALLBACK ----------------- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}
