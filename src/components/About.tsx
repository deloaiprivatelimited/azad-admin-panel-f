import React from 'react';

export function About() {
  return (
    <section className="py-5 px-6 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image on the Left */}
          <div>
            <img
              src="https://d502jbuhuh9wk.cloudfront.net/orgData/60b1f7680cf2b18159ac5105/pages/assets/images/aza.jpg"
              className="rounded-xl shadow-2xl w-full object-cover"
              alt="About AZAD ICS"
            />
          </div>

          {/* Text on the Right */}
          <div>
            <h2 className="text-5xl font-extrabold text-[#FF5722] mb-6 tracking-tight">
              About Us
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              The Civil Services Examination is the most prestigious examination in India,
              offering a golden opportunity to contribute to nation-building. It demands
              precision, focus, analytical thinking, and the ability to make balanced decisions
              under pressure. Rather than emphasizing academic qualifications, it assesses
              your overall competence and readiness for leadership. The journey through the
              prelims, mains, and interview stages is transformative and unique—offering
              experiences unlike any other examination in the country.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
