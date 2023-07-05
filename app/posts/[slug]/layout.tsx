import { IconLoader2 } from "@tabler/icons-react";
import { type PropsWithChildren, Suspense } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return (
    <main className="overflow-y-auto pt-12 md:flex-1 md:pt-0">
      <Suspense
        fallback={
          <div className="grid h-16 place-items-center">
            <IconLoader2 className="animate-spin text-gray-400" />
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
