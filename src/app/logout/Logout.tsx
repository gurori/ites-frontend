"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "../actions";
import s from "./Logout.module.css";

export default function Logout() {
  const { push, back } = useRouter();
  return (
    <div className="h-screen bg-black center">
      <div className={s.logout}>
        <p className="text-white">Вы уверены, что хоите выйти?</p>
        <div className="flex gap-4 justify-self-end">
          <button className="yellow-border px-4" onClick={back}>
            Отмена
          </button>
          <button
            className="small bg-red-400 text-black-800 px-4"
            onClick={async () => {
              await deleteCookie("auth");
              await deleteCookie("role");
              push("/");
            }}
          >
            Подвердить
          </button>
        </div>
      </div>
    </div>
  );
}
