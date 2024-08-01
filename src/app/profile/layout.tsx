import { type ReactNode } from "react";

export default function ProfileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="h-screen bg-black flex">{children}</div>;
}
