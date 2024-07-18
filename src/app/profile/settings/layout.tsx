import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";
import styles from "./Settings.module.css"

export default function SettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="bg-black-800">
      <div className="py-8">
        <main className={styles.container}>
          <div className="flex gap-6 items-center -ml-6">
            <Link href="/profile">
              <div className="bg-gray-400 size-[34px] rounded-full center">
                <ChevronLeft className="text-black -ml-0.5" />
              </div>
            </Link>
            <p className="text-white">Настроить профиль</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
