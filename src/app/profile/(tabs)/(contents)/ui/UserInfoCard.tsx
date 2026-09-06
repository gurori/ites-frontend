"use client";

import s from "./UI.module.css";
import JobTitle from "@/components/ui/JobTitle";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, MoveRightIcon, XIcon } from "lucide-react";
import type {
  CompetitionApplicationProp,
  OrderApplicationProp,
  TeamApplicationProp,
} from "@/lib/types/IApplication";
import apiFetch from "@/lib/apiFetch";
import { useState } from "react";
import { getHtmlTags } from "@/lib/utils";
import { toast } from "sonner";

export function UserForCompetitionInfo({
  application,
  token,
}: Readonly<CompetitionApplicationProp & { token: string }>) {
  const [show, setShow] = useState(true);
  const user = application.fromMember;

  async function handleApplication(accept: boolean) {
    try {
      const response = await apiFetch(
        `/api/competitions/entries/${application.id}/handle`,
        {
          method: "PATCH",
          token,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accept }),
        },
      );

      if (!response.ok) {
        toast.error("Не удалось обновить статус заявки.");
        return;
      }

      toast.success(accept ? "Заявка принята!" : "Заявка отклонена.");
      setShow(false);
    } catch (error) {
      console.error("Error handling competition application:", error);
      toast.error("Ошибка сети. Проверьте подключение.");
    }
  }

  if (!show) return null;

  return (
    <div className={s.userInfoCard}>
      <div className="size-[100px] absolute -translate-x-1/3 -translate-y-1/3">
        <Image
          src={`/api/external/files/users/${user.id}/avatar`}
          fill
          alt="avatar"
        />
      </div>
      <div className="mb-2">
        {`${user.lastName} ${user.firstName} ${user.middleName}`} отправил(-а)
        Вам заявку на{" "}
        <div
          className="break-words [&>*]:text-lg [&>*]:font-normal inline-block"
          dangerouslySetInnerHTML={{
            __html: getHtmlTags(application.forCompetition.contentInHtml, 2),
          }}
        />
      </div>
      <JobTitle
        className="place-self-start my-2"
        title={user.jobTitle || user.role}
      />
      <div className="grid gap-2 lg:flex lg:justify-between lg:self-end">
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
  token,
}: Readonly<OrderApplicationProp & { token: string }>) {
  const [show, setShow] = useState(true);
  const user = application.fromMember;

  async function handleApplication(accept: boolean) {
    try {
      const response = await apiFetch(
        `/api/orders/bids/${application.id}/handle`,
        {
          method: "PATCH",
          token,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accept }),
        },
      );

      if (!response.ok) {
        toast.error("Не удалось обновить статус заявки.");
        return;
      }

      toast.success(accept ? "Заявка принята!" : "Заявка отклонена.");
      setShow(false);
    } catch (error) {
      console.error("Error handling order application:", error);
      toast.error("Ошибка сети. Проверьте подключение.");
    }
  }

  if (!show) return null;

  return (
    <div className={s.userInfoCard}>
      <div className="size-[100px] absolute -translate-x-1/3 -translate-y-1/3">
        <Image
          src={`/api/external/files/users/${user.id}/avatar`}
          className={s.imgShadow}
          fill
          alt="avatar"
        />
      </div>
      <p>
        {`${user.lastName} ${user.firstName} ${user.middleName}`} отправил(-а)
        Вам заявку на {application.forOrder.title}
      </p>
      <JobTitle
        className="place-self-start my-2"
        title={user.jobTitle || user.role}
      />
      <div className="grid gap-2 lg:flex lg:justify-between lg:self-end">
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

export function UserForTeamInfo({
  application,
  token,
}: Readonly<TeamApplicationProp & { token: string }>) {
  const [show, setShow] = useState(true);
  const user = application.fromMember;

  async function handleApplication(accept: boolean) {
    try {
      const response = await apiFetch(
        `/api/teams/join-requests/${application.id}/handle`,
        {
          method: "PATCH",
          token,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accept }),
        },
      );

      if (!response.ok) {
        toast.error("Не удалось обновить статус заявки.");
        return;
      }

      toast.success(accept ? "Заявка принята!" : "Заявка отклонена.");
      setShow(false);
    } catch (error) {
      console.error("Error handling team application:", error);
      toast.error("Ошибка сети. Проверьте подключение.");
    }
  }

  if (!show) return null;

  return (
    <div className={s.userInfoCard}>
      <div className="size-[100px] absolute -translate-x-1/3 -translate-y-1/3">
        <Image
          src={`/api/external/files/users/${user.id}/avatar`}
          className={s.imgShadow}
          fill
          alt="avatar"
        />
      </div>
      <p>
        {`${user.lastName} ${user.firstName} ${user.middleName}`} отправил(-а)
        Вам заявку на вступление в команду
      </p>
      <JobTitle
        className="place-self-start my-2"
        title={user.jobTitle || user.role}
      />
      <div className="grid gap-2 lg:flex lg:justify-between lg:self-end">
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
