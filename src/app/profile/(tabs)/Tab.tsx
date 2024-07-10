import { forwardRef, Ref } from "react";
import styles from "./Tabs.module.css";
import { cn } from "@/lib/utils";
import { ComponentProps } from "@/lib/types/ComponentProps";

const Tab = forwardRef<HTMLButtonElement, ComponentProps>(
  ({ children, className, onClick }, ref) => {
    return (
      <button
        className={cn(styles.tab, className)}
        onClick={onClick}
        ref={ref as Ref<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }
);

Tab.displayName = "Tab";

export default Tab;
