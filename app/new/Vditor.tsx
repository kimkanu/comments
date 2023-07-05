"use client";

import { type MutableRefObject, useEffect } from "react";
import VditorImpl from "vditor";
import "./Vditor.css";

export default function Vditor({ vditor }: {
  vditor: MutableRefObject<VditorImpl | undefined>;
}) {
  useEffect(() => {
    const v = new VditorImpl("vditor", {
      placeholder: "What did you learn today?",
      toolbar: ["upload"],
      after: () => {
        vditor.current = v;
        VditorImpl.setCodeTheme("dracula");
      },
      upload: {
        url: `${window.location.origin}/api/images`,
        accept: "image/*",
        success(_, msg) {
          const vditor = v.vditor;
          const editorElement = vditor[vditor.currentMode]!.element;
          editorElement.focus();
          const response = JSON.parse(msg);

          let succFileText = "";
          Object.keys(response.data.succMap).forEach((filename) => {
            const path = response.data.succMap[filename];
            const lastIndex = filename.lastIndexOf(".");
            const type = filename.slice(lastIndex).toLowerCase();
            if (type.indexOf(".wav") === 0 || type.indexOf(".mp3") === 0 || type.indexOf(".ogg") === 0) {
              succFileText += `<audio controls="controls" src="${path}"></audio>\n`;
            } else if (
              type.indexOf(".apng") === 0
              || type.indexOf(".bmp") === 0
              || type.indexOf(".gif") === 0
              || type.indexOf(".ico") === 0 || type.indexOf(".cur") === 0
              || type.indexOf(".jpg") === 0 || type.indexOf(".jpeg") === 0 || type.indexOf(".jfif") === 0
              || type.indexOf(".pjp") === 0 || type.indexOf(".pjpeg") === 0
              || type.indexOf(".png") === 0
              || type.indexOf(".svg") === 0
              || type.indexOf(".webp") === 0
            ) {
              const code =
                `<img alt="${filename}" src="${path}" style="margin-left: auto; margin-right: auto; width: 100%;">\n`;
              succFileText += code.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            } else {
              succFileText += `[${filename}](${path})\n`;
            }
          });

          const selection = window.getSelection()!;
          selection.removeAllRanges();
          selection.addRange(vditor.upload!.range);
          document.execCommand("insertHTML", false, succFileText);
          vditor.upload!.range = getSelection()!.getRangeAt(0).cloneRange();
        },
      },
    });
  }, [vditor]);

  return <div id="vditor" className="vditor !h-full !w-full !flex-col-reverse" />;
}
