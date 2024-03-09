"use client";

import store from "@/redux/store";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider as ReactProvider } from "react-redux";

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
    else router.push(path ? path : "/explore");
  }, [session, router]);

  return (
    <ReactProvider store={store}>
      <Provider>{children}</Provider>
    </ReactProvider>
  );
};
export default SessionProvider;
