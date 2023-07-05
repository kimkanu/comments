"use server";

import { env } from "@/env";
import { REPOSITORY_INFO } from "@/helpers/constants";
import { octokit } from "@/lib/octokit";
import { getServerSession } from "next-auth/next";
import { Configuration, OpenAIApi } from "openai-edge";

const apiConfig = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

async function generateMetadata(body: string) {
  const prompt = `Here are the guidelines for this prompt:

1. Generate a title which fits the most to the post provided below.
2. Generate some tags (up to 5) as well.
3. Pick an icon of the post from the following list: react, nextjs, web, javascript, solidjs, nodejs, deno, typescript, other.
4. Put title, tags, and category into a valid JSON.

Example output:
\`\`\`json
{"title": "My Post", "tags": ["tag-a", "tag-b", "tag-c"], "icon": "other"}
\`\`\`

The post is as follows:
\`\`\`markdown
${body}
\`\`\`
`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [{
      role: "user",
      content: prompt,
    }],
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  }).then(response => response.json()) as { choices: { message: { role: string; content: string } }[] };
  const content = response.choices.at(0)?.message.content;

  if (!content) return { title: "Untitled", tags: [], icon: "other" };

  try {
    const json = JSON.parse(content.replace(/^.*?(\{.*\}).*?$/, "$1")) as {
      title: string;
      tags: string[];
      icon: string;
    };
    return json;
  } catch {
    const title = content.match(/title(.*)(\n|tags)/i)?.[1]?.replace(/^[^a-zA-Z0-9]+/, "").replace(
      /[^a-zA-Z0-9]+$/,
      "",
    ) ?? "Untitled";
    const icon = content.match(/icon(.*)(\n|$)/i)?.[1]?.replace(/^[^a-zA-Z0-9]+/, "").replace(/[^a-zA-Z0-9]+$/, "")
      ?? "other";
    const tags = content.match(/tags((.|\n)*)icon/i)?.[1]?.split("\n").map(x =>
      x.replace(/^[^a-zA-Z0-9]+/, "").replace(/[^a-zA-Z0-9]+$/, "")
    ).filter(x =>
      x
    ) ?? [];
    return { title, tags, icon };
  }
}

function getTimeString() {
  return new Date().toISOString().slice(2, -5).replace(/\D/g, "");
}

function toKebabCase(string: string) {
  return string
    .replace(/[^a-zA-Z0-9_\-\s]/g, "")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export async function createPost({ body }: { body: string }) {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized.");

  const { title, tags, icon } = await generateMetadata(body);
  const timeString = getTimeString();
  const slug = `${timeString}-${toKebabCase(title)}`;

  const content = `---
title: ${title}
tags:
${tags.map(tag => `    - ${tag}`).join("\n")}
date: ${new Date().toISOString()}
icon: ${icon}
---

${body}
`;

  const encoded = Buffer.from(content, "utf8").toString("base64");

  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    ...REPOSITORY_INFO,
    path: `posts/${slug}.md`,
    message: `Add posts/${slug}.md`,
    committer: {
      name: "Keonwoo Kim",
      email: "main@kanu.kim",
    },
    content: encoded,
  });

  return slug;
}
