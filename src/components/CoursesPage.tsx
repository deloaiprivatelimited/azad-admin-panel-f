import React from 'react';
import { Clock, Users, Star, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  image: string;
  duration: string;
  students: string;
  rating: number;
  features: string[];
}

const courses: Course[] = [
  {
    id: '1',
    title: 'UPSC Civil Services Complete Course',
    tagline: 'Comprehensive preparation for India\'s most prestigious examination',
    price: '₹45,000',
    originalPrice: '₹60,000',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '12 months',
    students: '500+',
    rating: 4.8,
    features: ['Live Classes', 'Study Material', 'Mock Tests', 'Personal Mentorship']
  },
  {
    id: '2',
    title: 'KAS (Karnataka Administrative Service)',
    tagline: 'Complete preparation for Karnataka state civil services',
    price: '₹35,000',
    originalPrice: '₹45,000',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '10 months',
    students: '300+',
    rating: 4.7,
    features: ['Kannada Medium Available', 'State-specific Content', 'Interview Preparation']
  },
  {
    id: '3',
    title: 'PDO (Panchayat Development Officer)',
    tagline: 'Rural development and governance focused preparation',
    price: '₹25,000',
    originalPrice: '₹32,000',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '8 months',
    students: '200+',
    rating: 4.6,
    features: ['Rural Focus', 'Practical Training', 'Field Experience']
  },
  {
    id: '4',
    title: 'VAO (Village Accountant Officer)',
    tagline: 'Village administration and accounting specialization',
    price: '₹20,000',
    originalPrice: '₹28,000',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '6 months',
    students: '150+',
    rating: 4.5,
    features: ['Accounting Focus', 'Village Administration', 'Computer Training']
  },
  {
    id: '5',
    title: 'Group B Services',
    tagline: 'Comprehensive preparation for Group B government positions',
    price: '₹30,000',
    originalPrice: '₹40,000',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '9 months',
    students: '250+',
    rating: 4.7,
    features: ['Multiple Exam Preparation', 'Flexible Timing', 'Expert Faculty']
  },
  {
    id: '6',
    title: 'CTI (Commercial Tax Inspector)',
    tagline: 'Specialized course for commercial tax and revenue services',
    price: '₹28,000',
    originalPrice: '₹35,000',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '7 months',
    students: '180+',
    rating: 4.6,
    features: ['Tax Law Focus', 'Revenue Administration', 'Case Studies']
  }
];

export function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of courses designed to help you succeed in civil services examinations
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Course Image */}
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {course.originalPrice && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    Save {Math.round(((parseInt(course.originalPrice.replace('₹', '').replace(',', '')) - parseInt(course.price.replace('₹', '').replace(',', ''))) / parseInt(course.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Title and Tagline */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.tagline}</p>

                {/* Course Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {course.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {feature}
                      </span>
                    ))}
                    {course.features.length > 3 && (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded">
                        +{course.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-blue-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-6">Join thousands of successful candidates who chose AZAD ICS Academy</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Contact Us
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}