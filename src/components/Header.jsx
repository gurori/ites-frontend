import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import Nav from "./Nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="flex items-center md:gap-6 lg:gap-8 relative lg:ml-4 mr-4">
      <button onClick={() => window.location.reload()}>
        <img src="/logos/ites-purple-small.svg" alt="logo" className="-mb-4" />
      </button>
      <select className="hidden md:block" name="" id="">
        <option value="">РУС</option>
        <option value="">ENG</option>
        <option value="">САХ</option>
      </select>
      <div className="flex items-center ml-auto gap-4 md:gap-16">
        <nav className="md:flex gap-10 lg:gap-16 hidden">
          <Nav />
        </nav>
        <NavigationMenu className="md:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <AlignJustify />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="grid p-4 gap-2 w-[100px]">
                <Nav />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link to="/sign-in">
          <button className="small bg-black text-white px-8">Войти</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
