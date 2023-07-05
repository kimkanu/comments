import { REPOSITORY_INFO } from "@/helpers/constants";
import { octokit } from "@/lib/octokit";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const data = await request.formData();
  const fileOrFiles = data.get("file[]") as File | File[] | null | undefined;
  const files: File[] = !fileOrFiles ? [] : Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];

  const response = (await Promise.all(
    files.map(async file => {
      const ext = file.name.split(".").at(-1) || file.name;
      const filename = `${nanoid(8)}.${ext}`;
      const content = Buffer.from(await file.arrayBuffer()).toString("base64");

      return await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        ...REPOSITORY_INFO,
        path: `images/${filename}`,
        message: `Add images/${filename}`,
        committer: {
          name: "Keonwoo Kim",
          email: "main@kanu.kim",
        },
        content,
      }).then(() => [file.name, filename]).catch(() => null);
    }),
  )).filter((x): x is [string, string] => !!x);

  return NextResponse.json({
    status: "success",
    data: {
      succMap: Object.fromEntries(response.map(([original, filename]) => [
        original,
        `https://raw.githubusercontent.com/${REPOSITORY_INFO.owner}/${REPOSITORY_INFO.repo}/main/images/${filename}`,
      ])),
    },
  });
}
