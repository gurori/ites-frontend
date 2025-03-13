import { ReactNode } from "react"
import s from "./UI.module.css"
import { ChevronRightIcon } from "lucide-react"
import Image from "next/image"

export default function PurpleButton({children}: Readonly<{children: ReactNode}>) {
    return <div className={s.PurpleButton}>
        <div className="flex place-items-center justify-between h-full px-10 relative">
            {children}
        <ChevronRightIcon className="text-white" />
        <Image alt="star" src={"/stars/small.png"} height={200} width={130} className="absolute right-14 bottom-0" />
        </div>
    </div>
}