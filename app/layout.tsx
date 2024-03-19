import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SessionProvider from "@/components/SessionProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Collab App",
  description: "Collaborate with people",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${roboto.className} h-screen`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
