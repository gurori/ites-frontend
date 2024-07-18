"use client";

import { Pencil } from "lucide-react";
import styles from "./ProfileSidePanel.module.css";
import JobTitle from "../ui/JobTitle";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IUserProfileProps } from "@/lib/types/IUser";

export default function ProfileSidePanel({ user }: IUserProfileProps) {
  console.log(user)
  const hrefParams = {
    pathname: "profile/settings",
    query: {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      description: user.description,
      jobTitle: user.jobTitle,
      userId: user.id,
    },
  };
  return (
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
            src={`https://localhost:64948/api/Files/users/${user.id}/avatar.jpg`}
            alt="avatar"
            width={130}
            height={130}
            className="rounded-full size-[130px]"
          />
        <p className="flex items-center text-white gap-4 text-xl">
          {user.firstName}{" "}
          <Link href={hrefParams}>
            <Pencil size={18} />
          </Link>
        </p>
        <JobTitle title={user.jobTitle} />
        <p className={styles.text}>{user.description}</p>
      </div>
      <hr className="my-8" />
      <div className="grid gap-10 pb-10 text-[#FAFAFA]">
        <Link href={hrefParams}>Настроить профиль</Link>
      </div>
    </div>
  );
}
