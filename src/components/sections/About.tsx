"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, STATS } from "@/lib/constants";
import { useEffect, useState } from "react";

function Counter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!hasAnimated) {
            setHasAnimated(true);
            let startTime: number;
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000);

                if (progress < 1) {
                    setCount(Math.floor(end * progress));
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [hasAnimated, end, duration]);

    return (
        <span className="text-5xl md:text-6xl font-bold gradient-text">
            {count}{suffix}
        </span>
    );
}

export default function About() {
    return (
        <section id="about" className="relative py-20 md:py-32 bg-dark-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #00D9FF 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="space-y-16">
                    {/* Section Title */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, index) => (
                            <div
                                key={index}
                                className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
                            >
                                <Counter end={stat.value} suffix={stat.suffix} />
                                <p className="mt-2 text-gray-400 text-sm md:text-base">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Professional Summary */}
                    <div className="max-w-4xl mx-auto">
                        <div className="glass-card p-8 md:p-12 rounded-3xl space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                Professional <span className="gradient-text">Summary</span>
                            </h3>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {PERSONAL_INFO.summary}
                            </p>

                            {/* Key Highlights */}
                            <div className="grid md:grid-cols-2 gap-4 mt-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">
                                        <span className="font-semibold text-white">IoT Expertise:</span> Automated data pipelines for smart lighting systems
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">
                                        <span className="font-semibold text-white">BI Dashboards:</span> Executive-level insights with Power BI & Looker
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">
                                        <span className="font-semibold text-white">Data Quality:</span> Systematic validation and standardization
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">
                                        <span className="font-semibold text-white">Tech Stack:</span> Python, SQL, BigQuery, Power BI
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
