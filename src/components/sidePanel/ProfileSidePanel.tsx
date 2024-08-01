"use client";

import { Pencil } from "lucide-react";
import styles from "./ProfileSidePanel.module.css";
import JobTitle from "../ui/JobTitle";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IUserProfileProps } from "@/lib/types/IUser";
import { apiUrl } from "@/lib/constants";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { deleteCookie } from "@/app/actions";

export default function ProfileSidePanel({ user }: IUserProfileProps) {
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
          src={`${apiUrl}/api/Files/users/${user.id}/avatar.jpg`}
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
        <JobTitle title={user.jobTitle || user.role} />
        <p className={styles.text}>{user.description}</p>
      </div>
      <hr className="my-8" />
      <div className="grid gap-10 pb-10 text-[#FAFAFA]">
        <Link href={hrefParams}>Настроить профиль</Link>
        <Dialog>
          <DialogTrigger asChild>
            <p className="cursor-pointer">Выйти</p>
          </DialogTrigger>
          <DialogContent
            title="Выход"
            className="max-w-[480px]"
            overlayClassName="opacity-60"
          >
            <p>Вы уверены, что хоите выйти?</p>
              <div className="flex absolute bottom-8 right-8 gap-4">
            <DialogClose>
                <button className="yellow-border px-4">Отмена</button>
                </DialogClose>
                <button
                  className="small bg-red-500 text-black-800 px-4"
                  onClick={() => deleteCookie("auth")}
                >
                  Подвердить
                </button>
              </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
