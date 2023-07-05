"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function PostsWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <aside id="posts" className={pathname === "/" ? "contents" : "hidden md:contents"}>
      <ol className="flex flex-col border-gray-200 pt-12 md:h-full md:min-h-0 md:w-[22rem] md:overflow-y-auto md:border-r md:pt-0">
        {children}
      </ol>
    </aside>
  );
}
