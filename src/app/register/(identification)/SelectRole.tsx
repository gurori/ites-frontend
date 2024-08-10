import { Role } from "@/lib/types/Role";
import styles from "./IdentificationForm.module.css";
import { cn } from "@/lib/utils";

export default function SelectRole({
  role,
  onClick,
  active = false,
}: Readonly<{ role: Role; active?: boolean; onClick: () => void }>) {
  return (
    <div
      onClick={onClick}
      className={cn(
        styles.selection,
        "cursor-pointer transition-all center",
        active && "active-lights"
      )}
    >
      <p className={styles.role}>{role.toUpperCase()}</p>
    </div>
  );
}
