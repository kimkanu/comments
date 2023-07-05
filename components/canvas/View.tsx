"use client";

import { Three } from "@/helpers/components/Three";
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from "@react-three/drei";
import { forwardRef, HTMLAttributes, PropsWithChildren, type Ref, Suspense, useImperativeHandle, useRef } from "react";
import type { ColorRepresentation } from "three";

export const Common = ({ color }: { color: ColorRepresentation }) => (
  <Suspense fallback={null}>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color="blue" />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
);

const View = forwardRef(
  <E extends HTMLDivElement, P extends PropsWithChildren<{ orbit?: boolean } & HTMLAttributes<E>>>(
    { children, orbit, ...props }: P,
    ref: Ref<E>,
  ) => {
    const localRef = useRef<E>(null!);
    useImperativeHandle(ref, () => localRef.current);

    return (
      <>
        <div ref={localRef} {...props} />
        <Three>
          <ViewImpl track={localRef}>
            {children}
            {orbit && <OrbitControls />}
          </ViewImpl>
        </Three>
      </>
    );
  },
);
View.displayName = "View";

export { View };
