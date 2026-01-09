"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import * as THREE from "three";

function FloatingCube({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
        }
    });

    return (
        <Box ref={meshRef} position={position} args={[1, 1, 1]}>
            <meshStandardMaterial
                color="#00D9FF"
                transparent
                opacity={0.6}
                wireframe
                emissive="#00D9FF"
                emissiveIntensity={0.5}
            />
        </Box>
    );
}

function NeuralNetwork() {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const mousePos = useRef(new THREE.Vector3(0, 0, 5));
    const targetMousePos = useRef(new THREE.Vector3(0, 0, 5));

    // Create particles with physics properties
    const particles = useMemo(() => {
        const count = 80;
        const particleData = [];

        for (let i = 0; i < count; i++) {
            particleData.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 12,
                    (Math.random() - 0.5) * 8
                ),
                originalPosition: new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 12,
                    (Math.random() - 0.5) * 8
                ),
                velocity: new THREE.Vector3(0, 0, 0),
                // Add autonomous drift for floating effect
                drift: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.005
                )
            });
        }

        // Set original positions
        particleData.forEach(p => {
            p.originalPosition.copy(p.position);
        });

        return particleData;
    }, []);

    // Initialize geometry
    const geometry = useMemo(() => {
        const positions = new Float32Array(particles.length * 3);
        particles.forEach((p, i) => {
            positions[i * 3] = p.position.x;
            positions[i * 3 + 1] = p.position.y;
            positions[i * 3 + 2] = p.position.z;
        });

        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geom;
    }, [particles]);

    const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    // Handle pointer events
    const handlePointerMove = (event: any) => {
        const x = event.pointer.x * 10;
        const y = event.pointer.y * 6;
        targetMousePos.current.set(x, y, 5);
    };

    const handleClick = (event: any) => {
        // Add a burst effect on click
        const clickPos = new THREE.Vector3(
            event.pointer.x * 10,
            event.pointer.y * 6,
            0
        );

        particles.forEach(p => {
            const dist = p.position.distanceTo(clickPos);
            if (dist < 4) {
                const force = p.position.clone().sub(clickPos).normalize().multiplyScalar(0.5);
                p.velocity.add(force);
            }
        });
    };

    // Animation loop
    useFrame(() => {
        if (!pointsRef.current || !linesRef.current) return;

        // Smooth mouse movement
        mousePos.current.lerp(targetMousePos.current, 0.1);

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const linePositions: number[] = [];

        // Update particle physics
        particles.forEach((particle, i) => {
            // Autonomous drift - makes particles float like in space
            particle.velocity.add(particle.drift);

            // Mouse repulsion
            const dist = particle.position.distanceTo(mousePos.current);
            if (dist < 5) {
                const repelForce = particle.position.clone()
                    .sub(mousePos.current)
                    .normalize()
                    .multiplyScalar((5 - dist) * 0.02);
                particle.velocity.add(repelForce);
            }

            // Spring back to original position (weaker to allow more drift)
            const springForce = particle.originalPosition.clone()
                .sub(particle.position)
                .multiplyScalar(0.015);
            particle.velocity.add(springForce);

            // Apply damping
            particle.velocity.multiplyScalar(0.92);

            // Update position
            particle.position.add(particle.velocity);

            // Update buffer
            positions[i * 3] = particle.position.x;
            positions[i * 3 + 1] = particle.position.y;
            positions[i * 3 + 2] = particle.position.z;

            // Create connections to nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const distance = particle.position.distanceTo(particles[j].position);
                if (distance < 3.5) {
                    linePositions.push(
                        particle.position.x, particle.position.y, particle.position.z,
                        particles[j].position.x, particles[j].position.y, particles[j].position.z
                    );
                }
            }
        });

        // Update geometries
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return (
        <group onPointerMove={handlePointerMove} onClick={handleClick}>
            <points ref={pointsRef} geometry={geometry}>
                <pointsMaterial
                    size={0.12}
                    color="#00D9FF"
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    color="#00D9FF"
                    transparent
                    opacity={0.25}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}

export default function FloatingDataCubes() {
    return (
        <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{
                powerPreference: "high-performance",
                antialias: false,
                alpha: true
            }}
            frameloop="always"
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />

            {/* Floating Cubes */}
            <FloatingCube position={[-4, 2, -2]} />
            <FloatingCube position={[0, -1, 0]} />
            <FloatingCube position={[4, 1, -1]} />

            {/* Neural Network */}
            <NeuralNetwork />
        </Canvas>
    );
}
