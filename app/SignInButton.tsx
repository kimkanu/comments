"use client";

import { IconLogin } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="grid h-10 w-10 place-items-center rounded-full hover:bg-sky-100 md:h-12 md:w-12"
    >
      <IconLogin className="translate-x-0.5 text-sky-500 md:h-7 md:w-7" />
    </button>
  );
}
