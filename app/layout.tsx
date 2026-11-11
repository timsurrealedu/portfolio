import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({ src: "./fonts/VT323-400.woff2", variable: "--display-font", display: "swap" });
const mono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-400.woff2", weight: "400" },
    { path: "./fonts/IBMPlexMono-600.woff2", weight: "600" },
  ],
  variable: "--mono-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Timothy Sebastian Darmawan — Security, Systems, Building",
  description: "Timothy Sebastian Darmawan builds security and systems projects spanning threat detection, self-hosted infrastructure, backend services, and automated media.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1d2021" },
    { media: "(prefers-color-scheme: light)", color: "#f2e5bc" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets scroll reveals start hidden only when JS runs; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
