'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/figure.glb';
useGLTF.preload(MODEL_URL);

function Figure({ spin, modelColor }: { spin: number; modelColor: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, group);

  // Recolor the mannequin to a clean brand tone (once).
  useEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if ((mesh as THREE.SkinnedMesh).isSkinnedMesh || mesh.isMesh) {
        mesh.castShadow = false;
        mesh.material = new THREE.MeshStandardMaterial({ color: modelColor, metalness: 0.15, roughness: 0.55 });
      }
    });
  }, [scene, modelColor]);

  // Play the idle animation.
  useEffect(() => {
    const name = names.find((n) => /idle/i.test(n)) ?? names[0];
    const action = name ? actions[name] : undefined;
    action?.reset().fadeIn(0.4).play();
    return () => { action?.fadeOut(0.2); };
  }, [actions, names]);

  // Smoothly ease rotation toward the scroll-driven target.
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (spin - group.current.rotation.y) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function Model3D({ spin, accent }: { spin: number; accent: [number, number, number] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#FFF6E6" />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#BFE3D2" />
      <pointLight position={[-2.5, 1.5, 2.5]} intensity={18} color={new THREE.Color(accent[0], accent[1], accent[2])} />
      <Suspense fallback={null}>
        <Figure spin={spin} modelColor={0xEDE6D6} />
      </Suspense>
    </Canvas>
  );
}
