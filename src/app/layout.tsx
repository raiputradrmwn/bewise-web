import "./globals.css";
import type { Metadata } from "next";
import { METADATA } from "./metadata";
import { poppins } from "@/styles/font";

export const metadata: Metadata = {
  title: {
    default: METADATA.title,
    template: `%s | ${METADATA.title}`,
  },
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: [
    {
      name: METADATA.authors.name,
      url: METADATA.authors.url,
    },
  ],
  openGraph: {
    type: 'website', // Tipe diperbaiki menjadi 'website'
    locale: METADATA.openGraph.locale,
    url: METADATA.openGraph.url,
    title: METADATA.openGraph.title,
    description: METADATA.openGraph.description,
    siteName: METADATA.openGraph.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.twitter.title,
    description: METADATA.twitter.description,
  },
  robots: {
    index: METADATA.robots.index,
    follow: METADATA.robots.follow,
  },
  alternates: {
    canonical: METADATA.canonical,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-[#F5F5F5]`}
      >
        {children}
      </body>
    </html>
  );
}
