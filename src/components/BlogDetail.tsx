import React from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { BlogPost } from './BlogList';

interface BlogDetailProps {
  postId: string;
  onBack: () => void;
}

const blogContent = {
  '1': {
    title: 'How to Prepare for UPSC Civil Services Examination',
    content: `
      The Civil Services Examination (CSE) conducted by the Union Public Service Commission (UPSC) is one of the most prestigious examinations in India. This comprehensive guide will help you understand the examination pattern and prepare effectively.

      ## Examination Pattern

      The UPSC CSE consists of three stages:
      1. Preliminary Examination
      2. Main Examination
      3. Interview

      ### Preliminary Examination
      - Objective type MCQs
      - Two papers: General Studies Paper I and CSAT Paper II
      - Qualifying nature for Mains

      ### Main Examination
      - Written examination
      - Nine papers in total
      - Two qualifying papers: English and Indian Language
      - Seven papers for scoring

      ### Interview
      - Tests the candidate's personality
      - 275 marks
      - Final selection based on combined scores

      ## Preparation Strategy

      1. **Understanding the Syllabus**
         - Thoroughly analyze the syllabus
         - Make a structured study plan
         - Focus on core areas

      2. **Study Material**
         - NCERT books for foundation
         - Standard reference books
         - Current affairs magazines
         - Daily newspaper reading

      3. **Time Management**
         - Create a daily schedule
         - Balance between subjects
         - Regular revision
         - Practice previous year papers

      4. **Answer Writing Practice**
         - Start early
         - Focus on presentation
         - Time management
         - Regular feedback

      ## Conclusion

      Success in UPSC CSE requires dedication, persistence, and smart work. Follow a structured approach, stay consistent, and keep yourself motivated throughout the journey.
    `,
    date: 'March 15, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    category: 'UPSC'
  }
};

export function BlogDetail({ postId, onBack }: BlogDetailProps) {
  const post = blogContent[postId as keyof typeof blogContent];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog List
        </button>

        <article>
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-8">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('##', '').trim()}</h2>;
                }
                if (paragraph.startsWith('###')) {
                  return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('###', '').trim()}</h3>;
                }
                if (paragraph.trim().startsWith('-')) {
                  return <li key={index} className="ml-4">{paragraph.replace('-', '').trim()}</li>;
                }
                if (paragraph.trim().startsWith('1.')) {
                  return <ol key={index} className="list-decimal ml-4"><li>{paragraph.replace('1.', '').trim()}</li></ol>;
                }
                return paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}