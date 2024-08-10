import type { CompetitionProp } from "@/lib/types/ICompetition";
import styles from "./Competitions.module.css";
import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import dateFormat from "@/lib/dateFormat";

export default function Competition({
  competition,
}: Readonly<CompetitionProp>) {
  return (
    <div className={cn(styles.competition, "flex gap-32 justify-between")}>
      <div className="grid content-between">
        <p className={styles.title}>{competition.title}</p>
        <p className="text-white line-clamp-3">{competition.description}</p>
        <p className={styles.date}>
          Дата проведения: {dateFormat(competition.startDate)}
        </p>
      </div>
      <div className="grid place-content-between">
        <p> </p> {/*there will be a bookmark icon */}
        <Link
          href={`/competition/${competition.id}`}
          className={cn(styles.button, "flex justify-between items-center")}
        >
          Узнать подробнее <MoveRightIcon />
        </Link>
      </div>
    </div>
  );
}
