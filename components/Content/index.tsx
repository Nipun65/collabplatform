"use client";
import {
  useDeletePostMutation,
  useGetExplorePostQuery,
  useGetYourPostQuery,
} from "@/redux/api";
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
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import dots from "@/public/dots.svg";
import { setFormData } from "@/redux/PostSlice";
import { useAppDispatch } from "@/redux/hooks";

const Content = () => {
  const path = usePathname();
  let data: any;
  let status: any;

  const { data: session, status: sessionStatus } = useSession();
  const [deletePost, { error: deleteError }] = useDeletePostMutation();

  if (path === "/explore") {
    const { data: exploreData, status: exploreStatus } =
      useGetExplorePostQuery("");
    data = exploreData;
    status = exploreStatus;
  } else if (path === "/your-posts") {
    const { data: yourPosts, status: yourPostStatus } = useGetYourPostQuery(
      session?.user?.email || ""
    );
    data = yourPosts;
    status = yourPostStatus;
  }

  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useAppDispatch();

  const [activeIndex, setActiveIndex] = useState(null);
  const handleOption = async (action: string, explore: any) => {
    if (action === "edit") {
      dispatch(setFormData({ data: explore, showModal: true }));
    } else if (action === "delete") {
      setShowAlert(true);
      setActiveIndex(explore?._id);
    }
  };

  return (
    <div className="bg-[#171717] h-[90%] overflow-auto p-4">
      {data?.length > 0 && (
        <div className="p-4 xs:place-items-center xs:grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 grid">
          {status === "fulfilled" &&
            data?.map((explore: any) => (
              <Card className="w-fit items-center flex flex-col h-fit">
                <Image
                  src={explore?.image?.url || nextjs}
                  alt="brand logo"
                  className="fit-content h-64 w-64 object-fit"
                  width={256}
                  height={256}
                />
                <div className="border w-full" />
                <div className="">
                  <CardHeader
                    className="flex justify-between"
                    style={{ flexDirection: "row", alignItems: "start" }}
                  >
                    <div>
                      <CardTitle>{explore?.name}</CardTitle>
                      <CardDescription>
                        {explore?.headline || explore?.role}
                      </CardDescription>
                      <CardDescription className="mt-2 opacity-80 overflow-auto h-16">
                        {explore?.description}
                      </CardDescription>
                    </div>
                    {session?.user?.email === explore?.loggedInEmail && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="rounded-full p-2 h-8 w-8"
                          >
                            <Image src={dots} alt="more option" className="" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                          <DropdownMenuCheckboxItem
                            onClick={() => handleOption("edit", explore)}
                          >
                            Edit
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            onClick={() => handleOption("delete", explore)}
                          >
                            Delete
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            Are you sure? you want to delete this post?
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const result = await deletePost({ _id: activeIndex });
                setShowAlert(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Content;
