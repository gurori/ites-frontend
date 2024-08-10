"use client";

import { type ITab } from "@/lib/types/ITab";
import { useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import styles from "./Tabs.module.css";

export default function Tabs({ tabs }: { tabs: ITab[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabRefs.current[activeTab];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }
    setTabPosition();
    window.addEventListener("resize", setTabPosition);
  }, [activeTab]);

  return (
    <>
      <div className="relative overflow-x-scroll scrollbar-none">
        <div className=" flex">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className="flex-shrink-0"
              onClick={() => setActiveTab(index)}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
            >
              {tabs[index].name}
            </Tab>
          ))}
        </div>
        <span
          className="absolute bottom-0 block h-1 bg-purple transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className={styles.content}>{tabs[activeTab].content}</div>
    </>
  );
}
