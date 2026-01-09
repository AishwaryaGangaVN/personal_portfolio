"use client";

import { motion } from "framer-motion";
import { EDUCATION, CERTIFICATIONS, ACTIVITIES } from "@/lib/constants";
import { GraduationCap, Award, Zap } from "lucide-react";

export default function Education() {
    return (
        <section id="education" className="relative py-20 md:py-32 bg-dark-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #8B5CF6 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="space-y-16">
                    {/* Section Title */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Education & <span className="gradient-text">Certifications</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
                    </div>

                    {/* Education */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <GraduationCap className="w-8 h-8 text-primary-400" />
                            Education
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {EDUCATION.map((edu, index) => (
                                <div
                                    key={index}
                                    className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:glow-primary"
                                >
                                    <div className="space-y-3">
                                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                                        <p className="text-primary-400 font-semibold">{edu.institution}</p>
                                        <p className="text-gray-400 text-sm">{edu.location}</p>
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                                            <span className="text-secondary-400 font-semibold">{edu.grade}</span>
                                            <span className="text-gray-500 text-sm">{edu.period}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Award className="w-8 h-8 text-secondary-400" />
                            Certifications
                        </h3>
                        <div className="flex overflow-x-auto pb-6 gap-6 no-scrollbar snap-x">
                            {CERTIFICATIONS.map((cert, index) => (
                                <div
                                    key={cert.id || index}
                                    className="min-w-[300px] glass-card p-6 rounded-2xl flex-shrink-0 snap-center hover:scale-[1.02] transition-all duration-300 hover:glow-primary"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-xl group-hover:scale-110 transition-transform">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                                            <div className="flex items-center justify-between">
                                                <span className="text-secondary-400 font-semibold">{cert.issuer}</span>
                                                <span className="text-gray-500 text-sm">{cert.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activities */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Zap className="w-8 h-8 text-primary-400" />
                            Activities & Achievements
                        </h3>
                        <div className="grid gap-6">
                            {ACTIVITIES.map((activity) => (
                                <div
                                    key={activity.id || activity.name}
                                    className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:glow-primary"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-xl font-bold text-white">{activity.name}</h4>
                                                <span className="text-gray-500 text-sm">{activity.year}</span>
                                            </div>
                                            <p className="text-gray-300">{activity.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
