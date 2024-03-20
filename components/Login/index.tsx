"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import google from "@/public/google.svg";

interface LoginCompProps {
  status: string;
  className?: string;
}
const LoginComp: React.FC<LoginCompProps> = ({ status, className }) => {
  const router = useRouter();
  return (
    <>
      <div className={twMerge("rounded h-fit", className)}>
        <Button
          className={`font-lg xs:px-6 xs:py-3 md:px-12 md:py-7 font-bold text-white flex gap-3 ${
            status === "unauthenticated" ? "shine-btn border" : ""
          }`}
          onClick={() =>
            signIn("google").then(async (result) => {
              if (result) router.push("/explore");
            })
          }
          disabled={status === "loading"}
        >
          {status === "unauthenticated" || !status ? (
            <Image src={google} alt="google" className="h-7 w-7" />
          ) : (
            <Loader className="h-7 w-7" />
          )}
          Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default LoginComp;
