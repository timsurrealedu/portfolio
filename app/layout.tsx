import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timothy Sebastian Darmawan — Security, Systems, Building",
  description: "Cyber Security student building developer security tools, infrastructure, backend systems, and human-centered technology.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
