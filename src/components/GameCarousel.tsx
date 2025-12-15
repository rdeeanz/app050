'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import GameCard from './GameCard';
import type { Game } from '@/types';

interface GameCarouselProps {
    title: string;
    games: Game[];
    viewAllLink?: string;
    onGameClick?: (game: Game) => void;
}

export default function GameCarousel({
    title,
    games,
    viewAllLink,
    onGameClick
}: GameCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    {title}
                </h2>
                <div className="flex items-center gap-3">
                    {viewAllLink && (
                        <Link
                            href={viewAllLink}
                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors hidden sm:block"
                        >
                            View All →
                        </Link>
                    )}
                    {/* Navigation Arrows - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full bg-surface border border-white/10 transition-all ${canScrollLeft
                                    ? 'hover:bg-card hover:border-primary text-foreground'
                                    : 'opacity-50 cursor-not-allowed text-text-muted'
                                }`}
                            aria-label="Scroll left"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-2 rounded-full bg-surface border border-white/10 transition-all ${canScrollRight
                                    ? 'hover:bg-card hover:border-primary text-foreground'
                                    : 'opacity-50 cursor-not-allowed text-text-muted'
                                }`}
                            aria-label="Scroll right"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Left Gradient Fade */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth px-4 sm:px-0 pb-4 snap-x snap-mandatory"
                >
                    {games.map((game, index) => (
                        <div
                            key={game.id}
                            className="flex-none w-[280px] sm:w-[300px] snap-start"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <GameCard game={game} onClick={onGameClick} />
                        </div>
                    ))}
                </div>

                {/* Right Gradient Fade */}
                <div
                    className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            </div>

            {/* Mobile View All Link */}
            {viewAllLink && (
                <div className="mt-4 text-center sm:hidden">
                    <Link
                        href={viewAllLink}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        View All →
                    </Link>
                </div>
            )}
        </section>
    );
}
