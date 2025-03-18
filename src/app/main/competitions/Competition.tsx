import type { CompetitionProp } from "@/lib/types/ICompetition";
import styles from "./Competitions.module.css";
import { cn, getHtmlTags } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default function Competition({
  competition,
}: Readonly<CompetitionProp>) {
  return (
    <div className={cn(styles.competition, "grid gap-8 md:flex md:gap-32 justify-between")}>
      <div className="grid content-between [&>*]:text-white [&>*]:line-clamp-3 [&>*]:md:line-clamp-2" dangerouslySetInnerHTML={{__html: getHtmlTags(competition.contentInHtml, 4)}}>
        {/* <p className={styles.title}>{competition.title}</p>
        <p className="text-white line-clamp-4 md:line-clamp-3">{competition.description}</p>
        <p className={styles.date}>
          Дата проведения: {dateFormat(competition.startDate)}
        </p> */}
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
