import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useSpring } from '@react-spring/three';

export function StarField({ count = 5000 }) {
  const points = useRef();
  
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 1.5 });

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={points}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#60A5FA"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function FloatingOrbs() {
  const orbs = useRef([]);
  const [springs] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 2, tension: 170, friction: 26 },
  }));

  useFrame((state) => {
    orbs.current.forEach((orb, i) => {
      if (orb) {
        orb.position.y = Math.sin(state.clock.elapsedTime + i) * 0.1;
        orb.rotation.x = state.clock.elapsedTime * 0.2;
        orb.rotation.y = state.clock.elapsedTime * 0.1;
      }
    });
  });

  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (orbs.current[i] = el)}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.8,
            0,
            Math.sin((i / 5) * Math.PI * 2) * 0.8,
          ]}
          scale={[0.1, 0.1, 0.1]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}