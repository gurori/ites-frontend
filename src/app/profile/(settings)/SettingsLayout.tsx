import { type ReactNode } from "react";
import styles from "./Settings.module.css";
import BackButton from "@/components/ui/buttons/BackButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SettingsLayout({
  children,
  className,
  backUrl,
  title = "Редактировать профиль",
}: Readonly<{
  children: ReactNode;
  title?: string;
  className?: string;
  backUrl: string;
}>) {
  return (
    <div className={cn("bg-black-800 absolute w-full", className)}>
      <div className="py-8">
        <main className={styles.container}>
          <div className="flex gap-6 items-center -ml-6">
            <Link href={backUrl}>
              <BackButton />
            </Link>
            <p className="text-white">{title}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
