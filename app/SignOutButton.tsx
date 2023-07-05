"use client";

import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="grid h-10 w-10 place-items-center rounded-full hover:bg-red-100 md:h-12 md:w-12"
    >
      <IconLogout className="translate-x-0.5 text-red-500 md:h-7 md:w-7" />
    </button>
  );
}
