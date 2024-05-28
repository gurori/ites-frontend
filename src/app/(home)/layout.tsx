import React from "react";
import Header from "./Header";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
        <Header />
        {children}
    </>
  )
}
