import { Variants } from "framer-motion";

// Common transition for performance
const smoothTransition = {
    duration: 0.5,
    ease: "easeOut",
} as const;

// Fade In Animation
export const fadeIn: Variants = {
    hidden: { opacity: 0, willChange: "opacity" },
    visible: {
        opacity: 1,
        transition: smoothTransition,
    },
};

// Fade In Up Animation
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40, willChange: "opacity, transform" }, // Reduced distance
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

// Fade In Down Animation
export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40, willChange: "opacity, transform" },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

// Slide In Left Animation
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50, willChange: "opacity, transform" }, // Reduced distance
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
    },
};

// Slide In Right Animation
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50, willChange: "opacity, transform" },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
    },
};

// Scale In Animation
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9, willChange: "opacity, transform" }, // Subtle scale
    visible: {
        opacity: 1,
        scale: 1,
        transition: smoothTransition,
    },
};

// Stagger Container Animation
export const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05, // Faster stagger
            delayChildren: 0.1,
        },
    },
};

// Stagger Item Animation
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20, willChange: "opacity, transform" },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

// Rotate In Animation
export const rotateIn: Variants = {
    hidden: { opacity: 0, rotate: -90, willChange: "opacity, transform" }, // Reduced rotation
    visible: {
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// Float Animation (optimized)
export const floatAnimation = {
    y: [0, -10, 0], // Reduced movement
    transition: {
        duration: 4, // Slower for less CPU usage
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// Pulse Animation
export const pulseAnimation = {
    scale: [1, 1.02, 1], // Subtle pulse
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// Glow Animation
export const glowAnimation = {
    boxShadow: [
        "0 0 10px rgba(0, 217, 255, 0.3)",
        "0 0 20px rgba(0, 217, 255, 0.5)",
        "0 0 10px rgba(0, 217, 255, 0.3)",
    ],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
    },
};
