"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export default function Experience() {
    return (
        <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="space-y-16">
                    {/* Section Title */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Work <span className="gradient-text">Experience</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
                    </div>

                    {/* Timeline */}
                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500" />

                        {/* Experience Items */}
                        <div className="space-y-12">
                            {EXPERIENCE.map((exp, index) => (
                                <div
                                    key={exp.id}
                                    className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-primary rounded-full shadow-lg z-10" />

                                    {/* Content */}
                                    <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                        <div
                                            className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)] border border-white/5 hover:border-primary-500/20"
                                            style={{ willChange: "transform" }}
                                        >
                                            {/* Company & Role */}
                                            <div className="space-y-2 mb-4">
                                                <h3 className="text-2xl font-bold text-white flex items-center gap-3 justify-start md:justify-end">
                                                    <Briefcase className="w-6 h-6 text-primary-400" />
                                                    {exp.role}
                                                </h3>
                                                <p className="text-xl text-primary-400 font-semibold">{exp.company}</p>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="flex flex-wrap gap-4 mb-6 text-gray-400 text-sm">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {exp.period}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {exp.location}
                                                </span>
                                            </div>

                                            {/* Responsibilities */}
                                            <div className="space-y-3">
                                                {exp.responsibilities.map((resp, i) => (
                                                    <div key={i} className={`flex items-start gap-3 ${index % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}>
                                                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                                        <p className="text-gray-300 text-sm leading-relaxed">{resp}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Technologies */}
                                            <div className={`flex flex-wrap gap-2 mt-6 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                                {exp.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-dark-800/50 border border-secondary-500/30 rounded-full text-xs text-secondary-300 font-mono"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
