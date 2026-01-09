"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetworkPoints() {
    const ref = useRef<THREE.Points>(null);

    // Generate neural network node positions
    const positions = useMemo(() => {
        const positions = new Float32Array(150 * 3);
        const layers = 5;
        const nodesPerLayer = 30;

        for (let i = 0; i < 150; i++) {
            const layer = Math.floor(i / nodesPerLayer);
            const nodeInLayer = i % nodesPerLayer;

            // Distribute nodes in layers
            positions[i * 3] = (layer - layers / 2) * 3; // x
            positions[i * 3 + 1] = (nodeInLayer - nodesPerLayer / 2) * 0.3; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2; // z
        }

        return positions;
    }, []);

    // Animate the network
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.05;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00D9FF"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

function ConnectionLines() {
    const ref = useRef<THREE.LineSegments>(null);

    const geometry = useMemo(() => {
        const positions = [];
        const layers = 5;
        const nodesPerLayer = 30;

        // Create connections between adjacent layers
        for (let layer = 0; layer < layers - 1; layer++) {
            for (let i = 0; i < nodesPerLayer; i++) {
                for (let j = 0; j < nodesPerLayer; j++) {
                    if (Math.random() > 0.7) { // Only connect some nodes
                        const x1 = (layer - layers / 2) * 3;
                        const y1 = (i - nodesPerLayer / 2) * 0.3;
                        const z1 = (Math.random() - 0.5) * 2;

                        const x2 = (layer + 1 - layers / 2) * 3;
                        const y2 = (j - nodesPerLayer / 2) * 0.3;
                        const z2 = (Math.random() - 0.5) * 2;

                        positions.push(x1, y1, z1, x2, y2, z2);
                    }
                }
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.05;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <lineSegments ref={ref} geometry={geometry}>
            <lineBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
        </lineSegments>
    );
}

export default function NeuralNetwork() {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <NeuralNetworkPoints />
                <ConnectionLines />
            </Canvas>
        </div>
    );
}
