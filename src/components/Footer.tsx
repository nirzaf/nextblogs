'use client';

import { useState, useEffect } from 'react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <footer className="bg-black text-white py-10" />;
  }

  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">About</h3>
            <p className="text-gray-300">
              A modern blogging platform for sharing ideas, stories, and knowledge.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
              <li><a href="/write" className="hover:text-gray-300">Write</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-300">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest posts</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full text-black rounded-l outline-none"
                suppressHydrationWarning
              />
              <button 
                className="bg-white text-black px-4 py-2 rounded-r hover:bg-gray-200"
                type="button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
