import type { Metadata } from "next";
import "react-image-crop/dist/ReactCrop.css";
import "./globals.css";
import ProgressBar from "@/components/ui/ProgressBar";
import { Toaster } from "@/components/ui/sonner";
import { siteMetadata } from "@/lib/constants";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ProgressBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
