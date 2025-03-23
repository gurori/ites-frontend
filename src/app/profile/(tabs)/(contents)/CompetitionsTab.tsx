"use client";

import type { CompetitionsProp } from "@/lib/types/ICompetition";
import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";
import styles from "./Styles.module.css";
import Link from "next/link";
import { getHtmlTags } from "@/lib/utils";

export default function CompetitionsTab({
  competitions,
  index,
}: Readonly<Partial<CompetitionsProp> & { index: number }>) {
  return (
    <>
      {competitions && competitions.length !== 0 ? (
        <div className="flex flex-wrap gap-8">
          {competitions.map((c) => (
            <Link href={`/competition/${c.id}`} key={c.id}>
              <div className="w-[218px]">
                <div className={styles.infoBlock}></div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: getHtmlTags(c.contentInHtml, 1)
                      .replace("h1", "p")
                      .replace(
                        "<p>",
                        '<p class="text-center text-white pt-2 line-clamp-2 break-words">'
                      ),
                  }}
                ></span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ThereIsNothingMessage index={index} />
      )}
    </>
  );
}
