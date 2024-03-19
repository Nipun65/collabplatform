"use client";
import LoginComp from "@/components/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/explore");
  }, [session, router]);
  return (
    <div className="flex w-full h-screen">
      <div className="xs:w-full md:w-[70%] text-center h-full flex flex-col gap-7 items-center justify-center login-bg">
        <h1 className="text-[#ddd9d9] font-bold xs:text-6xl lg:text-7xl">
          Collab With Humans.
        </h1>
        <LoginComp status={status} className="xs:block md:hidden" />
      </div>
      <div className="items-center flex justify-center xs:hidden md:flex md:w-[30%]">
        <LoginComp status={status} />
      </div>
    </div>
  );
};
export default Login;
