"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Untuk melacak section aktif
  const pathname = usePathname(); // Untuk melacak route aktif
  const menuRef = useRef<HTMLDivElement>(null);
  const navHeight = 80; // Tinggi navbar

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Scroll ke section dengan offset
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: sectionPosition, behavior: "smooth" });
      setActiveSection(id); // Set section aktif
    }
  };

  const handleNavigationClick = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (pathname !== "/") {
      // Jika tidak di halaman utama, redirect ke halaman utama terlebih dahulu
      window.location.href = `/#${id}`;
    } else {
      // Jika di halaman utama, scroll ke section
      scrollToSection(id);
      closeMenu(); // Tutup menu setelah klik
    }
  };

  const handleRouteClick = (
    href: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeMenu();
    }
  };

  return (
    <nav
      ref={menuRef}
      className="bg-[#F8F8F8] fixed w-full z-20 top-0 left-0 font-lineSeed lg:hidden max-h-screen overflow-y-auto"
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/img/logo.svg"
            alt="Logo"
            width={110}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Menu Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col font-bold p-4 gap-3 mt-4 bg-gray-50 rounded-lg shadow-lg">
          {/* Home Link */}
          <li>
            <a
              href="/#Home"
              onClick={(e) => handleNavigationClick("Home", e)}
              className={`block py-2 px-4 rounded-md ${
                pathname === "/" && activeSection === "Home"
                  ? "text-blue-600 bg-gray-200"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              Home
            </a>
          </li>
          {/* How It Works Section */}
          <li>
            <a
              href="/#How it Works"
              onClick={(e) => handleNavigationClick("How it Works", e)}
              className={`block py-2 px-4 rounded-md ${
                pathname === "/" && activeSection === "How it Works"
                  ? "text-blue-600 bg-gray-200"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              How it Works
            </a>
          </li>
          {/* FAQ Section */}
          <li>
            <a
              href="/#FAQ"
              onClick={(e) => handleNavigationClick("FAQ", e)}
              className={`block py-2 px-4 rounded-md ${
                pathname === "/" && activeSection === "FAQ"
                  ? "text-blue-600 bg-gray-200"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              FAQ
            </a>
          </li>
          {/* Team Route */}
          <li>
            <Link
              href="/team"
              onClick={(e) => handleRouteClick("/team", e)}
              className={`block py-2 px-4 rounded-md ${
                pathname === "/team"
                  ? "text-blue-600 bg-gray-200"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              Team
            </Link>
          </li>
          {/* Contact */}
          <li>
            <a
              href="mailto:support@bewise.com"
              className="block py-2 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNav;
