"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import Loader from "../Loader";
import google from "@/public/google.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LoginCompProps {
  status: string;
}
const LoginComp: React.FC<LoginCompProps> = ({ status }) => {
  const router = useRouter();
  return (
    <div className="rounded border h-fit">
      <Button
        className="font-lg px-6 py-2 font-bold text-white flex gap-3"
        onClick={() =>
          signIn("google").then(async (result) => {
            console.log(result);
            if (result) router.push("/explore");
          })
        }
        disabled={status !== "unauthenticated"}
      >
        {status === "unauthenticated" ? (
          <Image src={google} alt="google" className="h-7 w-7" />
        ) : (
          <Loader className="h-7 w-7" />
        )}
        Sign in with Goolge
      </Button>
    </div>
  );
};

export default LoginComp;
