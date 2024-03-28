"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoginComp from "@/components/Login";
import collab from "@/public/logo.svg";

const Login = () => {
  const { status } = useSession();

  return (
    <div className="flex w-full h-screen">
      <div className="xs:w-full lg:w-[70%] h-full flex flex-col gap-7 items-center justify-center login-bg relative">
        <Image
          src={collab}
          alt="collab"
          className="xs:absolute xs:top-3 xs:left-3 xs:h-16 xs:w-16 lg:h-20 lg:w-20"
        />
        <div>
          <h1 className="text-[#ddd9d9] xs:w-[25%] sm:w-fit md:w-fit absolute xs:left-6 xs:top-32 sm:left-6 font-bold xs:text-4xl md:text-5xl lg:text-7xl">
            Collab<span className="xs:visible sm:hidden">.</span> With
            <span className="xs:visible sm:hidden">.</span> Humans
            <span className="xs:visible sm:hidden">.</span>
          </h1>
          <LoginComp status={status} className="xs:block lg:hidden" />

          <div className="text-[#d0c1b3] font-bold tracking-wider absolute xs:bottom-32 md:bottom-24 lg:bottom-32 xs:right-6 lg:right-6 xs:text-xl md:text-3xl lg:text-4xl text-left opacity-90">
            <p className="xs:text-right sm:text-left">Share Your Idea</p>
            <p className="xs:ml-0 sm:ml-28">Connect With Real People</p>
          </div>
        </div>
      </div>
      <div className="items-center justify-center bg-[#DACFC480] hidden lg:flex lg:w-[30%] ">
        <LoginComp status={status} />
      </div>
    </div>
  );
};
export default Login;
