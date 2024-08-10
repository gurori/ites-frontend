"use client";

import { Pencil } from "lucide-react";
import styles from "./ProfileSidePanel.module.css";
import JobTitle from "../ui/JobTitle";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { UserProp } from "@/lib/types/IUser";

export default function ProfileSidePanel({
  user,
  onlyInfo = false,
}: Readonly<UserProp & { onlyInfo?: boolean }>) {
  const hrefParams = {
    pathname: `/profile/${user.role}/settings`,
    query: {
      first: user.firstName,
      middle: user.middleName,
      last: user.lastName,
      description: user.description,
      job: user.jobTitle,
      user: user.id,
    },
  };
  return (
    <>
      <span className="w-[283px]" />
      <div className={cn(styles.sidePanel, "scrollbar-none")}>
        <Image
          className="-ml-4 mt-4 cursor-pointer"
          src="/logos/ites-white-small.svg"
          alt="ites logo"
          width={172}
          height={89}
          onClick={() => window.location.reload()}
        />
        <hr />
        <div className="grid gap-3 justify-items-center pt-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/Files/users/${user.id}/avatar.jpg`}
            alt="avatar"
            width={130}
            height={130}
            className="rounded-full size-[130px]"
          />
          <p className="flex items-center text-white gap-4 text-xl">
            {user.firstName}
            {!onlyInfo && (
              <Link href={hrefParams}>
                <Pencil size={18} />
              </Link>
            )}
          </p>
          <JobTitle title={user.jobTitle || user.role} />
          <p className={styles.text}>{user.description}</p>
        </div>
        {!onlyInfo && (
          <>
            <hr className="my-8" />
            <div className="grid gap-10 pb-10 text-[#FAFAFA] justify-items-start">
              <Link href={hrefParams}>Настроить профиль</Link>
              <Link href="/logout">Выйти</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
