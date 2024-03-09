"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Wrapper from "@/components/Layout";

const Home = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  return status === "authenticated" ? (
    <Wrapper>
      <></>
    </Wrapper>
  ) : (
    <>loading</>
  );
};
export default Home;
