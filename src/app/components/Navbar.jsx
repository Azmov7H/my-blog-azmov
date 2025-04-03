"use client"
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import ButtonMode from './ButtonMode'
import Link from 'next/link';
import { navLinks } from './link'; // تأكد من أن ملف link.js يحتوي على navLinks
import { Theme } from '../hooks/context/Them';

export default function Navbar() {
  const {top} = useContext(Theme)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // دالة لتبديل حالة القائمة
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={top}>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* الشعار */}
          <div >
            <Link className="flex items-center" href={'/'}>
            <Image src="/logo.svg" width={30} height={30} alt="Logo" priority />
            <span className="ml-2 text-xl font-bold font-mono">Azmov</span>
            </Link>
          </div>

          {/* قائمة الروابط */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-gray-300 transition hover:text-gray-100"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonMode />
          {/* زر القائمة للجوال */}
          <div className="block md:hidden ">
            <button
              aria-label="Toggle navigation menu"
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-800"
              onClick={toggleMenu}
            >
              {
                isMenuOpen?<img className='w-5' src="/close.svg" alt="" />:
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              }

            </button>
          </div>
        </div>
      </div>

      {/* قائمة الجوال */}
      {isMenuOpen && (
        <nav className={`md:hidden sticky items-center right-0  ${top}` }>
          <ul className="space-y-4 flex flex-col items-center px-4 py-6 text-sm">

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                
                  className="block  transition hover:text-white"
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)} // إغلاق القائمة عند الضغط على الرابط
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

