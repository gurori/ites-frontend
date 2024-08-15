import type { ReactNode } from "react";

export default function OrderLayout({
    children,
  }: Readonly<{ children: ReactNode }>) {
    return (
      <div className="min-h-screen bg-black center">
        {children}
      </div>
    );
  }