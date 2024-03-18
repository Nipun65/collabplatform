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
import { Loader } from "lucide-react";

const Content = () => {
  const path = usePathname();
  let data: any;
  let status: any;

  const { data: session, status: sessionStatus } = useSession();
  const [deletePost, { error: deleteError }] = useDeletePostMutation();
  const [loading, setLoading] = useState(false);

  if (path === "/explore") {
    const { data: exploreData, status: exploreStatus } = useGetExplorePostQuery(
      {}
    );
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

  const [activeIndex, setActiveIndex] = useState<any>(null);
  const handleOption = async (action: string, explore: any) => {
    if (action === "edit") {
      dispatch(setFormData({ data: explore, showModal: true, action: "edit" }));
    } else if (action === "delete") {
      setShowAlert(true);
      setActiveIndex({
        _id: explore?._id,
        loggedInEmail: explore?.loggedInEmail,
      });
    }
  };

  return (
    <div className="bg-[#171717] h-[90%] overflow-auto p-4">
      {data?.length > 0 && (
        <div className="p-4 xs:place-items-center xs:grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 grid">
          {status === "fulfilled" &&
            data?.map((explore: any) => (
              <Card className="max-w-72 items-center flex flex-col h-fit break-all">
                <Image
                  src={explore?.image?.url || nextjs}
                  alt="brand logo"
                  className="fit-content h-72 w-72 object-fit rounded-t-lg"
                  width={300}
                  height={300}
                />
                <div className="border w-full" />
                <div className="w-full">
                  <CardHeader
                    className="flex justify-between"
                    style={{ flexDirection: "row", alignItems: "start" }}
                  >
                    <div>
                      <CardTitle>{explore?.name}</CardTitle>
                      <CardDescription>
                        {explore?.headline || explore?.role}
                      </CardDescription>
                      <CardDescription
                        className={`mt-3 opacity-80 overflow-auto h-16 text-wrap`}
                      >
                        {explore?.description?.length > 0
                          ? explore?.description
                          : "No description"}
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
                            (explore?.socialLinks?.[0]?.[value.social] ||
                              (value.social === "gmail" && explore?.email)) && (
                              <li className="border rounded-full p-1.5">
                                <Link
                                  href={
                                    (value.social === "gmail"
                                      ? `mailto:${explore?.email}`
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
                            )
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
            <AlertDialogCancel
              disabled={loading}
              onClick={() => {
                setShowAlert(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                const result = await deletePost({
                  _id: activeIndex._id,
                  loggedInEmail: activeIndex.loggedInEmail,
                });
                if (result) {
                  setLoading(false);
                  setShowAlert(false);
                }
              }}
              className="flex xs:gap-1 lg:gap-3 items-center justify-center"
            >
              Delete
              {loading && (
                <Loader className="xs:h-3 xs:w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Content;
