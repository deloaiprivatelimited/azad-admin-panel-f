import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type TestimonialItem = {
  id: string;
  name: string;
  message: string;
  role?: string;
  image?: string;
  rating?: number; // ⭐ rating from backend
};

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 cursor-pointer text-gray-800 dark:text-white"
      onClick={onClick}
    >
      <ChevronRight size={32} />
    </div>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 cursor-pointer text-gray-800 dark:text-white"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </div>
  );
}

export function Testimonial() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    fetch("https://api.srinivasiasacademy.in/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data.testimonials || []);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-10 text-gray-900 dark:text-white">
          What Our Students Say
        </h2>

        <Slider {...settings} className="gap-4">
          {testimonials.map((item) => (
            <div key={item.id} className="px-2">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 h-full transition-transform">

                {/* IMAGE (Rectangle, NOT ROUND) */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                ) : (
                  <div className="w-full h-40 rounded-xl bg-gray-300 flex items-center justify-center text-gray-900 text-xl font-bold mb-4">
                    {item.name[0]}
                  </div>
                )}

                {/* NAME */}
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                  {item.name}
                </h4>

                {/* ROLE */}
                {item.role && (
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                    {item.role}
                  </p>
                )}

                {/* RATING ⭐⭐⭐⭐⭐ */}
                <div className="flex justify-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (item.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* MESSAGE */}
                <p className="text-gray-700 dark:text-gray-300 italic">
                  “{item.message}”
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
