import { REPOSITORY_INFO } from "@/helpers/constants";
import { octokit } from "@/lib/octokit";
import { IconLoader2 } from "@tabler/icons-react";
import { Suspense } from "react";
import DeferredPost from "./DeferredPost";
import Post from "./Post";
import PostsWrapper from "./PostsWrapper";

export default function Posts() {
  return (
    <PostsWrapper>
      <Suspense
        fallback={
          <div className="grid h-16 place-items-center">
            <IconLoader2 className="animate-spin text-gray-400" />
          </div>
        }
      >
        <Inner />
      </Suspense>
    </PostsWrapper>
  );
}

const PRELOADED_POST_COUNT = 10;

async function Inner() {
  const directoryData = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    ...REPOSITORY_INFO,
    path: "posts",
  }).then(response => response.data).then(response =>
    (Array.isArray(response) ? response : [response]) as {
      type: string;
      name: string;
      download_url: string;
    }[]
  ).catch(() => []).then(files =>
    files.filter(file => file.type === "file").sort((a, b) => b.name.localeCompare(a.name))
  );
  const preloadedPosts = directoryData.slice(0, PRELOADED_POST_COUNT);
  const deferredPosts = directoryData.slice(PRELOADED_POST_COUNT);

  return (
    <>
      {preloadedPosts.map(({ name, download_url }) => (
        <li key={name} className="border-b border-gray-200 last:border-b-0">
          <Post slug={name.replace(/\.md$/, "")} downloadUrl={download_url} />
        </li>
      ))}
      {deferredPosts.map(({ name, download_url }) => (
        <li key={name} className="border-b border-gray-200 last:border-b-0">
          <DeferredPost slug={name.replace(/\.md$/, "")} downloadUrl={download_url} />
        </li>
      ))}
    </>
  );
}
