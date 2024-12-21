import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="Home"
      className="flex flex-col items-center justify-center pt-8 px-4 sm:px-6 md:px-12 lg:px-20 text-center"
    >
      <div className="max-w-4xl mx-auto font-lineSeed">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Empowering <span className="text-[#2B59C3]">Smarter</span> Nutrition
          Choices for a Healthier{" "}
          <span className="text-[#2B59C3]">Tomorrow</span>
        </h1>
        <p className="text-black opacity-60 mt-8 text-base sm:text-lg md:text-xl">
          Scan, Compare, and Choose Better Your Health, Simplified
        </p>

        {/* Button */}
        <div className="mt-16">
          <Button className="bg-[#DDF093] text-black text-base sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg font-bold hover:bg-[#DDF093]/90 transition">
            Download Now
          </Button>
        </div>
      </div>

      {/* Decorative Image */}
      <div className="relative mt-10 flex justify-center">
        <Image
          src="/img/Hero1.svg" // Replace with your image path
          alt="Hero Section"
          width={800}
          height={800}
          className="w-full max-w-xl sm:max-w-xl md:max-w-2xl lg:max-3w-xl xl:max-w-5xl"
        />
      </div>
    </section>
  );
};

export default Hero;
