import { HEADERTABS } from "@/utils/constants.utils";
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
  return (
    <>
      <div
        className="flex items-center bg-[#111812]
       justify-between px-6 py-3 h-[10%]"
      >
        <NavigationMenu>
          <NavigationMenuList className="flex gap-3">
            {HEADERTABS.map((value: { name: string; path: string }) => {
              return (
                <NavigationMenuItem key={value.path}>
                  <Link href={value.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        value.path === path?.toLocaleLowerCase()
                          ? "bg-gray-300 text-black"
                          : "bg-transparent text-white"
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

        <div
          onBlur={() => setShowMenu(false)}
          tabIndex={0}
          className="relative"
        >
          <Avatar
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer"
          >
            <AvatarImage
              src={session?.user?.image || undefined}
              className="h-10 w-10 rounded-full"
            />

            <AvatarFallback>null</AvatarFallback>
          </Avatar>
          {showMenu && (
            <ProfileMenu session={session} setShowMenu={setShowMenu} />
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
