import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  marks: number;
  timeLimit: string;
  subject: string;
}

interface DailyQuestions {
  date: string;
  questions: Question[];
}

// Sample data - in real application, this would come from an API
const questionsData: DailyQuestions[] = [
  {
    date: '2024-03-15',
    questions: [
      {
        id: 1,
        question: 'Discuss the role of the Election Commission of India in ensuring free and fair elections. Analyze the challenges faced by the Election Commission in the digital age.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Polity'
      },
      {
        id: 2,
        question: 'Examine the impact of climate change on monsoon patterns in India. Suggest measures to adapt to changing precipitation patterns.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Geography'
      },
      {
        id: 3,
        question: 'Analyze the significance of the Goods and Services Tax (GST) in India\'s federal structure. Discuss its impact on center-state relations.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Economy'
      },
      {
        id: 4,
        question: 'Evaluate the role of women in India\'s freedom struggle. How did their participation shape the nature of the independence movement?',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Modern History'
      },
      {
        id: 5,
        question: 'Discuss the ethical implications of artificial intelligence in governance. How can India ensure responsible AI deployment in public administration?',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Ethics'
      }
    ]
  },
  {
    date: '2024-03-14',
    questions: [
      {
        id: 1,
        question: 'Analyze the concept of cooperative federalism in India. How has it evolved since independence?',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Polity'
      },
      {
        id: 2,
        question: 'Examine the causes and consequences of urban heat islands in Indian cities. Suggest mitigation strategies.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Geography'
      },
      {
        id: 3,
        question: 'Discuss the role of microfinance institutions in financial inclusion. Analyze their impact on rural development.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Economy'
      },
      {
        id: 4,
        question: 'Evaluate the impact of the Partition of Bengal (1905) on the Indian national movement.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Modern History'
      },
      {
        id: 5,
        question: 'Analyze the ethical challenges in medical research involving human subjects. Discuss the importance of informed consent.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Ethics'
      }
    ]
  },
  {
    date: '2024-03-13',
    questions: [
      {
        id: 1,
        question: 'Discuss the powers and functions of the Comptroller and Auditor General of India. Analyze its role in ensuring financial accountability.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Polity'
      },
      {
        id: 2,
        question: 'Examine the phenomenon of coral bleaching and its impact on marine ecosystems. Discuss conservation strategies.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Environment'
      },
      {
        id: 3,
        question: 'Analyze the challenges and opportunities of India\'s demographic dividend. How can it be effectively harnessed?',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Economy'
      },
      {
        id: 4,
        question: 'Evaluate the role of the Indian National Army (INA) in India\'s struggle for independence.',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Modern History'
      },
      {
        id: 5,
        question: 'Discuss the ethical dimensions of whistleblowing in public administration. When is it justified?',
        marks: 15,
        timeLimit: '22 minutes',
        subject: 'Ethics'
      }
    ]
  }
];

export function DailyMainQuestions() {
  const [selectedDate, setSelectedDate] = useState('2024-03-15');
  
  const currentQuestions = questionsData.find(data => data.date === selectedDate);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const currentIndex = questionsData.findIndex(data => data.date === selectedDate);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedDate(questionsData[currentIndex - 1].date);
    } else if (direction === 'next' && currentIndex < questionsData.length - 1) {
      setSelectedDate(questionsData[currentIndex + 1].date);
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Polity': 'bg-blue-100 text-blue-800',
      'Geography': 'bg-green-100 text-green-800',
      'Economy': 'bg-purple-100 text-purple-800',
      'Modern History': 'bg-orange-100 text-orange-800',
      'Ethics': 'bg-red-100 text-red-800',
      'Environment': 'bg-teal-100 text-teal-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Daily Main Questions</h1>
          <p className="text-xl text-gray-600">
            Practice with 5 carefully curated main exam questions every day
          </p>
        </div>

        {/* Date Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateDate('prev')}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              disabled={questionsData.findIndex(data => data.date === selectedDate) === 0}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous Day
            </button>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {formatDate(selectedDate)}
              </h2>
            </div>
            
            <button
              onClick={() => navigateDate('next')}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              disabled={questionsData.findIndex(data => data.date === selectedDate) === questionsData.length - 1}
            >
              Next Day
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>

        {/* Questions Section */}
        {currentQuestions ? (
          <div className="space-y-6">
            {currentQuestions.questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Question Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(question.subject)}`}>
                      {question.subject}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{question.marks} marks</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{question.timeLimit}</span>
                    </div>
                  </div>
                </div>

                {/* Question Text */}
                <div className="mb-4">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {question.question}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Start Writing
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    View Sample Answer
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    Save for Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No questions available for this date.</p>
          </div>
        )}

        {/* Statistics Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-blue-100">Questions per Day</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">75</div>
              <div className="text-blue-100">Total Marks</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">110</div>
              <div className="text-blue-100">Minutes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">365</div>
              <div className="text-blue-100">Days Coverage</div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Daily Practice Tips</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Set aside 2 hours daily for these 5 questions</li>
            <li>• Practice writing within the time limit to improve speed</li>
            <li>• Focus on structure: Introduction, Body, and Conclusion</li>
            <li>• Review sample answers to understand expected quality</li>
            <li>• Track your progress and identify weak areas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}