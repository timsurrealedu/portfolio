import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timothy Sebastian Darmawan — Security, Systems, Building",
  description: "Timothy Sebastian Darmawan builds security and systems projects spanning threat detection, source-code scanning, self-hosted infrastructure, and automated media.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
