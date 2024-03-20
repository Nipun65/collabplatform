"use client";

import { useEffect } from "react";
import { Provider as ReactProvider } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import store from "@/redux/store";

interface SessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  session,
}) => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!session) router.push("/login");
    else router.push(path === "/your-posts" ? path : "/explore");
  }, [session, router]);

  return (
    <ReactProvider store={store}>
      <Provider>{children}</Provider>
    </ReactProvider>
  );
};
export default SessionProvider;
