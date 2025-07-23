import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content - Grid layout for all sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                  International Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                  Find a Store
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:1800-266-0123" className="hover:text-teal-400 transition-colors duration-200">
                  1800-266-0123
                </a>
              </li>
              <li>
                <span className="text-gray-400">Chat With Us</span>
                <br />
                <a href="tel:+918147349242" className="hover:text-teal-400 transition-colors duration-200">
                  +91 8147349242
                </a>
              </li>
              <li>
                <a href="mailto:support@titancompany.com" className="hover:text-teal-400 transition-colors duration-200">
                  support@titancompany.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/918147349242"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                </svg>
              </a>
              <a
                href="https://x.com/titancompany"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
                aria-label="X Platform"
              >
                <span className="text-sm font-bold">X</span>
              </a>
              <a
                href="https://facebook.com/titancompany"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/titancompany"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 sm:mb-0">
            © {new Date().getFullYear()} Titan Company Limited. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-teal-400 transition-colors duration-200">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-200">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}