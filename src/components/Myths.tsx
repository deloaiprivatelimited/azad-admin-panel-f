import React from 'react';
import { X, CheckCircle } from 'lucide-react';

export function Myths() {
  const myths = [
    "Civil Services Exam is the toughest exam",
    "The IAS aspirant need to study for 15-20 hours a day",
    "The IAS aspirant must know everything",
    "The IAS aspirant need to be a topper throughout his academics",
    "The IAS aspirant need to read dozens of books for IAS exam",
    "Only English medium candidates can become IAS and Rural candidates cannot",
    "Luck is mandatory for selection in IAS exam",
    "Huge competition"
  ];

  const solutions = [
    "IAS Exam is under the sky, but it requires",
    "A long term programme of preparation",
    "A well determined goal & mindset",
    "A disciplined vigorous process of learning & training",
    "Dedication, patience, smart work & balance of mind",
    "Skill of analysis & social responsiveness"
  ];

  const faults = [
    "The first and foremost problem is to understand the Nature of Exam, to know the Sources/Books",
    "Lack of confidence",
    "Lack of motivation",
    "Re-invent the wheel",
    "Negative thoughts",
    "Lack of time management",
    "Lack of focused strategy",
    "Buying unnecessary number of books",
    "Wasting time on online form, debating on irrelevant issues"
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-red-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
              <X className="w-6 h-6 mr-2" />
              Myths About IAS
            </h3>
            <ul className="space-y-3">
              {myths.map((myth, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-700 mr-2">⮚</span>
                  <span className="text-gray-700">{myth}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              How to Break the Myths
            </h3>
            <ul className="space-y-3">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-700 mr-2">⮚</span>
                  <span className="text-gray-700">{solution}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-yellow-800 mb-6">Common Student Faults</h3>
            <ul className="space-y-3">
              {faults.map((fault, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-700 mr-2">⮚</span>
                  <span className="text-gray-700">{fault}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}