"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";

interface AdvancedSkillCardProps {
    name: string;
    level: number;
    icon: string;
    index: number;
    category: "programming" | "dataAnalysis" | "tools" | "core";
}

const categoryColors = {
    programming: {
        from: "from-blue-500",
        to: "to-cyan-500",
        border: "border-blue-500/20",
    },
    dataAnalysis: {
        from: "from-purple-500",
        to: "to-pink-500",
        border: "border-purple-500/20",
    },
    tools: {
        from: "from-green-500",
        to: "to-emerald-500",
        border: "border-green-500/20",
    },
    core: {
        from: "from-orange-500",
        to: "to-red-500",
        border: "border-orange-500/20",
    },
};

export default function AdvancedSkillCard({
    name,
    level,
    icon,
    index,
    category,
}: AdvancedSkillCardProps) {
    const [isActive, setIsActive] = useState(false);
    const colors = categoryColors[category];

    // Get the icon component from lucide-react
    const IconComponent = (Icons as any)[icon] || Icons.Code2;

    // Calculate circular progress
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (level / 100) * circumference;

    const handleInteraction = () => {
        setIsActive(!isActive);
    };

    // Use useInView to trigger animation when the card enters the viewport
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    useEffect(() => {
        if (isInView) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [isInView]);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={handleInteraction}
            className="relative group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
            {/* Subtle Glow Effect */}
            <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.from} ${colors.to} blur-xl transition-opacity duration-300 ${isActive ? 'opacity-10' : 'opacity-0'
                    }`}
            />

            {/* Card Container */}
            <div className={`relative glass-card p-6 rounded-2xl border border-primary-500/10 hover:border-primary-500/30 overflow-hidden transition-all duration-300 h-full flex flex-col items-center justify-center min-h-[200px] hover:shadow-[0_0_30px_-5px_rgba(0,217,255,0.15)]`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                    {/* Circular Progress Ring */}
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="6"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{
                                    strokeDashoffset: isActive ? strokeDashoffset : circumference,
                                }}
                                style={{ willChange: "stroke-dashoffset" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00D9FF" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Icon in Center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                            </motion.div>
                        </div>
                    </div>

                    {/* Skill Name */}
                    <h4 className="text-base font-semibold text-white text-center leading-tight">{name}</h4>

                    {/* Level Indicator - Always visible on mobile, hover on desktop */}
                    <div
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${colors.from} ${colors.to} text-white text-xs font-bold transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 md:opacity-0'
                            } md:group-hover:opacity-100`}
                        style={{ willChange: "opacity" }}
                    >
                        {level}% Proficiency
                    </div>

                    {/* Mobile: Show proficiency always */}
                    <div className="md:hidden">
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colors.from} ${colors.to} text-white text-xs font-bold`}>
                            {level}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
