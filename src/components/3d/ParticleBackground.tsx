"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        grab: {
                            distance: 140,
                            links: {
                                opacity: 0.5,
                            },
                        },
                    },
                },
                detectRetina: false, // Critical performance fix for high-DPI screens
                particles: {
                    number: {
                        value: 20, // Reduced from 40 for stability
                        density: {
                            enable: true,
                            area: 800,
                        },
                    },
                    color: {
                        value: ["#00D9FF", "#8B5CF6"],
                    },
                    links: {
                        color: "#00D9FF",
                        distance: 100,
                        enable: true,
                        opacity: 0.2, // Reduced opacity
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 0.6, // Slowed down
                        straight: false,
                    },
                    opacity: {
                        value: 0.3, // Reduced opacity
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 2 }, // Smaller particles
                    },
                },
            }}
            className="absolute inset-0 z-0"
        />
    );
}
