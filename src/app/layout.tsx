import type { Metadata } from "next";
import 'react-image-crop/dist/ReactCrop.css'
import "./globals.css";
import ProgressBar from "@/components/ui/ProgressBar";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster />
      </body>
    </html>
  );
}
