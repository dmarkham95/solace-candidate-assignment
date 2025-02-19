'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div
            className="hidden md:block"
            style={{
                ...{ width: 'auto' },
            }}
        >
            <Link href="/" className="text-2xl font-bold">
              MyLogo
            </Link>
        </div>
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              MyLogo
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/services" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Services
            </Link>
            <Link href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV MENU */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/services" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
              Services
            </Link>
            <Link href="/contact" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
