import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

/**
 * The ONE genuine WebGL element on the whole site. Procedural geometry only
 * (icosahedron + distort material) — no imported .glb, no load time, near-
 * free on the GPU. This component is default-exported so the parent can
 * `React.lazy()` it and keep it out of the initial bundle entirely.
 */
function DistortedBlob() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
  });

  return (
    <mesh ref={meshRef} scale={2.1}>
      <icosahedronGeometry args={[1, 8]} />
      <MeshDistortMaterial
        color="#FF5A5F"
        distort={0.42}
        speed={1.6}
        roughness={0.15}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 3, 4]} intensity={1.1} color="#0057FF" />
      <DistortedBlob />
      <Environment preset="city" />
    </Canvas>
  );
}
