import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Martin Tsang — Software Engineer",
  description:
    "Software engineer in Toronto building production web platforms across booking, legal, and AI domains.",
  metadataBase: new URL("https://martintsang.com"),
  openGraph: {
    title: "Martin Tsang — Software Engineer",
    description:
      "Software engineer in Toronto building production web platforms across booking, legal, and AI domains.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 grid-bg radial-fade opacity-60" />
          <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-yellow-300/[0.06] via-transparent to-transparent" />
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
