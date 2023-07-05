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
        setHeaders() {
          return {
            Authorization: "89d4c9637f13033",
          };
        },
        error(msg) {
          alert(msg);
        },
      },
    });
  }, [vditor]);

  return <div id="vditor" className="vditor !h-full !w-full !flex-col-reverse" />;
}
