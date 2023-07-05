"use client";

import type { PropsWithChildren } from "react";
import { Prism } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SyntaxHighlighter({ language, children, ...props }: PropsWithChildren<{
  language: string;
}>) {
  return (
    <Prism
      {...props}
      style={dracula}
      language={language}
      PreTag="div"
    >
      {String(children).replace(/\n$/, "")}
    </Prism>
  );
}
