"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoginComp from "@/components/Login";
import collab from "@/public/logo.svg";

const Login = () => {
  const { status } = useSession();

  return (
    <div className="flex w-full h-screen">
      <div className="xs:w-full lg:w-[70%] text-center h-full flex flex-col gap-7 items-center justify-center login-bg">
        <Image
          src={collab}
          alt="collab"
          className="lg:absolute lg:top-3 lg:left-3 h-20 w-20"
        />
        <h1 className="text-[#ddd9d9] font-bold xs:text-6xl lg:text-7xl">
          Collab With Humans.
        </h1>
        <LoginComp status={status} className="xs:block lg:hidden" />
      </div>
      <div className="items-center flex justify-center xs:hidden lg:flex lg:w-[30%] ">
        <LoginComp status={status} />
      </div>
    </div>
  );
};
export default Login;
