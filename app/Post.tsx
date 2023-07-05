import fm from "front-matter";
import PostInteractive from "./PostInteractive";

interface PostProps {
  slug: string;
  downloadUrl: string;
}

export default async function Post({ slug, downloadUrl }: PostProps) {
  const fileData = await fetch(downloadUrl).then(response => response.text());

  const { attributes, body } = fm<{ title?: string; tags?: string[]; date?: Date; icon?: string }>(fileData);
  const title = attributes.title ?? "Untitled Post";
  const tags = attributes.tags ?? [];
  const date = attributes.date;
  const icon = attributes.icon ?? "other";
  const metadata = { title, tags, date, icon };

  return <PostInteractive slug={slug} metadata={metadata} body={body} />;
}
