import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BlackHole } from './BlackHole';

interface PageBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export function PageBackground({ color1, color2, color3 }: PageBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <BlackHole color1={color1} color2={color2} color3={color3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
