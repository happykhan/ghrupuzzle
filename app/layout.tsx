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
            <div className="navbar-brand">
            <Link className="navbar-item has-text-weight-bold" href="/">GHRUPUZZLES</Link>
              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>              
            </div>
            <div className="navbar-menu">
              <div className="navbar-start">
                
              </div>

              <div className="navbar-end">
              <Link className="navbar-item" href="/">Home</Link>              
              <Link className="navbar-item" href="/about">About</Link>
              <Link className="navbar-item"  href="/assembly">Genome assembly exercise</Link>
              <Link className="navbar-item"  href="/typing">Genotyping exercise</Link>
              <Link className="navbar-item"  href="/outbreak">Outbreak exercise</Link>
              </div>              
             
            </div>
          </nav>
        {children}
      </body>
    </html>
  );
}
