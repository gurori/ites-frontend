"use client";

import GhostButton from "@/components/ui/buttons/GhostButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import apiFetch from "@/lib/apiFetch";
import { useRouter } from "next/navigation";

export default function DeleteAccauntButton({
  token,
}: Readonly<{ token: string }>) {
  const { push } = useRouter();
  const handleDelete = async () => {
    const res = await apiFetch("/api/user", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      push("/");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <GhostButton className="text-[#FF5900]">
          Удалить ваш аккаунт
        </GhostButton>
      </DialogTrigger>
      <DialogContent>
        <p className="text-white">Вы уверены, что хоите выйти?</p>
        <button
          className="small bg-red-400 text-black-800 px-6 justify-self-start"
          onClick={handleDelete}
        >
          Подвердить
        </button>
      </DialogContent>
    </Dialog>
  );
}
