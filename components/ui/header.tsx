import { HEADERTABS } from "@/utils/constants.utis";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./avatar";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "./navigation-menu";
import { useState } from "react";
import ProfileMenu from "../ProfileMenu";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data: session, status } = useSession();

  const [showMenu, setShowMenu] = useState(false);
  const path = usePathname();
  console.log(path);
  return (
    <>
      <div className="flex items-center bg-white justify-between px-6 py-3 h-[10%]">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-3">
            {HEADERTABS.map((value: any) => {
              return (
                <NavigationMenuItem>
                  <Link href={value.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        value.path === path?.toLocaleLowerCase()
                          ? "bg-gray-300"
                          : ""
                      }`}
                    >
                      {value.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <Avatar
          onClick={() => setShowMenu(!showMenu)}
          onBlur={() => setShowMenu(false)}
          className="relative cursor-pointer"
        >
          <AvatarImage
            src={session?.user?.image || undefined}
            className="h-10 w-10 rounded-full"
          />
          {showMenu && <ProfileMenu session={session} />}
          <AvatarFallback>null</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};
export default Header;
