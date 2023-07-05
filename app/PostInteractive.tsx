"use client";

import SyntaxHighlighter from "@/helpers/components/SyntaxHighlighter";
import { ICON_STYLES, MARKDOWN_CLASSNAMES } from "@/helpers/constants";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DateTime = dynamic(() => import("@/components/dom/DateTime"), {
  loading: () => <>-</>,
  ssr: false,
});

interface PostInteractiveProps {
  slug: string;
  metadata: { title: string; tags: string[]; date?: Date; icon: string };
  body: string;
}

export default function PostInteractive(
  { slug, metadata: { title, tags, date, icon }, body }: PostInteractiveProps,
) {
  const router = useRouter();
  const iconStyle = ICON_STYLES[icon] ?? ICON_STYLES.other;

  return (
    <article
      className="relative flex w-full flex-col gap-3 px-4 py-3 hover:cursor-pointer hover:bg-gray-100"
      onClick={() => {
        router.push(`/posts/${slug}`);
      }}
    >
      <section className="flex w-full gap-4">
        <section
          role="img"
          aria-label={icon}
          className={`h-10 w-10 shrink-0 rounded-full p-1 ${iconStyle.className}`}
        >
          <iconStyle.icon size={32} />
        </section>
        <section className="flex min-w-0 flex-1 flex-col">
          <h1 className="truncate text-base font-bold leading-6">{title}</h1>
          <p className="truncate text-sm leading-4 text-sky-500">
            {date && (
              <span className="text-gray-500">
                <DateTime date={date} />
                {tags.length > 0 && " · "}
              </span>
            )}
            {tags.map(tag => (
              <Fragment key={tag}>
                <a className="rounded hover:bg-sky-100 active:bg-sky-100">#{tag}</a>
                {" "}
              </Fragment>
            ))}
          </p>
        </section>
      </section>
      <section className="pointer-events-none max-h-64 overflow-hidden py-3 gradient-mask-b-80">
        <ReactMarkdown
          className={MARKDOWN_CLASSNAMES}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match
                ? (
                  <SyntaxHighlighter
                    language={match[1]}
                  >
                    {children}
                  </SyntaxHighlighter>
                )
                : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
            },
          }}
        >
          {body}
        </ReactMarkdown>
      </section>
    </article>
  );
}
