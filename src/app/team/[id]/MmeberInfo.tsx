import type { UserProp } from "@/lib/types/IUser";
import Image from "next/image";
import JobTitle from "@/components/ui/JobTitle";

export default function MemberInfo({ user }: Readonly<UserProp>) {
  return (
    <div className="grid gap-3 justify-items-center">
      <div className="size-[130px] rounded-full relative">
        <Image
          alt="avatar"
          fill
          className="rounded-full"
          src={`${process.env.NEXT_PUBLIC_API_URL}/api/Files/users/${user.id}/avatar.jpg`}
        />
      </div>
      <p className="text-white text-xl">{user.firstName}</p>
      <JobTitle title={user.jobTitle || user.role} />
    </div>
  );
}
