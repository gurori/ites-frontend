import type { CompetitionsProp } from "@/lib/types/ICompetition";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import styles from "./Styles.module.css";

export default async function CompetitionsTab({
  competitions,
  index,
}: Readonly<Partial<CompetitionsProp> & { index: number }>) {
  return (
    <>
      {competitions && competitions.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {competitions.map((c) => (
            <div className="w-[218px]" key={c.id}>
              <div className={styles.infoBlock}></div>
              <p className="text-center text-white pt-2 line-clamp-2 break-words">
                {c.title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}