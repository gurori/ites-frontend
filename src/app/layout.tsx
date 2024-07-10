import type { Metadata } from "next";
import "./globals.css";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "ITes",
  description: "Платформа для проведения конкурсов МПИТ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
