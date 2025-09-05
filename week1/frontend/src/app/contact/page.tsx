'use client';

import { Header, Footer } from '@/components/layout';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Banner */}
      <section className="relative h-[316px] bg-gray-100 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="relative text-center">
          <h1 className="text-5xl font-medium text-black mb-2">Contact</h1>
          <div className="flex items-center justify-center gap-2 text-base">
            <span className="font-medium">Home</span>
            <span className="text-black">›</span>
            <span className="font-light">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3A3A3A] mb-4">Get In Touch With Us</h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              For more information about our products & services, please feel free to drop us an email. 
              Our staff is always here to help you out. Do not hesitate!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#B88E2F] rounded-full flex items-center justify-center text-white">
                    📍
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#3A3A3A] mb-2">Address</h3>
                  <p className="text-[#666666]">
                    236 5th SE Avenue, New York NY10000,<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#B88E2F] rounded-full flex items-center justify-center text-white">
                    📞
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#3A3A3A] mb-2">Phone</h3>
                  <p className="text-[#666666]">
                    Mobile: +(84) 546-6789<br />
                    Hotline: +(84) 456-6789
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#B88E2F] rounded-full flex items-center justify-center text-white">
                    🕐
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#3A3A3A] mb-2">Working Time</h3>
                  <p className="text-[#666666]">
                    Monday-Friday: 9:00 - 22:00<br />
                    Saturday-Sunday: 9:00 - 21:00
                  </p>
                </div>
              </div>

              {/* Map or Image */}
              <div className="relative h-64 rounded-lg overflow-hidden mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25987368715491!3d40.697670064237676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzUxLjYiTiA3NMKwMTUnMzUuMiJX!5e0!3m2!1sen!2sus!4v1635959040756!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#3A3A3A] font-medium mb-3">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#3A3A3A] font-medium mb-3">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[#3A3A3A] font-medium mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-colors"
                    placeholder="This is an optional"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#3A3A3A] font-medium mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-colors resize-none"
                    placeholder="Hi! I'd like to ask about..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#B88E2F] text-white px-12 py-3 font-medium rounded-md hover:bg-[#A07B2A] transition-colors duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#FAF3EA] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">High Quality</h3>
                <p className="text-[#898989] text-sm">Crafted from top materials</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl">✓</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">Warranty Protection</h3>
                <p className="text-[#898989] text-sm">Over 2 years</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl">🚚</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">Free Shipping</h3>
                <p className="text-[#898989] text-sm">Order over 150 $</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎧</div>
              <div>
                <h3 className="font-semibold text-[#242424] text-lg mb-1">24 / 7 Support</h3>
                <p className="text-[#898989] text-sm">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}