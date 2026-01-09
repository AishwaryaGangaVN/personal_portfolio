"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (can be integrated with email service)
        console.log("Form submitted:", formData);
    };

    return (
        <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-secondary-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="space-y-16">
                    {/* Section Title */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Get In <span className="gradient-text">Touch</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full" />
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Let's discuss how data-driven insights can transform your business
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                            {/* Email */}
                            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)] border border-white/5 hover:border-primary-500/20 group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                                        <p className="text-gray-300">{PERSONAL_INFO.email}</p>
                                        <button
                                            onClick={handleCopyEmail}
                                            className="mt-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                                        >
                                            {copied ? "✓ Copied!" : "Click to copy"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)] border border-white/5 hover:border-primary-500/20 group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-white mb-1">Phone</h4>
                                        <a href={`tel:${PERSONAL_INFO.phone}`} className="text-gray-300 hover:text-primary-400 transition-colors">
                                            {PERSONAL_INFO.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)] border border-white/5 hover:border-primary-500/20 group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                                        <p className="text-gray-300">{PERSONAL_INFO.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                <a
                                    href={SOCIAL_LINKS.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)] border border-white/5 hover:border-primary-500/20 flex items-center justify-center gap-3"
                                >
                                    <Linkedin className="w-6 h-6 text-primary-400" />
                                    <span className="text-white font-semibold">LinkedIn</span>
                                </a>
                                <a
                                    href={SOCIAL_LINKS.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)] border border-white/5 hover:border-primary-500/20 flex items-center justify-center gap-3"
                                >
                                    <Github className="w-6 h-6 text-primary-400" />
                                    <span className="text-white font-semibold">GitHub</span>
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-dark-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-dark-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-dark-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.2)] transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 container mx-auto px-6 mt-20 pt-10 border-t border-gray-800">
                <div className="text-center text-gray-400">
                    <p>© 2025 {PERSONAL_INFO.name}. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}
