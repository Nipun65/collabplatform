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
      <div className="w-[70%] h-full text-center flex items-center justify-center login-bg">
        <h1 className="text-[#ddd9d9] font-bold text-7xl">
          Collab With Humans.
        </h1>
      </div>
      <div className="items-center flex justify-center w-[30%]">
        <LoginComp status={status} />
      </div>
    </div>
  );
};
export default Login;
