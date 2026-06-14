'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type SceneVariant =
  | 'torusknot'
  | 'wireSphere'
  | 'octahedron'
  | 'bars'
  | 'twinBoxes'
  | 'icosahedron'
  | 'organicParticles'
  | 'torus'
  | 'nodeGraph'
  | 'multiChain'
  | 'dataPipeline'
  | 'alertNetwork'
  | 'neuralCloud';

// ── TorusKnot — Web3 / blockchain complexity
function TorusKnotScene({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.35;
    ref.current.rotation.y += dt * 0.55;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.7, 0.22, 100, 16, 2, 3]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

// ── WireSphere + points — KYC / biometric data
function WireSphereScene({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const pts = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 80; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      arr.push(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
    }
    return new Float32Array(arr);
  }, []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.4;
    groupRef.current.rotation.x += dt * 0.15;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.85, 16, 12]} />
        <meshStandardMaterial color={color} wireframe opacity={0.25} transparent />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pts, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.06} sizeAttenuation />
      </points>
    </group>
  );
}

// ── Octahedron — auth / security gem
function OctahedronScene({ color }: { color: string }) {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    const s = solidRef.current;
    const w = wireRef.current;
    if (!s || !w) return;
    s.rotation.y += dt * 0.6;
    s.rotation.x += dt * 0.3;
    w.rotation.y = s.rotation.y;
    w.rotation.x = s.rotation.x;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
    s.scale.setScalar(pulse);
    w.scale.setScalar(pulse * 1.05);
  });
  return (
    <>
      <mesh ref={solidRef}>
        <octahedronGeometry args={[0.75]} />
        <meshStandardMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh ref={wireRef}>
        <octahedronGeometry args={[0.75]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </>
  );
}

// ── Bars — analytics / tiering
function BarsScene({ color }: { color: string }) {
  const heights = [0.9, 1.4, 0.6, 1.1, 0.8];
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const t = state.clock.elapsedTime;
      m.scale.y = 1 + Math.sin(t * 1.2 + i * 0.8) * 0.12;
    });
  });
  return (
    <group position={[0, -0.3, 0]}>
      {heights.map((h, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={[(i - 2) * 0.42, h / 2, 0]}
        >
          <cylinderGeometry args={[0.12, 0.12, h, 8]} />
          <meshStandardMaterial color={color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

// ── TwinBoxes — migration (two systems)
function TwinBoxesScene({ color }: { color: string }) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const ptsRef = useRef<THREE.Points>(null);

  const pts = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 40; i++) {
      arr.push(
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.3
      );
    }
    return new Float32Array(arr);
  }, []);

  useFrame((_, dt) => {
    if (leftRef.current) leftRef.current.rotation.y += dt * 0.5;
    if (rightRef.current) rightRef.current.rotation.y -= dt * 0.5;
    if (ptsRef.current) ptsRef.current.rotation.y += dt * 0.2;
  });

  return (
    <>
      <mesh ref={leftRef} position={[-0.7, 0, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <mesh ref={rightRef} position={[0.7, 0, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <points ref={ptsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pts, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.05} sizeAttenuation />
      </points>
    </>
  );
}

// ── Icosahedron — incident / alerting
function IcosahedronScene({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.5;
    ref.current.rotation.z += dt * 0.3;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.85, 0]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

// ── OrganicParticles — nature / Angkat Tani
function OrganicParticlesScene({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const pts = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 120; i++) {
      arr.push(
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 1.2
      );
    }
    return new Float32Array(arr);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.18;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.07} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

// ── Torus — simple ring, experience accent
function TorusScene({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.5;
    ref.current.rotation.y += dt * 0.3;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.65, 0.22, 16, 40]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

// ── NodeGraph — network / TechConnect
function NodeGraphScene({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodePos, linePos } = useMemo(() => {
    const nodes = Array.from({ length: 8 }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 2.2,
      (Math.random() - 0.5) * 1.6,
      (Math.random() - 0.5) * 0.6
    ));
    const lines: number[] = [];
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return;
        if (a.distanceTo(b) < 1.4) {
          lines.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      });
    });
    const nodePts = new Float32Array(nodes.flatMap((n) => [n.x, n.y, n.z]));
    return { nodePos: nodePts, linePos: new Float32Array(lines) };
  }, []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.3;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePos, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.12} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

// ── MultiChain — nested torus rings at different angles = 4 blockchain orbits
function MultiChainScene({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  const rings = [
    { rx: 0,    ry: 0,   rz: 0,   speed: 1.2,  r: 1.0,  tube: 0.05 },
    { rx: 1.2,  ry: 0.4, rz: 0,   speed: -1.0, r: 0.75, tube: 0.05 },
    { rx: 0.5,  ry: 1.0, rz: 0.8, speed: 1.5,  r: 0.52, tube: 0.04 },
    { rx: -0.8, ry: 0.2, rz: 1.2, speed: -1.3, r: 0.3,  tube: 0.035 },
  ];

  useFrame((state, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.5;
    ringRefs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.z += dt * rings[i].speed;
      // subtle scale pulse per ring
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5 + i * 1.2) * 0.06;
      m.scale.setScalar(s);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Glowing core */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
      </mesh>
      {rings.map((ring, i) => (
        <mesh key={i} ref={(el) => { ringRefs.current[i] = el; }} rotation={[ring.rx, ring.ry, ring.rz]}>
          <torusGeometry args={[ring.r, ring.tube, 16, 60]} />
          <meshStandardMaterial color={color} transparent opacity={0.85 - i * 0.1} emissive={color} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ── DataPipeline — particles streaming inward to a glowing core = async event pipeline
function DataPipelineScene({ color }: { color: string }) {
  const COUNT = 100;
  const posRef = useRef<THREE.BufferAttribute>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const { positions, velocities, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.4 + Math.random() * 0.8;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      spd[i] = 0.008 + Math.random() * 0.012;
      vel[i * 3]     = -pos[i * 3]     * spd[i];
      vel[i * 3 + 1] = -pos[i * 3 + 1] * spd[i];
      vel[i * 3 + 2] = -pos[i * 3 + 2] * spd[i];
    }
    return { positions: pos, velocities: vel, speeds: spd };
  }, []);

  useFrame((state) => {
    const attr = posRef.current;
    if (!attr) return;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      const dx = arr[i * 3], dy = arr[i * 3 + 1], dz = arr[i * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < 0.06) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.4 + Math.random() * 0.8;
        arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
        velocities[i * 3]     = -arr[i * 3]     * speeds[i];
        velocities[i * 3 + 1] = -arr[i * 3 + 1] * speeds[i];
        velocities[i * 3 + 2] = -arr[i * 3 + 2] * speeds[i];
      }
    }
    attr.needsUpdate = true;
    if (coreRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
      coreRef.current.scale.setScalar(s);
    }
  });

  return (
    <>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute ref={posRef} attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.09} sizeAttenuation transparent opacity={0.9} />
      </points>
    </>
  );
}

// ── AlertNetwork — pulsing nodes with wave propagation = incident routing & escalation
function AlertNetworkScene({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const { nodes, linePos } = useMemo(() => {
    const pts = [
      new THREE.Vector3(0,     0,    0),
      new THREE.Vector3(-0.85, 0.65, 0.1),
      new THREE.Vector3( 0.85, 0.65,-0.1),
      new THREE.Vector3(-0.7, -0.8,  0.2),
      new THREE.Vector3( 0.7, -0.8, -0.2),
      new THREE.Vector3( 0,    1.0,  0),
      new THREE.Vector3(-0.95,-0.1,  0.3),
      new THREE.Vector3( 0.95,-0.1, -0.3),
    ];
    const edges = [[0,1],[0,2],[0,3],[0,4],[0,6],[0,7],[1,5],[2,5],[1,3],[2,4],[6,3],[7,4]];
    const lines: number[] = [];
    edges.forEach(([a, b]) => {
      lines.push(pts[a].x, pts[a].y, pts[a].z, pts[b].x, pts[b].y, pts[b].z);
    });
    return { nodes: pts, linePos: new Float32Array(lines) };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.6;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
    }
    const t = state.clock.elapsedTime;
    nodeRefs.current.forEach((m, i) => {
      if (!m) return;
      // wave emanates from center node (i=0) outward
      const dist = i === 0 ? 0 : 1;
      const phase = t * 3.5 - dist * 1.8 + i * 0.5;
      const pulse = 1 + Math.sin(phase) * (i === 0 ? 0.4 : 0.3);
      m.scale.setScalar(pulse);
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity =
        i === 0 ? 2 + Math.sin(phase) * 1.5 : 0.8 + Math.sin(phase) * 0.6;
    });
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>
      {nodes.map((pos, i) => (
        <mesh key={i} ref={(el) => { nodeRefs.current[i] = el; }} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.18 : 0.1, 10, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={i === 0 ? 2 : 0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ── NeuralCloud — layered neural network with signal propagation = cloud/ML
function NeuralCloudScene({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const { allNodes, layerGroups, linePos } = useMemo(() => {
    const layers = [3, 5, 5, 4, 3];
    const spacing = 0.5;
    const layerX = [-1.1, -0.55, 0, 0.55, 1.1];
    const nodes: THREE.Vector3[] = [];
    const groups: THREE.Vector3[][] = [];

    layers.forEach((count, li) => {
      const group: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * spacing;
        const z = (Math.random() - 0.5) * 0.25;
        const v = new THREE.Vector3(layerX[li], y, z);
        group.push(v);
        nodes.push(v);
      }
      groups.push(group);
    });

    const lines: number[] = [];
    for (let l = 0; l < groups.length - 1; l++) {
      groups[l].forEach((a) => {
        groups[l + 1].forEach((b) => {
          lines.push(a.x, a.y, a.z, b.x, b.y, b.z);
        });
      });
    }

    return { allNodes: nodes, layerGroups: groups, linePos: new Float32Array(lines) };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.6;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.15;
    }
    const t = state.clock.elapsedTime;
    // signal wave sweeps left → right through layers
    let nodeIdx = 0;
    layerGroups.forEach((group, li) => {
      group.forEach((_, ni) => {
        const m = nodeRefs.current[nodeIdx++];
        if (!m) return;
        const phase = t * 2.5 - li * 0.7 + ni * 0.3;
        const pulse = 1 + Math.sin(phase) * 0.35;
        m.scale.setScalar(pulse);
        (m.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.6 + Math.sin(phase) * 0.8;
      });
    });
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </lineSegments>
      {allNodes.map((pos, i) => (
        <mesh key={i} ref={(el) => { nodeRefs.current[i] = el; }} position={pos}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

const SCENE_MAP: Record<SceneVariant, (color: string) => React.ReactNode> = {
  torusknot: (c) => <TorusKnotScene color={c} />,
  wireSphere: (c) => <WireSphereScene color={c} />,
  octahedron: (c) => <OctahedronScene color={c} />,
  bars: (c) => <BarsScene color={c} />,
  twinBoxes: (c) => <TwinBoxesScene color={c} />,
  icosahedron: (c) => <IcosahedronScene color={c} />,
  organicParticles: (c) => <OrganicParticlesScene color={c} />,
  torus: (c) => <TorusScene color={c} />,
  nodeGraph: (c) => <NodeGraphScene color={c} />,
  multiChain: (c) => <MultiChainScene color={c} />,
  dataPipeline: (c) => <DataPipelineScene color={c} />,
  alertNetwork: (c) => <AlertNetworkScene color={c} />,
  neuralCloud: (c) => <NeuralCloudScene color={c} />,
};

interface MiniSceneProps {
  variant: SceneVariant;
  color?: string;
  className?: string;
}

const EXP_VARIANTS: SceneVariant[] = ['multiChain', 'dataPipeline', 'alertNetwork', 'neuralCloud'];

export default function MiniScene({ variant, color = '#00d4ff', className }: MiniSceneProps) {
  const isExpScene = EXP_VARIANTS.includes(variant);
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, isExpScene ? 3.8 : 3.2], fov: isExpScene ? 55 : 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.5} />
        <pointLight position={[-3, -2, 2]} intensity={0.4} color={color} />
        {SCENE_MAP[variant](color)}
      </Canvas>
    </div>
  );
}
