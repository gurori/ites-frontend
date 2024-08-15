"use client"

import s from "./UI.module.css";
import JobTitle from "@/components/ui/JobTitle";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, MoveRightIcon, XIcon } from "lucide-react";
import type { CompetitionApplicationProp, OrderApplicationProp } from "@/lib/types/IApplication";
import apiFetch from "@/lib/apiFetch";
import { useState } from "react";

export function UserForCompetitionInfo({
  application,
  token
}: Readonly<CompetitionApplicationProp & {token: string}>) {
  const [show, setShow] = useState(true)
  const user = application.fromMember;
  async function handleApplication(accept: boolean) {
    await apiFetch(`/api/Competitions/application/${application.id}/${accept}`, {
      credentials: "include",
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    });
    setShow(false)
  }
  return show && (
    <div className={s.userInfoCard}>
      <div className="size-[100px] absolute -translate-x-1/3 -translate-y-1/3">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/files/users/${user.id}/avatar.jpg`}
          className={s.imgShadow}
          fill
          alt="avatar"
        />
      </div>
      <p>
        {`${user.lastName} ${user.firstName} ${user.middleName}`} отправил(-а) Вам
        заявку на {application.forCompetition.title}
      </p>
      <JobTitle className="place-self-start" title={user.jobTitle || user.role} />
      <div className="flex justify-between self-end">
        <Link
          href={`/profile/${user.role}/${user.id}`}
          className={s.toProfileLink}
        >
          Перейти к профилю <MoveRightIcon />
        </Link>
        <div className="flex gap-6">
          <button className={s.green} onClick={() => handleApplication(true)}>
            Принять <CheckIcon />
          </button>
          <button className={s.red} onClick={() => handleApplication(false)}>
            Отказать <XIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export function UserForOrderInfo({
  application,
  token
}: Readonly<OrderApplicationProp & {token: string}>) {
  const [show, setShow] = useState(true)
  const user = application.fromMember;
  async function handleApplication(accept: boolean) {
    await apiFetch(`/api/orders/application/${application.id}/${accept}`, {
      credentials: "include",
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    });
    setShow(false)
  }
  return show && (
    <div className={s.userInfoCard}>
      <div className="size-[100px] absolute -translate-x-1/3 -translate-y-1/3">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/files/users/${user.id}/avatar.jpg`}
          className={s.imgShadow}
          fill
          alt="avatar"
        />
      </div>
      <p>
        {`${user.lastName} ${user.firstName} ${user.middleName}`} отправил(-а) Вам
        заявку на {application.forOrder.title}
      </p>
      <JobTitle className="place-self-start" title={user.jobTitle || user.role} />
      <div className="flex justify-between self-end">
        <Link
          href={`/profile/${user.role}/${user.id}`}
          className={s.toProfileLink}
        >
          Перейти к профилю <MoveRightIcon />
        </Link>
        <div className="flex gap-6">
          <button className={s.green} onClick={() => handleApplication(true)}>
            Принять <CheckIcon />
          </button>
          <button className={s.red} onClick={() => handleApplication(false)}>
            Отказать <XIcon />
          </button>
        </div>
      </div>
    </div>
  );
}