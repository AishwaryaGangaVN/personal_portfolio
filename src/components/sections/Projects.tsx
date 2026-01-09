"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { Github } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
    project: typeof PROJECTS[0];
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className="group relative glass-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 border border-primary-500/10 hover:border-primary-500/30 hover:shadow-[0_0_30px_-5px_rgba(0,217,255,0.15)]"
            style={{ willChange: "transform" }}
        >
            {/* Gradient Border Effect - Optimized */}
            <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                style={{ willChange: "opacity" }}
            />

            <div className="relative p-8 space-y-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${project.color} text-white`}>
                        {project.category}
                    </span>
                    {project.githubUrl && (
                        <div className="flex gap-2">
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 glass rounded-full hover:scale-110 transition-transform hover:bg-white/10"
                                aria-label="View on GitHub"
                            >
                                <Github className="w-5 h-5 text-gray-300" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Project Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-dark-800/50 border border-primary-500/30 rounded-full text-sm text-primary-300 font-mono"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Highlights - Expandable */}
                <div className="space-y-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary-400 font-semibold hover:text-primary-300 transition-colors flex items-center gap-2"
                    >
                        {isExpanded ? "Hide" : "Show"} Key Highlights
                        <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            ▼
                        </motion.span>
                    </button>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden space-y-2"
                    >
                        {project.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                <p className="text-gray-400 text-sm">{highlight}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Hover Glow Effect - Scroll Enabled */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ willChange: "opacity" }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.5 }}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-10 blur-2xl`} />
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="relative py-20 md:py-32 bg-dark-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="space-y-16">
                    {/* Section Title */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Showcasing real-world data analysis projects with measurable impact
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {PROJECTS.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
