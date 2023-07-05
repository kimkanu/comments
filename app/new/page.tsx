"use client";

import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import type VditorImpl from "vditor";
import { createPost } from "./actions";
import Vditor from "./Vditor";

export default function PostLayout() {
  const vditor = useRef<VditorImpl | undefined>();
  const [isSaving, startTransition] = useTransition();

  const router = useRouter();

  return (
    <>
      <Vditor vditor={vditor} />
      <button
        className={`absolute bottom-0 right-0 grid h-12 w-12 place-items-center rounded-full ${
          isSaving ? "pointer-events-none" : ""
        }`}
        onClick={() =>
          startTransition(() => {
            const body = vditor.current?.getValue();
            if (!body) return;

            createPost({ body }).then((slug) => {
              vditor.current?.setValue("");
              router.replace(`/posts/${slug}`);
            });
          })}
      >
        {isSaving
          ? <IconLoader2 className="h-7 w-7 animate-spin text-gray-400" />
          : <IconCheck className="h-7 w-7 text-sky-500" />}
      </button>
    </>
  );
}
