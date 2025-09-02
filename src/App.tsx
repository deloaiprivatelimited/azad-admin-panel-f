import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
// import { Testimonials } from './components/Testimonials';
import { FacultyShowcase } from './components/Testimonials';
import { About } from './components/About';
import { AboutIAS } from './components/AboutIAS';
import { Myths } from './components/Myths';
import { Features } from './components/Features';
import { FounderMessage } from './components/FounderMessage';
import { StudyFacilities } from './components/StudyFacilities';
import { Footer } from './components/Footer';
import { StudyMaterialPage } from './components/StudyMaterialPage';
// import { LatestUpdates } from './components/LatestUpdates';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { CoursesPage } from './components/CoursesPage';
import { DailyMainQuestions } from './components/DailyMainQuestions';
import { PYQPage } from './components/PYQPage';
import { CurrentAffairsPage } from './components/CurrentAffairsPage';

function App() {
  const [selectedMaterial, setSelectedMaterial] = useState<{
    language: string;
    course: string;
    subject: string;
  } | null>(null);
  const [facultyList, setFacultyList] = useState<any[]>([]); // store fetched faculty

  const [currentPage, setCurrentPage] = useState<
    'home' | 'blog-list' | 'blog-detail' | 'courses' | 'daily-questions' | 'pyq' | 'current-affairs'
  >('home');

  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [toppersList, setToppersList] = useState<any[]>([]);

  const path = window.location.pathname;
 // Fetch faculty on mount
  useEffect(() => {
    fetch('https://backend.azad.deloai.com/faculty')
      .then((res) => res.json())
      .then((data) => {
        if (data.faculty_list) {
          setFacultyList(data.faculty_list);
        }
      })
      .catch((err) => console.error('Error fetching faculty:', err));
  }, []);
   useEffect(() => {
    fetch('https://backend.azad.deloai.com/toppers')
      .then((res) => res.json())
      .then((data) => {
        if (data.toppers) {
          setToppersList(data.toppers);
        }
      })
      .catch((err) => console.error('Error fetching toppers:', err));
  }, []);
  useEffect(() => {
    if (path === '/blog') {
      setCurrentPage('blog-list');
    } else if (path.startsWith('/blog/')) {
      setCurrentPage('blog-detail');
      setSelectedBlogId(path.split('/')[2]);
    } else if (path === '/courses') {
      setCurrentPage('courses');
    } else if (path === '/daily-questions') {
      setCurrentPage('daily-questions');
    } else if (path === '/pyq') {
      setCurrentPage('pyq');
    } else if (path === '/current-affairs') {
      setCurrentPage('current-affairs');
    } else {
      setCurrentPage('home');
    }
  }, [path]);

  return (
    <div className="min-h-screen bg-white">
      <Header onMaterialSelect={setSelectedMaterial} />
      <div className="relative pt-16">
        <div className="w-[90%] mx-auto">
          {selectedMaterial ? (
            <StudyMaterialPage
              language={selectedMaterial.language}
              course={selectedMaterial.course}
              subject={selectedMaterial.subject}
              onBack={() => setSelectedMaterial(null)}
            />
          ) : currentPage === 'blog-list' ? (
            <BlogList />
          ) : currentPage === 'blog-detail' && selectedBlogId ? (
            <BlogDetail
              postId={selectedBlogId}
              onBack={() => {
                window.history.pushState({}, '', '/blog');
                setCurrentPage('blog-list');
              }}
            />
          ) : currentPage === 'courses' ? (
            <CoursesPage />
          ) : currentPage === 'daily-questions' ? (
            <DailyMainQuestions />
          ) : currentPage === 'pyq' ? (
            <PYQPage />
          ) : currentPage === 'current-affairs' ? (
            <CurrentAffairsPage />
          ) : (
            <>
              <Hero toppers={toppersList} />
              <FacultyShowcase faculty={facultyList} /> {/* 👈 Pass faculty list here */}
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
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
