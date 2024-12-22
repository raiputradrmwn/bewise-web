"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("Home");
  const sections = ["Home", "How it Works", "FAQ"];
  const pathname = usePathname();

  const handleNavigationClick = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = document.querySelector("nav")?.offsetHeight || 0;
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: sectionPosition, behavior: "smooth" });
    }
  };

  const handleHomeClick = (
    section: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (pathname === "/") {
      handleNavigationClick(section, e);
    } else {
      window.location.href = `/#${section}`;
    }
  };

  const handleRouteClick = (
    href: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  return (
    <nav className="flex justify-between items-center py-6 px-6 bg-[#F8F8F8] sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <Image src="/img/logo.svg" alt="logo" width={100} height={40} />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-14 text-[16px] font-lineSeed">
        {sections.map((section) => (
          <li
            key={section}
            className={`cursor-pointer ${
              activeSection === section && pathname === "/"
                ? "text-[#2B59C3] font-bold"
                : "font-bold"
            }`}
          >
            <a href={`/#${section}`} onClick={(e) => handleHomeClick(section, e)}>
              {section}
            </a>
          </li>
        ))}
        <li>
          <Link
            href="/team"
            onClick={(e) => handleRouteClick("/team", e)}
            className={`cursor-pointer ${
              pathname === "/team" ? "text-[#2B59C3] font-bold" : "font-bold"
            }`}
          >
            Team
          </Link>
        </li>
      </ul>

      {/* Action Buttons for Desktop */}
      <div className="hidden md:flex space-x-4">
        <Button className="bg-[#2B59C3] font-bold text-white text-[16px] py-2 px-6 rounded-xl hover:bg-[#2B59C3]/90">
          <Link href="mailto:support@bewise.com">Contact</Link>
        </Button>
      </div>
      {/* Mobile Navbar */}
      <NavbarMobile />
    </nav>
  );
}
