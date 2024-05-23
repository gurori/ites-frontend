import { cn } from "@/lib/utils"

export default function ErrorMessage({children, className, ...props}) {
    return (
        <span {...props} className={cn("text-red-500 h-6", className)}>
            {children}
        </span>
    )
}