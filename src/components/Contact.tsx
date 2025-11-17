import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Facebook, Instagram, Youtube, Send } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [social, setSocial] = useState({
    facebook: "",
    instagram: "",
    telegram: "",
    youtube: ""
  });

  // Fetch Social Media Links (same API as Footer)
  useEffect(() => {
    fetch("https://api.srinivasiasacademy.in/api/footer/footer-settings")
      .then((res) => res.json())
      .then((data) => setSocial(data))
      .catch((err) => console.error("Error loading social links:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <style>
        {`
          @media (max-width: 768px) {
            .top-row {
              flex-direction: column !important;
            }
            .address-section, .map-section, .form-section {
              width: 100% !important;
            }
          }
        `}
      </style>

      <h1
        className="contact-title"
        style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#FF5722',
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        Contact Us
      </h1>

      {/* Top row: Address and Map */}
      <div className="top-row" style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        
        {/* ADDRESS SECTION */}
        <div
          className="address-section"
          style={{
            flex: '1 1 50%',
            backgroundColor: '#f5f5f5',
            padding: '30px',
            borderRadius: '12px'
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
            Get In Touch
          </h2>

          <div className="info-grid" style={{ display: 'grid', gap: '20px' }}>
            
            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <MapPin style={{ color: '#FF5722', marginTop: '4px' }} size={24} />
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Address</h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  #22A, "Dr. Harish Kumar Building", 1st Floor,<br />
                  5th Cross, Mallathahalli Main Road,<br />
                  Mallathahalli Bus stop, Outer Ring Road,<br />
                  Opp. Medplus Medicals,<br />
                  Bengaluru - 560056
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <Phone style={{ color: '#FF5722', marginTop: '4px' }} size={24} />
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone</h3>
                <p style={{ color: '#666' }}>+91 8861226868</p>
                <p style={{ color: '#666' }}>+91 9739386865</p>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <Mail style={{ color: '#FF5722', marginTop: '4px' }} size={24} />
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</h3>
                <p style={{ color: '#666' }}>azadsrinivas000@gmail.com</p>
              </div>
            </div>

            {/* SOCIAL MEDIA SECTION */}
            <div style={{ marginTop: "10px" }}>
              <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>Follow Us</h3>

              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook size={26} style={{ color: "#FF5722" }} />
                  </a>
                )}

                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram size={26} style={{ color: "#FF5722" }} />
                  </a>
                )}

                {social.telegram && (
                  <a href={social.telegram} target="_blank" rel="noopener noreferrer">
                    <Send size={26} style={{ color: "#FF5722" }} />
                  </a>
                )}

                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube size={26} style={{ color: "#FF5722" }} />
                  </a>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* MAP SECTION */}
        <div
          className="map-section"
          style={{
            flex: '1 1 50%',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <iframe
            src="https://www.google.com/maps?q=12.9584661,77.5013271&z=17&hl=en&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="SRINIVAS IAS Academy Location"
          />
        </div>
      </div>

      {/* FORM SECTION */}
      <div
        className="form-section"
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
          Send Us a Message
        </h2>

        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="phone" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
          </div>

          {/* Message */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="message" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#FF5722',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
}
