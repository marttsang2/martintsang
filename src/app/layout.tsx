import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
