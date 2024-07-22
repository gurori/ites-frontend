import { type ReactNode } from "react";
import styles from "./Settings.module.css";
import BackButton from "@/components/ui/buttons/BackButton";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="bg-black-800">
      <div className="py-8">
        <main className={styles.container}>
          <div className="flex gap-6 items-center -ml-6">
            <Link href="/profile">
            <BackButton  />
            </Link>
            <p className="text-white">Настроить профиль</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
