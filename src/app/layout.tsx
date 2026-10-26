import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import { site, skills } from "@/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.statement}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "profile",
    firstName: "Martin",
    lastName: "Tsang",
    locale: "en_CA",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}${site.avatar}`,
      jobTitle: site.jobTitle,
      description: site.description,
      email: `mailto:${site.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "CA",
      },
      sameAs: [site.github, site.linkedin],
      knowsAbout: skills.flatMap((group) => group.items),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "en-CA",
      author: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
