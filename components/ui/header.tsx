import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./navigation-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./avatar";
import { HEADERTABS } from "@/utils/constants.utils";
import ProfileMenu from "../ProfileMenu";
import collab from "@/public/logo.svg";

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className="flex items-center bg-[#111812]
       justify-between xs:px-1 md:px-3 lg:px-6 py-3 h-[10%]"
      >
        <Image
          src={collab}
          alt="collab"
          className="h-14 w-14 cursor-pointer"
          priority
          onClick={() => router.push("/explore")}
        />
        <div className="flex gap-5">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {HEADERTABS.map((value: { name: string; path: string }) => {
                return (
                  <NavigationMenuItem key={value.path} className="bg-none">
                    <Link href={value.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`tracking-widest text-white bg-transparent hover:text-white navigation-btn xs:text-xs md:text-sm focus:text-white ${navigationMenuTriggerStyle()} ${
                          value.path === path?.toLocaleLowerCase()
                            ? "border"
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

          <div
            onBlur={() => setShowMenu(false)}
            onKeyDown={(e) => {
              if ((e.key = "Enter")) {
                setShowMenu(!showMenu);
              }
            }}
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
      </div>
    </>
  );
};
export default Header;
