"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHomeHero() {
  return (
    <section className="flex flex-col justify-center items-center py-5 md:py-10 animate-pulse">
      {/* Text Content Skeleton */}
      <div className="text-center items-center justify-center">
        {/* Headline Skeleton */}
        <Skeleton className="items-center text-center mb-4 mx-auto w-[250px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[900px] 2xl:w-[900px] h-12 sm:h-12 md:h-14 lg:h-16 xl:h-16 2xl:h-16 bg-gray-300" />
        
        {/* Description Skeleton */}
        <div className="flex flex-col mt-4 text-center items-center">
          <Skeleton className="h-4 sm:h-6 md:h-6 lg:h-8 xl:h-8 2xl:h-8 w-[320px] sm:w-[400px] md:w-[400px] lg:w-[500px] xl:w-[300px] 2xl:w-[500px] bg-gray-300" />
        </div>
        
        {/* Button Skeleton */}
        <div className="mt-8 flex flex-col text-center items-center">
          <Skeleton className="rounded-full bg-gray-300 h-14 w-[180px]" />
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="mt-12 mb-10 w-full flex justify-center px-4 md:px-0">
        <Skeleton className="bg-gray-300 rounded-2xl h-[160px] sm:h-[280px] md:h-[320px] lg:h-[380px] xl:h-[450px] w-[300px] sm:w-[530px] md:w-[640px] lg:w-[700px] xl:w-[860px] 2xl:w-[1100px]" />
      </div>
    </section>
  );
}

export function SkeletonHowItWorks() {
    return (
      <section id="How it Works">
        {/* Header Biru */}
        <div className="bg-blue-600 text-white py-6">
          <div className="max-w-7xl mx-auto flex justify-around text-center">
            <div>
              <Skeleton className="h-8 w-16 mx-auto bg-gray-300" />
              <Skeleton className="h-4 w-24 mt-2 bg-gray-300" />
            </div>
            <div>
              <Skeleton className="h-8 w-16 mx-auto bg-gray-300" />
              <Skeleton className="h-4 w-24 mt-2 bg-gray-300" />
            </div>
            <div>
              <Skeleton className="h-8 w-16 mx-auto bg-gray-300" />
              <Skeleton className="h-4 w-24 mt-2 bg-gray-300" />
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Skeleton for Features and Image */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            {/* Skeleton Cards */}
            <div className="flex-1 space-y-8">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Skeleton className="p-3 w-14 h-14 bg-gray-300 rounded-lg" />
                  <div className="flex flex-col space-y-2">
                    <Skeleton className="h-4 w-40 bg-gray-300" />
                    <Skeleton className="h-3 w-60 bg-gray-300" />
                  </div>
                </div>
              ))}
            </div>
  
            {/* Skeleton Image */}
            <div className="flex-1 text-center">
              <Skeleton className="mx-auto h-80 w-full md:w-[400px] lg:w-[500px] xl:w-[600px] bg-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  export function SkeletonFAQ() {
    return (
      <section id="FAQ" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* FAQ Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side: Skeleton Title */}
          <div className="flex items-center">
            <Skeleton className="h-8 w-[300px] md:w-[400px] bg-gray-300" />
          </div>
  
          {/* Right Side: Skeleton FAQ Accordion */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <Skeleton className="h-5 w-full bg-gray-300 mb-2" />
                <Skeleton className="h-4 w-[80%] bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
  
        {/* App Download Section */}
        <div className="mt-16 bg-[#2B59C3] text-white py-12 px-6 rounded-lg text-center mx-auto max-w-5xl">
          <Skeleton className="h-8 w-[300px] md:w-[400px] bg-gray-300 mx-auto" />
          <Skeleton className="h-4 w-[80%] bg-gray-300 mx-auto mt-4" />
          <div className="flex justify-center gap-8 mt-8">
            {/* Google Play Button Skeleton */}
            <Skeleton className="h-16 w-[150px] bg-gray-300 rounded-lg" />
            {/* App Store Button Skeleton */}
            <Skeleton className="h-16 w-[150px] bg-gray-300 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }
