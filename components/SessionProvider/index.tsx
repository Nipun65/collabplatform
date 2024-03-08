"use client";

import store from "@/redux/store";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider as ReactProvider } from "react-redux";

interface SessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
  // Component: any;
  // pageProps: any;
}

const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  session,
  // Component,
  // pageProps,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/login");
    else router.push("/explore");
  }, [session, router]);

  return (
    <ReactProvider store={store}>
      <Provider>{children}</Provider>
    </ReactProvider>
  );
  // return (
  //   <Provider
  //     session={pageProps?.session}
  //     basePath="/"
  //     refetchInterval={5 * 60}
  //     refetchOnWindowFocus={true}
  //   >
  //     <Component {...pageProps} />
  //   </Provider>
  // );
};
export default SessionProvider;
