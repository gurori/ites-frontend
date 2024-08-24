"use client";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import NavBar from "./NavBar";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function Header() {
  return (
    <header className="flex items-center md:gap-6 lg:gap-8 relative lg:ml-4 mr-4">
        <Image
          src="/logos/ites-purple-small.svg"
          alt="logo"
          className="-mb-4 cursor-pointer"
          height={104}
          width={178}
          onClick={() => window.location.reload()}
        />
      <select className="hidden md:block" name="" id="">
        <option value="">РУС</option>
        <option value="">ENG</option>
        <option value="">САХ</option>
      </select>
      <div className="flex items-center ml-auto gap-4 md:gap-16">
        <nav className="md:flex gap-10 lg:gap-16 hidden">
          <NavBar />
        </nav>
        <Menubar className="block md:hidden">
          <MenubarMenu>
            <MenubarTrigger>
              <AlignJustify />
            </MenubarTrigger>
            <MenubarContent className="block md:hidden">
              <MenubarItem>
                <Link className="w-full" href="/">Главная</Link>
              </MenubarItem>
              <MenubarItem>
                <Link className="w-full" href="https://github.com/gurori/ites-frontend">Про сайт</Link>
              </MenubarItem>
              {/* <MenubarItem>
                <Link className="w-full" href="/about">О нас</Link>
              </MenubarItem> */}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Link href="/login">
          <button className="small bg-black text-white px-8">Войти</button>
        </Link>
      </div>
    </header>
  );
}
