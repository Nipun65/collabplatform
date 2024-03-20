"use client";
import { useSession } from "next-auth/react";
import LoginComp from "@/components/Login";

const Login = () => {
  const { status } = useSession();

  return (
    <div className="flex w-full h-screen">
      <div className="xs:w-full lg:w-[70%] text-center h-full flex flex-col gap-7 items-center justify-center login-bg">
        <h1 className="text-[#ddd9d9] font-bold xs:text-6xl lg:text-7xl">
          Collab With Humans.
        </h1>
        <LoginComp status={status} className="xs:block lg:hidden" />
      </div>
      <div className="items-center flex justify-center xs:hidden lg:flex lg:w-[30%]">
        <LoginComp status={status} />
      </div>
    </div>
  );
};
export default Login;
