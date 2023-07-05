"use client";

import { r3f } from "@/helpers/global";
import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
