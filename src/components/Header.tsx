import React, { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMaterialSelect: (material: { language: string; course: string; subject: string }) => void;
}

export function Header({ onMaterialSelect }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Daily Main Questions', href: '/daily-questions' },
    { name: 'PYQ', href: '/pyq' },
    { name: 'Current Affairs', href: '/current-affairs' },
    { name: 'Blog', href: '/blog' }
  ];

  const upscSubjects = [
    'Ancient, Medieval History and Art & Culture',
    'Economy',
    'Polity',
    'Science and Technology',
    'Ecology and Environment',
    'Geography',
    'International Relations',
    'Agriculture',
    'Modern History',
    'Ethics'
  ];

  const kasAdditionalSubjects = [
    'Karnataka Geography',
    'Karnataka History',
    'Public Administration',
    'Rural Development',
    'Social and Political Perspective'
  ];

  const commonSubjects = [
    'Cooperative Movement',
    'Rural Development and Panchayat Raj Institutions',
    'Indian Society',
    'Kannada',
    'English',
    'Computer'
  ];

  const courseSubjects = {
    UPSC: upscSubjects,
    KAS: [...upscSubjects, ...kasAdditionalSubjects],
    PDO: commonSubjects,
    VAO: commonSubjects,
    'Group B': commonSubjects,
    CTI: commonSubjects,
    'Grade 1 Secretary': commonSubjects,
    PCI: commonSubjects,
    'AC SAAD': commonSubjects,
    PC: commonSubjects
  };

  const studyMaterials = {
    English: Object.keys(courseSubjects),
    Kannada: Object.keys(courseSubjects)
  };

  const handleMouseEnter = (type: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubMenu(null);
    }, 300);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    
    const element = href === '#' ? document.body : document.querySelector(href);
    if (!element) return;

    setIsMenuOpen(false);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleSubjectClick = (language: string, course: string, subject: string) => {
    onMaterialSelect({ language, course, subject });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={handleLogoClick}
              className="text-xl font-bold text-[#FF5722]  transition-colors cursor-pointer"
            >
              SRINIVAS IAS ACADEMY
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Study Material Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                onMouseEnter={() => handleMouseEnter('study')}
                onMouseLeave={handleMouseLeave}
              >
                Study Material
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* First Level Dropdown */}
              <div 
                className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ${activeDropdown === 'study' ? 'block' : 'hidden'}`}
                onMouseEnter={() => handleMouseEnter('study')}
                onMouseLeave={handleMouseLeave}
              >
                {Object.keys(studyMaterials).map((language) => (
                  <div 
                    key={language} 
                    className="relative group/sub px-4 py-2 hover:bg-gray-100"
                    onMouseEnter={() => setActiveSubMenu(language)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{language}</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    
                    {/* Second Level Dropdown (Courses) */}
                    <div className="absolute left-full top-0 w-56 bg-white rounded-md shadow-lg hidden group-hover/sub:block">
                      {studyMaterials[language as keyof typeof studyMaterials].map((course) => (
                        <div 
                          key={`${language}-${course}`}
                          className="relative group/course px-4 py-2 hover:bg-gray-100"
                          onMouseEnter={() => setActiveSubMenu(course)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{course}</span>
                            {courseSubjects[course as keyof typeof courseSubjects].length > 0 && (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                          
                          {/* Third Level Dropdown (Subjects) */}
                          {courseSubjects[course as keyof typeof courseSubjects].length > 0 && (
                            <div 
                              className={`absolute left-full top-0 w-72 bg-white rounded-md shadow-lg hidden group-hover/course:block`}
                            >
                              {courseSubjects[course as keyof typeof courseSubjects].map((subject) => (
                                <button
                                  key={`${language}-${course}-${subject}`}
                                  onClick={() => handleSubjectClick(language, course, subject)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {subject}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleClick}
                className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-900"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Mobile Study Material Menu */}
              <div className="px-3 py-2">
                <span className="block text-base font-medium text-gray-700">Study Material</span>
                {Object.entries(studyMaterials).map(([language, courses]) => (
                  <div key={language} className="ml-4 mt-2">
                    <span className="block text-sm font-medium text-gray-600">{language}</span>
                    <div className="ml-4 mt-1 space-y-1">
                      {courses.map((course) => (
                        <div key={`${language}-${course}`} className="py-1">
                          <span className="block text-sm text-gray-600">{course}</span>
                          <div className="ml-4 mt-1 space-y-1">
                            {courseSubjects[course as keyof typeof courseSubjects].map((subject) => (
                              <button
                                key={`${language}-${course}-${subject}`}
                                onClick={() => handleSubjectClick(language, course, subject)}
                                className="block w-full text-left text-sm text-gray-500 hover:text-blue-900 py-1"
                              >
                                {subject}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleClick}
                  className="block text-gray-700 hover:text-blue-900 hover:bg-gray-50 px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}