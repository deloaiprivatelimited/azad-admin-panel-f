import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
}

export function Footer() {
  const [social, setSocial] = useState<SocialLinks>({});

  useEffect(() => {
    fetch("https://api.srinivasiasacademy.in/api/footer/footer-settings")
      .then((res) => res.json())
      .then((data) => setSocial(data))
      .catch((err) => console.error("Error loading footer settings:", err));
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">

        {/* Title */}
        <p className="text-lg md:text-xl font-semibold">
          SRINIVAS IAS ACADEMY - Shaping Future Civil Servants
        </p>

        {/* Copyright */}
        <p className="mt-2 text-gray-400 text-sm md:text-base">
          © 2024 SRINIVAS IAS ACADEMY. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center mt-5 space-x-5 md:space-x-8">
          {social.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <Facebook className="w-6 h-6 md:w-7 md:h-7 hover:text-blue-400" />
            </a>
          )}

          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <Instagram className="w-6 h-6 md:w-7 md:h-7 hover:text-pink-400" />
            </a>
          )}

          {social.telegram && (
            <a
              href={social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <Send className="w-6 h-6 md:w-7 md:h-7 hover:text-blue-400" />
            </a>
          )}

          {social.youtube && (
            <a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <Youtube className="w-6 h-6 md:w-7 md:h-7 hover:text-red-500" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
