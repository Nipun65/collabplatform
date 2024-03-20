"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Wrapper from "@/components/Layout";
import Loader from "@/components/ui/loader";

const Home = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  return status === "authenticated" ? (
    <Wrapper>
      <></>
    </Wrapper>
  ) : (
    <div className="flex justify-center items-center h-screen relative">
      <Loader className="h-16 w-16 text-white z-50" />
      <div className=" h-screen fixed inset-0 z-40 bg-[#171717]" />
    </div>
  );
};
export default Home;
