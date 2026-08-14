"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "../actions";

export default function Logout() {
  const { replace, back } = useRouter();
  return (
    <>
      <button className="yellow-border px-4" onClick={back}>
        Отмена
      </button>
      <button
        className="small bg-red-400 text-black-800 px-4"
        onClick={async () => {
          await deleteCookie("auth");
          await deleteCookie("role");
          replace("/");
        }}
      >
        Подвердить
      </button>
    </>
  );
}
