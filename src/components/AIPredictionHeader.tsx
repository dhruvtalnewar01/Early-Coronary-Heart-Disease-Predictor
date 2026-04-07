"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AIPredictionHeader() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500">
            <div
                className={`flex items-center justify-between px-8 py-4 rounded-full border transition-all duration-500 shadow-2xl ${scrolled
                        ? "bg-black/60 backdrop-blur-md border-white/10"
                        : "bg-black/20 backdrop-blur-sm border-white/5"
                    }`}
            >
                {/* Left: Logo */}
                <div className="flex flex-col">
                    <Link href="/" className="text-white font-mono text-sm tracking-[0.2em] uppercase font-semibold">
                        CHD PREDICTOR AI
                    </Link>
                    <span className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 mt-0.5">
                        Hybrid Intelligence
                    </span>
                </div>

                {/* Center: Navigation Links */}
                <nav className="hidden md:flex space-x-10">
                    {[
                        "Diagnostic Protocols",
                        "Intervention Synthesis",
                        "Hybrid AI Approach",
                        "Clinical Outcomes"
                    ].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-gray-300 font-mono text-xs tracking-widest uppercase hover:text-white hover:text-shadow-sm transition-all duration-300 relative group"
                        >
                            {item}
                            <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 opacity-0 group-hover:opacity-100" />
                        </Link>
                    ))}
                </nav>

                {/* Right: CTA Button */}
                <div>
                    <button className="relative overflow-hidden group px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                        <span className="relative z-10 font-mono text-xs text-white tracking-widest uppercase">
                            Schedule Review
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}
