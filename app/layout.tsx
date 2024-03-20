import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Collab Platform",
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
