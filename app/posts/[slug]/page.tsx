import SyntaxHighlighter from "@/helpers/components/SyntaxHighlighter";
import { ICON_STYLES, MARKDOWN_CLASSNAMES, REPOSITORY_INFO } from "@/helpers/constants";
import { octokit } from "@/lib/octokit";
import { IconLoader2 } from "@tabler/icons-react";
import fm from "front-matter";
import { decode } from "js-base64";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const DateTime = dynamic(() => import("@/components/dom/DateTime"), {
  loading: () => <>-</>,
  ssr: false,
});
const Utterances = dynamic(() => import("./Utterances"), {
  loading: () => (
    <section className="grid h-72 place-items-center">
      <IconLoader2 className="animate-spin text-gray-400" />
    </section>
  ),
  ssr: false,
});
export const revalidate = 60;
export const fetchCache = "force-cache";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const fileData = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    ...REPOSITORY_INFO,
    path: `posts/${slug}.md`,
  }).then(response => response.data as { content: string; encoding: "base64" }).catch(() => null);

  if (!fileData) {
    return (
      <section className="pointer-events-none grid h-full place-items-center">
        <img alt="" aria-hidden className="w-1/6 opacity-20 mix-blend-multiply" src="https://github.com/kimkanu.png" />
      </section>
    );
  }

  const content = decode(fileData.content);
  const { attributes, body } = fm<{ title?: string; tags?: string[]; date?: Date; icon?: string }>(content);
  const title = attributes.title ?? "Untitled Post";
  const tags = attributes.tags ?? [];
  const date = attributes.date;
  const icon = attributes.icon ?? "other";
  const iconStyle = ICON_STYLES[icon] ?? ICON_STYLES.other;

  return (
    <>
      <section className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 lg:px-8 lg:py-6">
        <h1 className="text-3xl font-extrabold lg:text-4xl">{title}</h1>
        <section className="flex gap-4">
          <section
            role="img"
            aria-label={icon}
            className={`h-6 w-6 shrink-0 rounded-full p-0.5 lg:h-8 lg:w-8 lg:p-1 ${iconStyle.className}`}
          >
            <iconStyle.icon className="h-full w-full" />
          </section>
          <section className="py-0.5 text-sm leading-5 text-sky-500 lg:py-1 lg:text-base lg:leading-6">
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
          </section>
        </section>
        <section className="md:mt-4">
          <ReactMarkdown
            className={MARKDOWN_CLASSNAMES}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
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
      </section>
      <Utterances />
    </>
  );
}
