"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Throttle scroll events for better performance
    const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = useCallback(() => {
        if (throttleTimeout.current) return;

        throttleTimeout.current = setTimeout(() => {
            throttleTimeout.current = null;

            // Update scrolled state
            setScrolled(window.scrollY > 50);

            // Find active section
            const sections = navItems.map(item => item.href.substring(1));
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        }, 100); // Throttle to 100ms
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
        };
    }, [handleScroll]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const scrollToSection = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            // Small delay to allow menu to close animation
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            {/* Optimized Glass Background with GPU acceleration */}
            <div
                className={`absolute inset-0 border-b border-white/10 transition-all duration-300 ${isMounted && scrolled ? 'bg-dark-900/95' : 'bg-dark-900/70'} ${isMounted ? 'backdrop-blur-md' : ''}`}
                style={{
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            </div>

            <div className="relative container mx-auto px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo/Name */}
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#home");
                        }}
                        className="text-xl md:text-2xl font-bold gradient-text cursor-pointer hover:scale-105 transition-transform"
                    >
                        {PERSONAL_INFO.name.split(" ")[0]}
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeSection === item.href.substring(1)
                                    ? "text-white"
                                    : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                {activeSection === item.href.substring(1) && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full border border-primary-500/30"
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-full glass-card hover:scale-110 transition-transform z-50 relative"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6 text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6 text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden bg-dark-950/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent pointer-events-none" />

                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`text-2xl font-bold transition-all ${activeSection === item.href.substring(1)
                                    ? "gradient-text"
                                    : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
