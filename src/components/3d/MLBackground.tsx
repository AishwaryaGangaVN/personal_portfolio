"use client";

import dynamic from "next/dynamic";
import DataStream from "./DataStream";

const NeuralNetwork = dynamic(() => import("./NeuralNetwork"), {
    ssr: false,
});

export default function MLBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Neural Network Layer */}
            <div className="absolute inset-0 opacity-20">
                <NeuralNetwork />
            </div>

            {/* Data Stream Layer */}
            <div className="absolute inset-0 opacity-30">
                <DataStream density={15} speed={0.8} />
            </div>

            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-transparent to-dark-900/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/50 via-transparent to-dark-900/50" />

            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-32 h-32 border border-primary-500/20 rounded-lg"
                        style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            animation: `float ${8 + i * 2}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
