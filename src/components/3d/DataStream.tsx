"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DataStreamProps {
    density?: number;
    speed?: number;
}

export default function DataStream({ density = 20, speed = 1 }: DataStreamProps) {
    const [streams, setStreams] = useState<Array<{ id: number; delay: number; left: string }>>([]);

    useEffect(() => {
        const streamArray = Array.from({ length: density }, (_, i) => ({
            id: i,
            delay: Math.random() * 5,
            left: `${Math.random() * 100}%`,
        }));
        setStreams(streamArray);
    }, [density]);

    const dataSymbols = ["01", "10", "11", "00", "λ", "Σ", "∫", "∂", "∇", "∞", "π", "α", "β", "γ"];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {streams.map((stream) => (
                <div
                    key={stream.id}
                    className="absolute top-0 h-full"
                    style={{ left: stream.left }}
                >
                    <motion.div
                        className="flex flex-col gap-4"
                        initial={{ y: "-100%" }}
                        animate={{ y: "100vh" }}
                        transition={{
                            duration: 10 / speed,
                            repeat: Infinity,
                            delay: stream.delay,
                            ease: "linear",
                        }}
                    >
                        {Array.from({ length: 20 }, (_, i) => (
                            <motion.span
                                key={i}
                                className="text-primary-400 font-mono text-sm opacity-30"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 0.6, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                            >
                                {dataSymbols[Math.floor(Math.random() * dataSymbols.length)]}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
