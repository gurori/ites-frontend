import { ReactNode } from "react"
import s from "./UI.module.css"
import { ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function PurpleButton({children}: Readonly<{children: ReactNode}>) {
    return <div className={cn(s.PurpleButton, "relative z-[1]")}>
        <div className="flex place-items-center justify-between h-full px-10 relative">
            {children}
        <ChevronRightIcon className="text-white" />
        <Image alt="star" src={"/stars/small.png"} height={200} width={130} className="absolute right-14 bottom-0 -z-10" />
        </div>
    </div>
}