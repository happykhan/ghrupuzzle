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
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"/>      
      </head>
      <body
        className={`${alegreya.className} antialiased`}
      >
            <nav className="navbar" role="navigation" aria-label="main navigation">
            <Link className="navbar-item" href="/">Home</Link>
            <Link className="navbar-item" href="/about">About</Link>
            <Link className="navbar-link"  href="/assembly">Genome assembly exercise</Link>
            <div className="navbar-dropdown">
              <Link className="navbar-item"  href="/assembly">Challenge</Link>
              <Link className="navbar-item"  href="/assembly/practice">Practice</Link>
            </div> 

            <Link className="navbar-item"  href="/typing">Genotyping exercise</Link>
            <Link className="navbar-item"  href="/outbreak">Outbreak exercise</Link>
          </nav>
        {children}
      </body>
    </html>
  );
}
