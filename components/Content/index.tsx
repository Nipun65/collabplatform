"use client";
import { useGetExplorePostQuery, useGetYourPostQuery } from "@/redux/api";
import Image from "next/image";
import nextjs from "@/public/next.svg";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SOCIALLINKS } from "@/utils/constants.utis";

const Content = () => {
  const { data, status } = useGetExplorePostQuery("");
  const { data: yourPosts, status: yourPostStatus } =
    useGetYourPostQuery("ffsa@gmail.com");
  console.log(data, status);

  console.log("fsafsa", yourPosts);
  return (
    <div className="p-4 bg-[#171717] h-[90%] overflow-auto sm:place-items-center sm:grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 grid">
      {status === "fulfilled" &&
        data?.map((explore: any) => (
          <Card className="w-fit items-center flex flex-col h-fit">
            <Image
              src={nextjs}
              alt="brand logo"
              className="fit-content p-3 h-64 w-64 object-fit"
            />
            <div className="border" />
            <div className="">
              <CardHeader>
                <CardTitle>{explore.name}</CardTitle>
                <CardDescription>{explore.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="tracking-tight mb-2">Connect</p>
                <ul className="flex gap-4">
                  {SOCIALLINKS.map((value: { logo: any; social: string }) => {
                    return (
                      <li className="border rounded-full p-1.5">
                        <Link
                          href={
                            (value.social === "gmail"
                              ? `mailto:${
                                  explore?.socialLinks?.[0]?.[value.social]
                                }`
                              : explore?.socialLinks?.[0]?.[value.social]) || ""
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
                  })}
                </ul>
              </CardContent>
            </div>
          </Card>
        ))}
    </div>
  );
};
export default Content;
