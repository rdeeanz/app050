'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories, getGamesByCategory } from '@/data/mockData';
import GameGrid from '@/components/GameGrid';
import type { Game } from '@/types';

// Category icons mapping
const categoryIcons: Record<string, string> = {
    all: '🎮',
    action: '💥',
    adventure: '🗺️',
    puzzle: '🧩',
    racing: '🏎️',
    sports: '⚽',
    strategy: '♟️',
    multiplayer: '👥',
    shooter: '🎯',
    rpg: '⚔️',
    simulation: '🏗️',
    horror: '👻',
};

export default function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleGameClick = (game: Game) => {
        console.log('Game clicked:', game.title);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Game Categories
                    </h1>
                    <p className="text-text-secondary">
                        Browse games by category and find your next favorite
                    </p>
                </div>

                {/* Categories Grid */}
                {!selectedCategory && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                        {categories.filter(c => c.slug !== 'all').map((category) => {
                            const gamesCount = getGamesByCategory(category.slug).length;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.slug)}
                                    className="group p-6 bg-card rounded-xl border border-white/5 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                                >
                                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                                        {categoryIcons[category.slug] || '🎮'}
                                    </div>
                                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-text-muted mt-1">
                                        {gamesCount} games
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Selected Category Games */}
                {selectedCategory && (
                    <>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="mb-6 text-primary hover:text-primary/80 font-medium flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Categories
                        </button>
                        <GameGrid
                            title={`${categoryIcons[selectedCategory] || '🎮'} ${categories.find(c => c.slug === selectedCategory)?.name || 'Games'}`}
                            games={getGamesByCategory(selectedCategory)}
                            onGameClick={handleGameClick}
                        />
                    </>
                )}

                {/* Show message if no games */}
                {selectedCategory && getGamesByCategory(selectedCategory).length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-text-secondary text-lg">
                            No games found in this category yet.
                        </p>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="mt-4 text-primary hover:text-primary/80 font-medium"
                        >
                            Browse other categories →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
