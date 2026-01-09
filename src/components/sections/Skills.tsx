"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import AdvancedSkillCard from "../ui/AdvancedSkillCard";

export default function Skills() {
    return (
        <section id="skills" className="relative py-20 md:py-32 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
            <div className="relative z-10 container mx-auto px-6">
                <div className="space-y-16">
                    {/* Section Title */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Technical <span className="gradient-text">Skills</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Tap or hover over each skill to see proficiency level
                        </p>
                    </div>

                    {/* Programming & Databases */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                            Programming & Databases
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {SKILLS.programming.map((skill, index) => (
                                <AdvancedSkillCard
                                    key={skill.name}
                                    {...skill}
                                    index={index}
                                    category="programming"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Data Analysis & Visualization */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                            Data Analysis & Visualization
                        </h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            {SKILLS.dataAnalysis.map((skill, index) => (
                                <AdvancedSkillCard
                                    key={skill.name}
                                    {...skill}
                                    index={index}
                                    category="dataAnalysis"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tools & Technologies */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                            Tools & Technologies
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {SKILLS.tools.map((skill, index) => (
                                <AdvancedSkillCard
                                    key={skill.name}
                                    {...skill}
                                    index={index}
                                    category="tools"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Core Competencies */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
                            Core Competencies
                        </h3>
                        <div className="grid md:grid-cols-5 gap-6">
                            {SKILLS.core.map((skill, index) => (
                                <AdvancedSkillCard
                                    key={skill.name}
                                    {...skill}
                                    index={index}
                                    category="core"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
