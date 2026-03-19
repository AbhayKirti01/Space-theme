import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.y += delta * 0.075;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff88"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Planet({ planet }: { planet: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float 
      speed={planet.speed * 2} 
      rotationIntensity={1.5} 
      floatIntensity={2}
      position={planet.pos as [number, number, number]}
    >
      <mesh 
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial 
          color={planet.color} 
          roughness={0.7} 
          metalness={0.2}
          emissive={planet.color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
        />
        {hovered && (
          <Html distanceFactor={10} position={[0, planet.size * 1.5, 0]}>
            <div className="bg-black/80 backdrop-blur-md border border-primary/20 px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap">
              <span className="text-primary font-display text-sm font-bold tracking-wider uppercase">
                {planet.name}
              </span>
            </div>
          </Html>
        )}
      </mesh>
      {planet.hasRings && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[planet.size * 1.4, planet.size * 2.2, 64]} />
          <meshStandardMaterial 
            color={planet.color} 
            transparent 
            opacity={0.4} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      )}
    </Float>
  );
}

function Planets() {
  const planets = [
    { name: 'Mercury', size: 0.15, color: '#A5A5A5', pos: [-4, 2, -5], speed: 1.5 },
    { name: 'Venus', size: 0.3, color: '#E3BB76', pos: [3, 3, -6], speed: 1.2 },
    { name: 'Earth', size: 0.32, color: '#2271B3', pos: [-2, -3, -4], speed: 1 },
    { name: 'Mars', size: 0.2, color: '#E27B58', pos: [5, -2, -5], speed: 1.4 },
    { name: 'Jupiter', size: 0.8, color: '#D39C7E', pos: [-6, -1, -8], speed: 0.8 },
    { name: 'Saturn', size: 0.7, color: '#C5AB6E', pos: [4, 1, -10], speed: 0.7, hasRings: true },
    { name: 'Uranus', size: 0.45, color: '#BBE1E4', pos: [-3, 4, -12], speed: 0.6 },
    { name: 'Neptune', size: 0.43, color: '#6081FF', pos: [2, -4, -15], speed: 0.5 },
    { name: 'Pluto', size: 0.1, color: '#D3B699', pos: [6, 4, -18], speed: 0.4 },
  ];

  return (
    <group>
      {planets.map((planet, i) => (
        <Planet key={i} planet={planet} />
      ))}
    </group>
  );
}

function Lightning() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const [flashPos, setFlashPos] = useState<[number, number, number]>([0, 0, 0]);
  const lastFlashTime = useRef(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cycle = Math.floor(time / 20);
    
    // Trigger new flash position every 20s
    if (cycle > lastFlashTime.current) {
      lastFlashTime.current = cycle;
      setFlashPos([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        -5
      ]);
    }

    const timeInCycle = time % 20;
    if (timeInCycle < 0.4) {
      // Create a realistic lightning flicker
      const flicker = Math.sin(time * 100) > 0.5 ? 1 : 0;
      const fadeOut = 1 - (timeInCycle / 0.4);
      lightRef.current.intensity = flicker * 20 * fadeOut;
    } else {
      lightRef.current.intensity = 0;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={flashPos}
      color="#e0f0ff"
      distance={100}
      decay={2}
    />
  );
}

export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-bg">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ccff" />
        <Particles />
        <Planets />
        <Lightning />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/20 to-bg pointer-events-none" />
    </div>
  );
};
