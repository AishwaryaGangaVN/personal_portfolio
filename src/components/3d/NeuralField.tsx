"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// -----------------------------------------------------------------------------
// 1. Point Shader Material (The "Neurons")
// -----------------------------------------------------------------------------
const NeuralPointMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.2, 0.6, 1.0), // Cyan
        uMouse: new THREE.Vector3(0, 0, 0),
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform vec3 uMouse;
    varying float vDistance;

    void main() {
      vec3 pos = position;
      // Gentle float
      pos.y += sin(uTime * 0.5 + pos.x) * 0.2;
      pos.x += cos(uTime * 0.3 + pos.z) * 0.2;

      // Repel
      float dist = distance(pos, uMouse);
      float radius = 5.0;
      float repelStrength = 4.0;

      if (dist < radius) {
        vec3 dir = normalize(pos - uMouse);
        float strength = (1.0 - dist / radius) * repelStrength;
        pos += dir * strength;
      }

      vDistance = dist;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Dynamic Size: Larger when close to mouse, small when far
      gl_PointSize = (150.0 / -mvPosition.z) * (1.0 + (1.0 - clamp(dist / radius, 0.0, 1.0)) * 2.0);
    }
  `,
    // Fragment Shader
    `
    uniform vec3 uColor;
    varying float vDistance;

    void main() {
      // Circular shape
      vec2 center = 2.0 * gl_PointCoord - 1.0;
      float dotCenter = dot(center, center);
      if (dotCenter > 1.0) discard;

      // Glow intensity
      float glow = 1.0 - dotCenter;
      glow = pow(glow, 1.5);

      vec3 color = uColor;
      // Active state (Red/Purple) when close to mouse
      if (vDistance < 5.0) {
         color = mix(vec3(1.0, 0.0, 0.8), uColor, vDistance / 5.0);
      }

      gl_FragColor = vec4(color * 2.0, glow);
    }
  `
);

// -----------------------------------------------------------------------------
// 2. Line Shader Material (The "Synapses")
// -----------------------------------------------------------------------------
const NeuralLineMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.2, 0.6, 1.0),
        uMouse: new THREE.Vector3(0, 0, 0),
    },
    // Vertex Shader (SAME as Points for synchronization)
    `
    uniform float uTime;
    uniform vec3 uMouse;
    varying float vDistance;

    void main() {
      vec3 pos = position;
      // Exact same math as points to keep lines attached
      pos.y += sin(uTime * 0.5 + pos.x) * 0.2;
      pos.x += cos(uTime * 0.3 + pos.z) * 0.2;

      float dist = distance(pos, uMouse);
      float radius = 5.0;
      float repelStrength = 4.0;

      if (dist < radius) {
        vec3 dir = normalize(pos - uMouse);
        float strength = (1.0 - dist / radius) * repelStrength;
        pos += dir * strength;
      }

      vDistance = dist;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    // Fragment Shader (Simple solid lines)
    `
    uniform vec3 uColor;
    varying float vDistance;

    void main() {
      vec3 color = uColor;
      float alpha = 0.2; // Base visibility
      
      // Lines light up when active
      if (vDistance < 5.0) {
         color = mix(vec3(1.0, 0.0, 0.8), uColor, vDistance / 5.0);
         alpha = 0.6; 
      }

      gl_FragColor = vec4(color, alpha);
    }
  `
);

// Register materials
extend({ NeuralPointMaterial, NeuralLineMaterial });

function NeuralMesh() {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const pointMatRef = useRef<any>(null);
    const lineMatRef = useRef<any>(null);
    const mousePos = useRef(new THREE.Vector3(9999, 9999, 0));

    // Generate Organic Geometry
    const { positions, lineIndices } = useMemo(() => {
        const count = 250; // High density
        const range = 25;
        const posArray = new Float32Array(count * 3);
        const indices = [];

        for (let i = 0; i < count; i++) {
            const r = range * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
            posArray[i * 3 + 2] = r * Math.cos(phi);
        }

        // Connect close neighbors
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = posArray[i * 3] - posArray[j * 3];
                const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
                const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];

                if (dx * dx + dy * dy + dz * dz < 20) { // Distance^2 < 20
                    indices.push(i, j);
                }
            }
        }

        return {
            positions: posArray,
            lineIndices: new Uint16Array(indices)
        };
    }, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Smoothly update mouse position
        if (pointMatRef.current) {
            pointMatRef.current.uTime = time;
            pointMatRef.current.uMouse.lerp(mousePos.current, 0.1);
        }
        if (lineMatRef.current) {
            lineMatRef.current.uTime = time;
            lineMatRef.current.uMouse.lerp(mousePos.current, 0.1);
        }
    });

    const handlePointerMove = (e: any) => {
        mousePos.current.copy(e.point);
    };



    // Handler needs to be passed down or context used, but simplest is to move logic to NeuralMesh
    // OR: Move the invisible mesh INSIDE NeuralMesh so it has access to the same ref.

    // BETTER APPROACH: Just pass the handler to the invisible mesh here if we lift state, 
    // OR create a wrapper. 
    // Let's Move the invisible plane INTO the NeuralMesh component so it can update the mousePos ref directly.

    return (
        <group>
            {/* Invisible plane to catch mouse events everywhere - INTEGRATED HERE */}
            <mesh visible={false} onPointerMove={handlePointerMove}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial />
            </mesh>

            {/* Neurons (Points) */}
            <points ref={pointsRef}>

                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                {/* @ts-ignore */}
                <neuralPointMaterial ref={pointMatRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
            </points>

            {/* Synapses (Lines) */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="index"
                        args={[lineIndices, 1]}
                    />
                </bufferGeometry>
                {/* @ts-ignore */}
                <neuralLineMaterial ref={lineMatRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
}

export default function NeuralField() {
    return (
        <Canvas
            camera={{ position: [0, 0, 18], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            frameloop="always"
        >


            <NeuralMesh />
        </Canvas>
    );
}
