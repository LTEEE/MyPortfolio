import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maksym Poberezhnyi | Portfolio",
  description: "International Marketing student, content writer, and app developer based in Łódź.",
  openGraph: {
    title: "Maksym Poberezhnyi | Portfolio",
    description: "International Marketing student, content writer, and app developer based in Łódź.",
    url: "https://your-portfolio-url.com",
    siteName: "Maksym Poberezhnyi",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
