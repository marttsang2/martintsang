import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Lines from "@/components/Lines";

export const metadata: Metadata = {
  title: "Martin Tsang | Software Engineer",
  description: "Software Engineer based in Toronto, Canada. Building exceptional digital experiences with modern web technologies.",
  keywords: ["Software Engineer", "Full Stack Developer", "React", "Next.js", "TypeScript", "Toronto"],
  authors: [{ name: "Martin Tsang" }],
  openGraph: {
    title: "Martin Tsang | Software Engineer",
    description: "Software Engineer based in Toronto, Canada. Building exceptional digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="font-sans antialiased bg-black text-white"
        suppressHydrationWarning
      >
        {/* Background effects */}
        <Lines />
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
