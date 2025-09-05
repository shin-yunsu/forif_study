'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-amber-400 mb-4">
              Furniro
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              We help you create beautiful, functional spaces that reflect your personality and lifestyle. 
              Quality furniture for every home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.14.66-1.989 1.483-1.989.699 0 1.037.525 1.037 1.155 0 .703-.449 1.753-.68 2.725-.194.821.412 1.492 1.219 1.492 1.464 0 2.589-1.544 2.589-3.774 0-1.972-1.411-3.353-3.431-3.353-2.338 0-3.715 1.745-3.715 3.553 0 .703.269 1.457.608 1.867.067.08.076.150.056.232-.061.254-.196.796-.223.907-.035.146-.116.177-.268.107-1.001-.465-1.624-1.926-1.624-3.1 0-2.598 1.885-4.982 5.432-4.982 2.851 0 5.067 2.032 5.067 4.755 0 2.837-1.789 5.116-4.279 5.116-.835 0-1.622-.436-1.89-1.013l-.512 1.958c-.185.72-.685 1.684-1.019 2.257C9.563 23.766 10.748 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.007 0C5.391 0 0 5.391 0 12.007s5.391 12.007 12.007 12.007 12.007-5.391 12.007-12.007S18.623 0 12.007 0zm4.501 8.551c.117.049.191.15.191.266v6.365c0 .117-.074.217-.191.266l-4.309 1.726c-.117.049-.242.049-.359 0L7.5 15.448c-.117-.049-.191-.15-.191-.266V8.817c0-.117.074-.217.191-.266L11.809 6.82c.117-.049.242-.049.359 0l4.34 1.731z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors">Home</Link></li>
              <li><a href="/shop" className="text-gray-300 hover:text-amber-400 transition-colors">Shop</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-amber-400 transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">Contact</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-amber-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Help & Support
            </h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-300 hover:text-amber-400 transition-colors">Help Center</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-amber-400 transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-amber-400 transition-colors">Returns</a></li>
              <li><a href="/size-guide" className="text-gray-300 hover:text-amber-400 transition-colors">Size Guide</a></li>
              <li><a href="/care" className="text-gray-300 hover:text-amber-400 transition-colors">Care Instructions</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Subscribe to get special offers and updates</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
              />
              <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Furniro. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-amber-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}