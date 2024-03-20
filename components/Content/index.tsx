"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "@/redux/hooks";
import {
  useDeletePostMutation,
  useGetExplorePostQuery,
  useGetYourPostQuery,
} from "@/redux/api";
import { setFormData } from "@/redux/PostSlice";
import { Loader as ReactLoader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { SOCIALLINKS } from "@/utils/constants.utils";
import { Post, SocialLinks } from "@/interfaces";
import dots from "@/public/dots.svg";

const Content = () => {
  let data: Post[] = [];
  let status: QueryStatus = QueryStatus.uninitialized;

  const path = usePathname();
  const { data: session, status: sessionStatus } = useSession();
  const [deletePost, { error: deleteError }] = useDeletePostMutation();
  const [loading, setLoading] = useState(false);
  const { data: exploreData, status: exploreStatus } = useGetExplorePostQuery(
    {}
  );
  const { data: yourPosts, status: yourPostStatus } = useGetYourPostQuery(
    session?.user?.email || ""
  );
  if (path === "/explore") {
    data = exploreData;
    status = exploreStatus;
  } else if (path === "/your-posts") {
    data = yourPosts;
    status = yourPostStatus;
  }

  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const [activeIndex, setActiveIndex] = useState<{
    _id: string;
    loggedInEmail: string;
  }>({ _id: "", loggedInEmail: "" });
  const handleOption = async (action: string, explore: Post) => {
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

  // const [columnCount, setColumnCount] = useState(1);
  // const [columns, setColumns] = useState([]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const screenWidth = window.innerWidth;
  //     if (screenWidth < 640) {
  //       setColumnCount(2);
  //     } else if (screenWidth < 1024) {
  //       setColumnCount(3);
  //     } else {
  //       setColumnCount(4);
  //     }
  //   };

  //   handleResize(); // Set initial column count
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // useEffect(() => {
  //   const generateColumns = () => {
  //     const newColumns: any = [];
  //     if (data) {
  //       for (let i = 0; i < columnCount; i++) {
  //         const numCards = Math.ceil(data?.length / columnCount); // Random number of cards from 1 to 3
  //         const cards = [];
  //         // console.log(numCards);

  //         for (let j = 0; j < numCards; j++) {
  //           console.log(numCards * i + j);
  //           cards.push(
  //             <Card
  //               key={`${i}-${j}`}
  //               className="max-w-72 items-center border-0 flex flex-col h-fit break-all rounded-2xl"
  //             >
  //               <Image
  //                 src={data[numCards * i + j]?.image?.url || nextjs}
  //                 alt="brand logo"
  //                 className="fit-content h-72 w-72 rounded-t-2xl"
  //                 width={300}
  //                 height={300}
  //               />
  //               <div className="border w-full border-[#f5f5f5]" />
  //               <div className="w-full">
  //                 <CardHeader className="flex flex-col p-3">
  //                   <div className="flex justify-between">
  //                     <div>
  //                       <CardTitle>{data[numCards * i + j]?.name}</CardTitle>
  //                       <CardDescription>
  //                         {data[numCards * i + j]?.headline ||
  //                           data[numCards * i + j]?.role}
  //                       </CardDescription>
  //                     </div>
  //                     {session?.user?.email ===
  //                       data[numCards * i + j]?.loggedInEmail && (
  //                       <DropdownMenu>
  //                         <DropdownMenuTrigger asChild>
  //                           <Button
  //                             variant="outline"
  //                             className="rounded-full p-2 h-8 w-8"
  //                           >
  //                             <Image src={dots} alt="more option" />
  //                           </Button>
  //                         </DropdownMenuTrigger>
  //                         <DropdownMenuContent className="w-32">
  //                           <DropdownMenuCheckboxItem
  //                             onClick={() =>
  //                               handleOption("edit", data[numCards * i + j])
  //                             }
  //                           >
  //                             Edit
  //                           </DropdownMenuCheckboxItem>
  //                           <DropdownMenuCheckboxItem
  //                             onClick={() =>
  //                               handleOption("delete", data[numCards * i + j])
  //                             }
  //                           >
  //                             Delete
  //                           </DropdownMenuCheckboxItem>
  //                         </DropdownMenuContent>
  //                       </DropdownMenu>
  //                     )}
  //                   </div>
  //                   <div>
  //                     <CardDescription
  //                       className={`mt-3 opacity-80 overflow-auto h-fit max-h-16 text-wrap`}
  //                     >
  //                       {data[numCards * i + j]?.description?.length > 0
  //                         ? data[numCards * i + j]?.description
  //                         : "No description"}
  //                     </CardDescription>
  //                   </div>
  //                 </CardHeader>
  //                 <CardContent className="p-3 pt-0">
  //                   <p className="tracking-tight mb-2">Connect</p>
  //                   <ul className="flex gap-4">
  //                     {SOCIALLINKS.map(
  //                       (value: { logo: any; social: string }) => {
  //                         return (
  //                           (data[numCards * i + j]?.socialLinks?.[0]?.[
  //                             value.social
  //                           ] ||
  //                             (value.social === "gmail" &&
  //                               data[numCards * i + j]?.email)) && (
  //                             <li className="border rounded-full p-1.5">
  //                               <Link
  //                                 href={
  //                                   (value.social === "gmail"
  //                                     ? `mailto:${
  //                                         data[numCards * i + j]?.email
  //                                       }`
  //                                     : data[numCards * i + j]
  //                                         ?.socialLinks?.[0]?.[value.social]) ||
  //                                   ""
  //                                 }
  //                                 target="__blank"
  //                               >
  //                                 <Image
  //                                   className="h-5 w-5 table-cell align-middle"
  //                                   src={value.logo}
  //                                   alt="social link"
  //                                 />
  //                               </Link>
  //                             </li>
  //                           )
  //                         );
  //                       }
  //                     )}
  //                   </ul>
  //                 </CardContent>
  //               </div>
  //             </Card>
  //           );
  //         }

  //         newColumns.push(
  //           <div key={i} className="flex flex-col gap-2">
  //             {cards}
  //           </div>
  //         );
  //       }
  //       setColumns(newColumns);
  //     }
  //   };

  //   generateColumns();
  // }, [data, columnCount]);

  return (
    <div className="bg-[#111812] h-[90%] overflow-auto p-4">
      {data?.length > 0 && (
        <div className="p-4 xs:place-items-center sm:place-items-start xs:grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 grid">
          {/* {status === "fulfilled" && columns} */}
          {status === "fulfilled" &&
            data?.map((explore: Post) => (
              <Card
                className="max-w-72 items-center border-0 flex flex-col h-fit break-all break-words rounded-2xl flex-grow-0 basis-150"
                key={explore?._id}
              >
                <Image
                  src={explore?.image?.url}
                  alt="brand logo"
                  className="fit-content h-72 w-72 rounded-t-2xl"
                  width={300}
                  height={300}
                  priority
                />
                <div className="border w-full border-[#f5f5f5]" />
                <div className="w-full">
                  <CardHeader className="flex flex-col p-3">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{explore?.name}</CardTitle>
                        <CardDescription>{explore?.headline}</CardDescription>
                      </div>
                      {session?.user?.email === explore?.loggedInEmail && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="rounded-full p-2 h-8 w-8"
                            >
                              <Image src={dots} alt="more option" />
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
                    </div>
                    <div>
                      <CardDescription
                        className={`mt-3 opacity-80 overflow-auto h-fit max-h-16 text-wrap`}
                      >
                        {explore?.description?.length > 0
                          ? explore?.description
                          : "No description"}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="tracking-tight mb-2">Connect</p>
                    <ul className="flex gap-4">
                      {SOCIALLINKS.map(
                        (value: { logo: string; social: string }) => {
                          return (
                            (explore?.socialLinks?.[0]?.[
                              value.social as keyof SocialLinks
                            ] ||
                              (value.social === "gmail" && explore?.email)) && (
                              <li
                                className="border rounded-full p-1.5"
                                key={value.social}
                              >
                                <Link
                                  href={
                                    (value.social === "gmail"
                                      ? `mailto:${explore?.email}`
                                      : explore?.socialLinks?.[0]?.[
                                          value.social as keyof SocialLinks
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

      {!data && (
        <div className="flex justify-center items-center h-full relative">
          <Loader className="h-16 w-16 text-white z-50" />
        </div>
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
              {loading && (
                <ReactLoader className="xs:h-3 xs:w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Content;
