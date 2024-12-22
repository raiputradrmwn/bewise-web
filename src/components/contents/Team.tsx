"use client";

import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Suryo Adhi Wibowo, S.T., M.T., Ph.D",
    position: "Founder",
    image: "/img/team/sao.png",
  },
  {
    name: "Dr. Iwan Iwut Tritosasmo, S.T., M.T.",
    position: "Co-Founder",
    image: "/img/team/sao.png",
  },
  {
    name: "Raihan Putra Darmawan",
    position: "Frontend Developer",
    image: "/img/team/rhn.png",
  },
  {
    name: "Adam Wisnu Pradana",
    position: "Backend Developer",
    image: "/img/team/awp.png",
  },
  {
    name: "Aulia Aushaf Abidah",
    position: "Machine Learning",
    image: "/img/team/asf.png",
  },
  {
    name: "Hoka Cristian Son",
    position: "Android Developer",
    image: "/img/team/oka.png",
  },
];

export default function Team() {
  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
      {/* Title */}
      <h1 className="text-3xl mb-16 sm:text-4xl md:text-5xl font-bold leading-tight">
        "Meet <span className="text-[#2B59C3]">The Team</span> Committed to
        <br />
        Empowering <span className="text-[#2B59C3]">Healthier</span> Lifestyles"
      </h1>

      {/* Team Members */}
      <div className="grid gap-10">
        {/* Row 1: Two Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {teamMembers.slice(0, 2).map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4"> {/* Perbesar ukuran foto */}
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <h2 className="font-bold text-lg">{member.name}</h2>
              <p className="text-[#2B59C3] font-semibold">{member.position}</p>
            </div>
          ))}
        </div>

        {/* Row 2: Four Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {teamMembers.slice(2).map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4"> {/* Perbesar ukuran foto */}
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <h2 className="font-bold text-lg">{member.name}</h2>
              <p className="text-[#2B59C3] font-semibold">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
