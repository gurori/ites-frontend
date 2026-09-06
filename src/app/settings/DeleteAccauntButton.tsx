"use client";

import GhostButton from "@/components/ui/buttons/GhostButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import apiFetch from "@/lib/apiFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteAccountButton({
  token,
}: Readonly<{ token: string }>) {
  const { replace } = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await apiFetch("/api/users/me", {
        method: "DELETE",
        token,
      });

      if (!response.ok) {
        console.error("Failed to delete account:", response.status);
        toast.error("Не удалось удалить аккаунт.", {
          description:
            "Проверьте подключение к интернету или попробуйте позже.",
        });
        setIsDeleting(false);
        return;
      }

      toast.success("Аккаунт успешно удален.");
      replace("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Ошибка сети. Проверьте подключение.");
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GhostButton className="text-[#FF5900]">
          Удалить ваш аккаунт
        </GhostButton>
      </DialogTrigger>
      <DialogContent>
        <p className="text-white">
          Вы уверены, что хотите безвозвратно удалить ваш аккаунт?
        </p>
        <button
          className="small bg-red-400 text-black-800 px-6 justify-self-start disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Удаление..." : "Подтвердить"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
