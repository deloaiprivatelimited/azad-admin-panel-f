import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Prepare for UPSC Civil Services Examination',
    excerpt: 'A comprehensive guide to preparing for one of India\'s most prestigious examinations...',
    date: 'March 15, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'UPSC'
  },
  {
    id: '2',
    title: 'Essential Books for KAS Examination',
    excerpt: 'Detailed list of recommended books and study materials for Karnataka Administrative Services...',
    date: 'March 14, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'KAS'
  },
  {
    id: '3',
    title: 'Time Management Tips for Civil Services Aspirants',
    excerpt: 'Expert strategies to manage your study schedule effectively while preparing for civil services...',
    date: 'March 13, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Study Tips'
  }
];

export function BlogList() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Latest Blog Posts</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  <a href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <a 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                >
                  Read more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}