import {
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandReact,
  IconGlobe,
  IconQuestionMark,
  IconWorld,
  type TablerIconsProps,
} from "@tabler/icons-react";

export const REPOSITORY_INFO = {
  owner: "kimkanu",
  repo: "til",
};

type IconStyle = {
  className: string;
  icon: (props: TablerIconsProps) => JSX.Element;
};
export const ICON_STYLES: { [key: string]: IconStyle | undefined } & { other: IconStyle } = {
  other: {
    className: "bg-blue-500 text-white",
    icon: IconQuestionMark,
  },
  react: {
    className: "bg-white text-[#087ea4]",
    icon: IconBrandReact,
  },
  nextjs: {
    className: "bg-black text-white",
    icon: IconBrandNextjs,
  },
  web: {
    className: "bg-gray-500 text-white",
    icon: IconWorld,
  },
  javascript: {
    className: "bg-[#f7df1e] text-black",
    icon: IconBrandJavascript,
  },
};

export const MARKDOWN_CLASSNAMES = `
  [&_h1]:font-extrabold [&_h1]:text-3xl [&_h1]:py-2 lg:[&_h1]:text-4xl
  [&_h2]:font-extrabold [&_h2]:text-[25px] [&_h2]:py-1.5 lg:[&_h2]:text-3xl
  [&_h3]:font-extrabold [&_h3]:text-[22px] [&_h3]:py-1 lg:[&_h3]:text-2xl
  [&_h4]:font-extrabold [&_h4]:text-xl [&_h4]:py-0.5
  [&_h5]:font-extrabold [&_h5]:text-lg [&_h5]:py-0.5
  [&_h6]:font-extrabold
  [&_a]:text-sky-500 [&_a]:px-0.5 [&_a]:rounded [&_a:hover]:bg-sky-100 [&_a:active]:bg-sky-100
  [&_ol]:list-decimal [&_ul]:list-disc [&_ul]:pl-4
  [&_ol_ol]:list-[lower-latin] [&_ul_ol]:list-[lower-latin]
  [&_ul_ul]:list-[circle] [&_ol_ul]:list-[circle]
  [&_p_code]:px-0.5 [&_p_code]:rounded [&_p_code]:bg-gray-100
  [&_code]:tracking-tight [&_code]:text-sm
`;
