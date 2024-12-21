import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Untuk melacak section aktif
  const menuRef = useRef<HTMLDivElement>(null);
  const sections = ["Home", "How it Works", "FAQ"]; // Daftar sections
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
  const handleNavigationClick = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: sectionPosition, behavior: "smooth" });
      setActiveSection(id); // Set section aktif
      closeMenu(); // Tutup menu setelah klik
    }
  };

  return (
    <nav
      ref={menuRef}
      className="bg-[#F8F8F8] fixed w-full z-20 top-[-1] left-0 font-lineSeed lg:hidden max-h-screen overflow-y-auto"
    >
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={`#Home`}
          onClick={(e) => handleNavigationClick("Home", e)}
          className="flex items-center space-x-3"
        >
          <Image
            src="/img/logo.svg"
            alt="Logo"
            width={110}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Menu Button */}
        <div className="flex space-x-3">
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
          className={`items-center justify-between w-full transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col font-bold p-4 gap-3 mt-4 bg-gray-50 rounded-lg shadow-lg">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => handleNavigationClick(section, e)}
                  className={`block py-2 px-4 rounded-md ${
                    activeSection === section
                      ? "text-blue-600 bg-gray-200"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
