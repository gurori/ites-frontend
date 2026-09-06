import type { CompetitionProps } from "@/lib/types/ICompetition";
import styles from "./Competitions.module.css";
import { cn, getHtmlTags } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default function Competition({
  competition,
}: Readonly<CompetitionProps>) {
  return (
    <div
      className={cn(
        styles.competition,
        "grid gap-8 md:flex md:gap-32 justify-between",
      )}
    >
      <div
        className="grid content-between [&>*]:text-white [&>*]:line-clamp-3 [&>*]:md:line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: getHtmlTags(competition.contentInHtml, 3),
        }}
      ></div>
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
