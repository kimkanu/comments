import { REPOSITORY_INFO } from "@/helpers/constants";
import { octokit } from "@/lib/octokit";
import { IconLoader2 } from "@tabler/icons-react";
import fm from "front-matter";
import { decode } from "js-base64";
import type { Metadata } from "next/types";
import { type PropsWithChildren, Suspense } from "react";

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const fileData = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    ...REPOSITORY_INFO,
    path: `posts/${slug}.md`,
  }).then(response => response.data as { content: string; encoding: "base64" }).catch(() => null);

  if (!fileData) {
    return {
      title: "Not Found - Keonwoo Kim",
    };
  }

  const content = decode(fileData.content);
  const { attributes } = fm<{ title?: string; tags?: string[]; date?: Date; icon?: string }>(content);
  const title = attributes.title ?? "Untitled Post";
  const tags = attributes.tags ?? [];

  return {
    title: `${title} - Keonwoo Kim`,
    keywords: tags,
    themeColor: "#bcbcc1",
    creator: "Keonwoo Kim",
    icons: "https://github.com/kimkanu.png",
  };
}

export default function PostLayout({ children }: PropsWithChildren) {
  return (
    <main className="overflow-y-auto pt-12 md:flex-1 md:pt-0">
      <Suspense
        fallback={
          <div className="grid h-16 place-items-center">
            <IconLoader2 className="animate-spin text-gray-400" />
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
