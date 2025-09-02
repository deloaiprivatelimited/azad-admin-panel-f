import React from 'react';
import { Clock, Video, MessageSquare, CheckCircle2 } from 'lucide-react';

export function StudyFacilities() {
  const facilities = [
    { icon: Clock, text: "Extended Hours (6 AM - 11 PM)" },
    { icon: Video, text: "CCTV Surveillance" },
    { icon: MessageSquare, text: "Individual Cubicles" },
    { icon: CheckCircle2, text: "Free WiFi & Newspapers" }
  ];

  return (
    <section className="py-20 px-4 bg-blue-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">State-of-the-Art Study Facilities</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <facility.icon className="w-12 h-12 text-white mb-4" />
              <p className="text-lg text-white">{facility.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}