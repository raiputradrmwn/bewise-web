import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Us Section */}
        <div>
          <Link href="/">
            <Image src="/img/logo.svg" alt="logo" width={100} height={40} />
          </Link>
          <p className="mt-4 text-sm font-semibold">Contact Us</p>
          <p className="mt-2 text-gray-600 text-sm">
            Have questions or need help? Reach us at:
          </p>
          <div className="flex items-center mt-4">
            <Image
              src="/img/email.svg" // Replace with your email icon path
              alt="Email Icon"
              width={30}
              height={30}
              className="mr-2"
            />
            <a
              href="mailto:support@bewise.com"
              className="text-black font-semibold text-sm"
            >
              support@bewise.com
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-black opacity-60">
            <li>
              <Link href="/" className="hover:text-[#2B59C3]">
                Home
              </Link>
            </li>
            <li>
              <Link href="#How it Works" className="hover:text-[#2B59C3]">
                How it Works
              </Link>
            </li>
            <li>
              <Link href="#FAQ" className="hover:text-[#2B59C3]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-[#2B59C3]">
                Team
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 className="text-lg font-bold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-black opacity-60">
            <li>
              <Link href="/" className="hover:text-[#2B59C3]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#2B59C3]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#2B59C3]">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className=" mx-auto max-w-7xl px-6 md:px-12 mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-black opacity-60">
          © 2024 bewise. All Rights Reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/img/instagram.svg" // Replace with your Instagram icon path
              alt="Instagram"
              width={40}
              height={40}
            />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/img/linkedin.svg" // Replace with your LinkedIn icon path
              alt="LinkedIn"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
