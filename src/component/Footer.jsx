import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-red-900 to-red-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-orange-200">
              Useful Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  International Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Track your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Find a Store
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-orange-200">
              Information
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Offers & Contest Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  Help & FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-200 transition-colors">
                  About Tanishq
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-orange-200">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="text-base">1800-266-0123</div>

              <div>
                <h4 className="text-xl font-medium mb-3 text-orange-200">
                  Chat With Us
                </h4>
                <div className="text-base">+91 8147349242</div>
                <div className="w-16 h-0.5 bg-orange-200 mt-2"></div>
              </div>

              {/* Contact Icons */}
              <div className="flex space-x-4 pt-4">
                {/* WhatsApp */}
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                </div>

                {/* Email */}
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.98L12 11.27l9.382-7.449h.982C23.268 3.821 24 4.553 24 5.457" />
                  </svg>
                </div>

                {/* Chat */}
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97c1.31.61 2.75.97 4.29.97 5.52 0 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-red-800 pt-6 pb-6">
          <div className="flex items-center space-x-6">
            <span className="text-xl font-medium text-orange-200">Social</span>
            <div className="flex space-x-4">
              {/* Instagram */}
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>

              {/* X (Twitter) */}
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                <span className="text-sm font-bold">X</span>
              </div>

              {/* Facebook */}
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>

              {/* YouTube */}
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-red-800 pt-6 pb-6">
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="bg-white rounded px-3 py-2 text-xs text-blue-600 font-bold">
              VISA
            </div>
            <div className="bg-white rounded px-3 py-2 text-xs text-red-600 font-bold">
              MC
            </div>
            <div className="bg-white rounded px-3 py-2 text-xs text-black font-bold">
              ●●
            </div>
            <div className="bg-white rounded px-3 py-2 text-xs text-blue-600 font-bold">
              PayPal
            </div>
            <div className="bg-white rounded px-3 py-2 text-xs text-black font-bold">
              <span className="text-white bg-black px-2 py-1 rounded">DC</span>
            </div>
            <div className="bg-white rounded px-3 py-2 text-xs text-black font-bold">
              AMEX
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-300 mb-4 md:mb-0">
            © 2025 Titan Company Limited. All Rights Reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-orange-200 transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-orange-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-200 transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
