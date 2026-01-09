"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { fadeIn, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import dynamic from "next/dynamic";
import { useMemo, useEffect, useState, useRef } from "react";

const FloatingDataCubes = dynamic(() => import("../3d/FloatingDataCubes"), {
    ssr: false,
});

export default function Hero() {
    const [isVisible, setIsVisible] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    // Intersection Observer not strictly needed for tsparticles but good for performance
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);
    // Generate stable particle positions for the profile hover effect
    const [particlePositions, setParticlePositions] = useState<{ top: string; left: string }[]>([]);

    useEffect(() => {
        setParticlePositions(
            Array.from({ length: 6 }, (_, i) => ({
                top: `${(i * 17 + 5) % 100}%`,
                left: `${(i * 23 + 10) % 100}%`,
            }))
        );
    }, []);

    return (
        <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
            {/* Restored FloatingDataCubes Background */}
            {isVisible && (
                <div className="absolute inset-0 z-0">
                    <FloatingDataCubes />
                </div>
            )}

            {/* Gradient Overlay - pointer-events-none to let clicks reach particles if needed, though tsparticles usually handles its own canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-950 z-10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 py-10 pt-16 md:pt-24 h-screen flex flex-col justify-center">
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-5">
                    {/* Profile Image */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Animated Gradient Border */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 p-1 blur-sm"
                            animate={{
                                rotate: 360,
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                            }}
                        />

                        {/* Glassmorphic Container */}
                        <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-1 glow-primary z-10">
                            <div className="w-full h-full rounded-full glass-dark overflow-hidden border-2 border-white/10 relative">
                                <motion.div
                                    className="w-full h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <img
                                        src="/profile.png"
                                        alt={PERSONAL_INFO.name}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Particles on Hover - Fixed positions */}
                        <motion.div
                            className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={false}
                        >
                            {particlePositions.map((pos, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-primary-400 rounded-full"
                                    style={pos}
                                    animate={{
                                        y: [-10, -30],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold"
                    >
                        <span className="gradient-text animate-shimmer bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-[length:200%_auto]">
                            {PERSONAL_INFO.name}
                        </span>
                    </motion.h1>

                    {/* Title with Typewriter Effect */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {PERSONAL_INFO.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 font-light">
                            {PERSONAL_INFO.tagline}
                        </p>
                    </motion.div>

                    {/* Summary */}
                    <motion.p
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                        className="max-w-3xl text-lg text-gray-400 leading-relaxed"
                    >
                        {PERSONAL_INFO.summary}
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.8 }}
                        className="flex gap-4"
                    >
                        <a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-4 rounded-full hover:scale-110 hover:glow-primary transition-all duration-300"
                        >
                            <Linkedin className="w-6 h-6 text-primary-400" />
                        </a>
                        <a
                            href={SOCIAL_LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-4 rounded-full hover:scale-110 hover:glow-primary transition-all duration-300"
                        >
                            <Github className="w-6 h-6 text-primary-400" />
                        </a>
                        <a
                            href={SOCIAL_LINKS.email}
                            className="glass-card p-4 rounded-full hover:scale-110 hover:glow-primary transition-all duration-300 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(SOCIAL_LINKS.email, '_self');
                            }}
                        >
                            <Mail className="w-6 h-6 text-primary-400" />
                        </a>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <a
                            href="#projects"
                            className="px-6 py-2 md:py-3 bg-gradient-primary text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 glow-primary"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-2 md:py-3 glass-card text-white font-semibold rounded-full hover:scale-105 hover:glow-primary transition-all duration-300"
                        >
                            Get In Touch
                        </a>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-2 cursor-pointer"
                            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            <span className="text-gray-400 text-sm hidden md:block">Scroll Down</span>
                            <ChevronDown className="w-6 h-6 text-primary-400" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
