import React, { useEffect, useState } from 'react';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Change this import

interface Course {
  id: string;
  thumbnail_url: string;
  course_name: string;
  one_line_description: string;
  price: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  items: Course[];
}

export function CoursesPage() {

    const navigate = useNavigate(); // Initialize useNavigate

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://api.srinivasiasacademy.in/course/items');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data: ApiResponse = await response.json();
        setCourses(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

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
                  src={course.thumbnail_url} 
                  alt={course.course_name}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.course_name}</h3>
                <p className="text-gray-600 mb-4">{course.one_line_description}</p>

                {/* Course Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Updated {new Date(course.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">₹{course.price.toLocaleString()}</span>
                  </div>
                  <a 
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-blue-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-6">Join thousands of successful candidates who chose SRINIVAS IAS Academy</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </a>
          
          </div>
        </div>
      </div>
    </div>
  );
}