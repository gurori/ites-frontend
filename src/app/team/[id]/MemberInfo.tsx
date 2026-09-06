import type { UserProp } from "@/lib/types/IUser";
import Image from "next/image";
import JobTitle from "@/components/ui/JobTitle";
import Link from "next/link";

export default function MemberInfo({ user }: Readonly<UserProp>) {
  return (
    <div className="grid gap-3 justify-items-center">
      <div className="size-[130px] rounded-full relative">
        <Image
          alt="avatar"
          fill
          className="rounded-full"
          src={`/api/external/files/users/${user.id}/avatar`}
        />
      </div>
      <Link
        href={`/profile/${user.role}/${user.id}`}
        className="text-white text-2xl"
      >
        {user.firstName}
      </Link>
      <JobTitle title={user.jobTitle || user.role} />
    </div>
  );
}
