"use client";

import { REPOSITORY_INFO } from "@/helpers/constants";
import React from "react";

export default function Utterances() {
  return (
    <section
      className="px-3 lg:px-7"
      ref={(elem) => {
        if (!elem) return;
        if (document.querySelector(".utterances")) return;

        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.setAttribute("repo", `${REPOSITORY_INFO.owner}/${REPOSITORY_INFO.repo}`);
        scriptElem.setAttribute("issue-term", "pathname");
        scriptElem.setAttribute("theme", "github-light");
        scriptElem.setAttribute("label", "utterances");
        scriptElem.crossOrigin = "anonymous";
        elem.appendChild(scriptElem);
      }}
    />
  );
}
