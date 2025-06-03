"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SkeletonFAQ } from "./SkeletonCard";

const FAQ = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate loading delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (isLoading) {
    return (
      <SkeletonFAQ />
    );
  }
  const faqData = [
    {
      question: "What is the main purpose of this application?",
      answer:
        "Our app helps you make smarter nutrition choices by providing real-time insights and recommendations.",
    },
    {
      question: "How do I scan a product?",
      answer:
        "Simply use the barcode scanner feature in the app to get instant nutritional details.",
    },
    {
      question: "Can I find healthier product alternatives?",
      answer: "Yes, our app suggests healthier products based on your scan.",
    },
    {
      question: "What types of products can I scan?",
      answer:
        "You can scan food, beverages, and other packaged products with nutritional labels.",
    },
    {
      question: "Is this app free to use?",
      answer:
        "The app offers free features, with optional premium upgrades for additional insights.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* FAQ Section */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Side: Title and Description */}
        <div className="flex items-center">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Got <span className="text-blue-600">Questions?</span> <br />
            We&apos;ve Got <span className="text-blue-600">Answers!</span>
          </h2>
        </div>

        {/* Right Side: FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 focus:outline-none"
              >
                {faq.question}
                <span className="text-black opacity-60">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* App Download QR Section */}
      <div className="mt-14 bg-[#2B59C3] text-white py-10 px-6 rounded-lg text-center mx-auto max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold">
          Download Our App <span className="text-[#ECFEAA]">Free</span> and
          Explore Smarter Nutrition <span className="text-[#ECFEAA]">Choices!</span>
        </h2>
        <p className="text-white font-regular text-[14px] opacity-80 mt-4">
          Scan the QR code below to download the app and start your healthier journey!
        </p>
        <div className="flex flex-col items-center justify-center mt-8">
          <Image
            src="/img/bewiseqr.png"
            alt="Download App QR Code"
            width={160}
            height={160}
            className="rounded-lg border-4 border-white shadow-xl"
          />
          <span className="mt-3 text-base opacity-80">Scan QR with your phone camera</span>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
