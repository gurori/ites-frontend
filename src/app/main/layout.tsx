import { User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import styles from "./Main.module.css";

export default function ProfileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-black py-8">
      <main className="px-4 lg:px-16">
        <Link href="/profile" className="flex items-center gap-4 w-32 mb-8">
          <div className="center size-9 rounded-full bg-white">
            <User2Icon className="text-black" />
          </div>
          <p className="text-white">Профиль</p>
        </Link>
        <section className={styles.main}>
          <div className="relative h-full">
            <Image src="/images/mascot-lies.png" alt="mascot" fill className="rounded-[16px] md:rounded-none" />
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}
