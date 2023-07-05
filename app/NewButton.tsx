"use client";

import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewButton() {
  const pathname = usePathname();

  return pathname !== "/new"
    ? (
      <Link href="/new">
        <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-sky-100 md:h-12 md:w-12">
          <IconPencil className="text-sky-500 md:h-7 md:w-7" />
        </button>
      </Link>
    )
    : (
      <button disabled className="grid h-10 w-10 place-items-center rounded-full md:h-12 md:w-12">
        <IconPencil className="text-gray-400 md:h-7 md:w-7" />
      </button>
    );
}
