'use client';

import { games } from '@/data/mockData';
import GameGrid from '@/components/GameGrid';
import type { Game } from '@/types';

export default function TopGamesPage() {
    // Sort by plays and get top games, also include those with 'top' badge
    const topGames = [...games]
        .sort((a, b) => b.plays - a.plays)
        .slice(0, 12);

    const handleGameClick = (game: Game) => {
        console.log('Game clicked:', game.title);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        🏆 Top Games
                    </h1>
                    <p className="text-text-secondary">
                        The most popular games played by millions
                    </p>
                </div>

                {/* Games Grid */}
                <GameGrid
                    title=""
                    games={topGames}
                    onGameClick={handleGameClick}
                />
            </div>
        </div>
    );
}
