import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

export const metadata = {
  title: "Create a Post - Keonwoo Kim",
  description: "Keonwoo Kim's Devlog",
  themeColor: "#bcbcc1",
  creator: "Keonwoo Kim",
  icons: "https://github.com/kimkanu.png",
};

export default async function NewLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();
  if (!session) redirect("/");

  return (
    <main className="h-full pt-12 md:flex-1 md:pt-0">
      {children}
    </main>
  );
}
