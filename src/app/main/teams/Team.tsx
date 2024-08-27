import styles from "./Team.module.css";
import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import type { TeamProp } from "@/lib/types/ITeam";

export default function Team({ team }: Readonly<TeamProp>) {
  return (
    <div className={cn(styles.team, "grid gap-8 md:flex md:gap-32 justify-between")}>
      <div className="grid content-between">
        <p className={styles.title}>{team.name}</p>
        <p><b>Команда "{team.name}" ищет будущих участников</b></p>
        <p className="line-clamp-4 md:line-clamp-3">{team.description}</p>
        <div className={styles.bold}>
          <p>Всего участников: {team.membersIds?.length}</p>
        </div>
      </div>
      <div className="grid place-content-between">
        <p> </p> {/*there will be a bookmark icon */}
        <Link
          href={`/team/${team.id}?mode=invite`}
          className={cn(styles.button, "flex justify-between items-center")}
        >
          Узнать подробнее <MoveRightIcon />
        </Link>
      </div>
    </div>
  );
}
