import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const alegreya = Montserrat({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "GHRU puzzles for Microbial genomes",
  description: "Created by Nabil-Fareed Alikhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"></link>
      </head>
      <body
        className={`${alegreya.className} antialiased`}
      >
        <nav>
          <ul className="flex space-x-4">
            <li className="font-bold mr-6">
              <Link href="/">Home</Link>
            </li>
            <li className="font-bold mr-6">
              <Link href="/about">About</Link>
            </li>
            <li className="font-bold mr-6">
              <Link href="/assembly">Genome assembly exercise</Link>
            </li>             
            <li className="font-bold mr-6">
              <Link href="/typing">Genotyping exercise</Link>
            </li>       
            <li className="font-bold mr-6">
              <Link href="/outbreak">Outbreak exercise</Link>
            </li>                                   
          </ul>        
        </nav>
        {children}
      </body>
    </html>
  );
}
