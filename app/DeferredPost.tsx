"use client";

import { useInView } from "@react-spring/core";
import { IconLoader2 } from "@tabler/icons-react";
import fm from "front-matter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostInteractive from "./PostInteractive";

interface PostProps {
  slug: string;
  downloadUrl: string;
}

export default function DeferredPost({ slug, downloadUrl }: PostProps) {
  const router = useRouter();
  const [ref, inView] = useInView({ once: true });

  const [data, setData] = useState<
    {
      metadata: { title: string; tags: string[]; date?: Date; icon: string };
      body: string;
    } | undefined
  >(undefined);

  useEffect(() => {
    if (inView && !data) {
      (async () => {
        const fileData = await fetch(downloadUrl).then(response => response.text());

        const { attributes, body } = fm<{ title?: string; tags?: string[]; date?: Date; icon?: string }>(fileData);
        const title = attributes.title ?? "Untitled Post";
        const tags = attributes.tags ?? [];
        const date = attributes.date;
        const icon = attributes.icon ?? "other";
        const metadata = { title, tags, date, icon };
        setData({ metadata, body });
      })();
    }
  }, [inView, data, downloadUrl]);

  return data
    ? <PostInteractive slug={slug} {...data} />
    : (
      <article
        ref={ref}
        className="flex w-full flex-col gap-3 px-4 py-3 hover:cursor-pointer hover:bg-gray-100"
        onClick={() => {
          router.push(`/posts/${slug}`);
        }}
      >
        <div className="grid h-16 place-items-center">
          <IconLoader2 className="animate-spin text-gray-400" />
        </div>
      </article>
    );
}
