'use client';

import { useEffect, useState } from 'react';
import { PlayIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface HeroSectionProps {
    backgroundImage?: string;
}

export default function HeroSection({ backgroundImage }: HeroSectionProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Dynamic AI-inspired background - would integrate with Genkit in production
    const defaultBackground = 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop';
    const bgImage = backgroundImage || defaultBackground;

    return (
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80"></div>
            </div>

            {/* Animated Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-accent/20 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className={`relative z-10 max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <SparklesIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Powered by AI</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="text-foreground">Play </span>
                    <span className="bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent">
                        Free Games
                    </span>
                    <br />
                    <span className="text-foreground">Instantly</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                    Discover thousands of browser-based games. No downloads, no installs –
                    just pure gaming joy. Jump in and start playing now!
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="btn-primary flex items-center gap-2 text-lg animate-pulse-glow">
                        <PlayIcon className="w-6 h-6" />
                        Play Now
                    </button>
                    <button className="px-6 py-3 rounded-lg border border-white/20 text-foreground font-semibold hover:bg-white/10 transition-all">
                        Explore Games
                    </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-primary font-heading">5000+</div>
                        <div className="text-sm text-text-secondary">Free Games</div>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-secondary font-heading">10M+</div>
                        <div className="text-sm text-text-secondary">Monthly Players</div>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-accent font-heading">100%</div>
                        <div className="text-sm text-text-secondary">Free to Play</div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
}
