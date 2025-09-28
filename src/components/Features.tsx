import React from 'react';
import { BookOpen, Users, Target, Award, Library, Clock } from 'lucide-react';

export function Features() {
  const features = [
    { icon: BookOpen, title: "Comprehensive Curriculum", desc: "Module based classes modeled on New pattern UPSC" },
    { icon: Users, title: "Expert Faculty", desc: "Efficient and well trained staff with years of experience" },
    { icon: Target, title: "Focused Approach", desc: "Special focus on non-maths & Rural background Students" },
    { icon: Award, title: "Proven Track Record", desc: "Successful candidates across various civil services" },
    { icon: Library, title: "Modern Facilities", desc: "Spacious cubical library and study rooms" },
    { icon: Clock, title: "Flexible Timing", desc: "Study room facility from 6 AM to 11 PM" }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose SRINIVAS IAS ACADEMY?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <feature.icon className="w-12 h-12 text-[#FF5722] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}