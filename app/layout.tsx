import { getServerSession } from "next-auth/next";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import NewButton from "./NewButton";
import Posts from "./Posts";

import "@/app/global.css";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

export const metadata = {
  title: "Keonwoo Kim",
  description: "Keonwoo Kim's Devlog",
  themeColor: "#bcbcc1",
  creator: "Keonwoo Kim",
  icons: "https://github.com/kimkanu.png",
};
export const revalidate = 10 * 60;
export const fetchCache = "force-cache";

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return (
    <html lang="en" className="h-full antialiased">
      <head />
      <body className="mx-auto h-full w-full max-w-6xl overflow-auto md:relative md:flex md:overflow-visible">
        <header className="fixed left-0 top-0 z-10 flex h-12 w-full items-center justify-between bg-white/75 px-2 backdrop-blur md:relative md:h-full md:w-16 md:flex-col md:justify-start md:gap-3 md:border-r md:border-gray-200 md:bg-white md:px-0 md:py-2 md:backdrop-blur-none">
          <Link href="/">
            <button className="h-10 w-10 rounded-full p-1 hover:bg-gray-200 md:h-12 md:w-12">
              <img alt="profile" className="mix-blend-multiply" src="https://github.com/kimkanu.png?size=80" />
            </button>
          </Link>

          {session
            ? (
              <>
                <NewButton />
                <SignOutButton />
              </>
            )
            : (
              <Link href="/">
                <SignInButton />
              </Link>
            )}
        </header>
        <Posts />
        {children}
      </body>
    </html>
  );
}
