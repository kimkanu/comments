import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

export default async function NewLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();
  if (!session) redirect("/");

  return (
    <main className="h-full pt-12 md:flex-1 md:pt-0">
      {children}
    </main>
  );
}
