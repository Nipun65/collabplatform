"use client";
import { useGetExplorePostQuery, useGetYourPostQuery } from "@/redux/api";
import Image from "next/image";
import nextjs from "@/public/next.svg";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SOCIALLINKS } from "@/utils/constants.utis";
import { usePathname } from "next/navigation";

const Content = () => {
  const path = usePathname();
  let data: any;
  let status: any;

  if (path === "/explore") {
    const { data: exploreData, status: exploreStatus } =
      useGetExplorePostQuery("");
    data = exploreData;
    status = exploreStatus;
  } else if (path === "/your-posts") {
    const { data: yourPosts, status: yourPostStatus } =
      useGetYourPostQuery("ffsaf@gmail.com");
    data = yourPosts;
    status = yourPostStatus;
  }
  console.log(data);

  return (
    <div className="bg-[#171717] h-[90%] overflow-auto p-4">
      {data?.length > 0 && (
        <div className="p-4 xs:place-items-center xs:grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 grid">
          {status === "fulfilled" &&
            data?.map((explore: any) => (
              <Card className="w-fit items-center flex flex-col h-fit">
                <Image
                  src={nextjs}
                  alt="brand logo"
                  className="fit-content h-64 w-64 object-fit"
                />
                <div className="border w-full" />
                <div className="">
                  <CardHeader>
                    <CardTitle>{explore?.name}</CardTitle>
                    <CardDescription>
                      {explore?.headline || explore?.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="tracking-tight mb-2">Connect</p>
                    <ul className="flex gap-4">
                      {SOCIALLINKS.map(
                        (value: { logo: any; social: string }) => {
                          return (
                            <li className="border rounded-full p-1.5">
                              <Link
                                href={
                                  (value.social === "gmail"
                                    ? `mailto:${
                                        explore?.socialLinks?.[0]?.[
                                          value.social
                                        ]
                                      }`
                                    : explore?.socialLinks?.[0]?.[
                                        value.social
                                      ]) || ""
                                }
                                target="__blank"
                              >
                                <Image
                                  className="h-5 w-5 table-cell align-middle"
                                  src={value.logo}
                                  alt="social link"
                                />
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
        </div>
      )}
      {data?.length === 0 && (
        <p className="text-4xl text-white text-center">No Post Found</p>
      )}
    </div>
  );
};
export default Content;
