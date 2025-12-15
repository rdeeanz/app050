'use client';

import { games } from '@/data/mockData';
import GameGrid from '@/components/GameGrid';
import type { Game } from '@/types';

export default function NewGamesPage() {
    const newGames = games.filter(g => g.badges.some(b => b.type === 'new'));

    const handleGameClick = (game: Game) => {
        console.log('Game clicked:', game.title);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        ✨ New Games
                    </h1>
                    <p className="text-text-secondary">
                        Check out the latest games added to our collection
                    </p>
                </div>

                {/* Games Grid */}
                <GameGrid
                    title=""
                    games={newGames}
                    onGameClick={handleGameClick}
                />

                {newGames.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-text-secondary text-lg">
                            No new games at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
