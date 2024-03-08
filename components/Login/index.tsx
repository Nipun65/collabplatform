"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

interface LoginCompProps {
  status: string;
}
const LoginComp: React.FC<LoginCompProps> = ({ status }) => {
  return (
    <div className="rounded border h-fit">
      <Button
        className="font-lg px-6 py-2 font-bold text-white"
        onClick={() =>
          signIn("google").then((result) => {
            console.log(result);
          })
        }
      >
        {status === "unauthenticated" ? (
          "Sign in with Goolge"
        ) : (
          <span>loading...</span>
        )}
      </Button>
    </div>
  );
};

export default LoginComp;
