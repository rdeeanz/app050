'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import { games } from '@/data/mockData';
import GameGrid from '@/components/GameGrid';
import type { Game } from '@/types';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const filteredGames = useMemo(() => {
        if (!query.trim()) return [];

        const searchTerm = query.toLowerCase().trim();
        return games.filter(game =>
            game.title.toLowerCase().includes(searchTerm) ||
            game.category.toLowerCase().includes(searchTerm)
        );
    }, [query]);

    const handleGameClick = (game: Game) => {
        console.log('Game clicked:', game.title);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        🔍 Search Results
                    </h1>
                    {query && (
                        <p className="text-text-secondary">
                            {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} found for &quot;{query}&quot;
                        </p>
                    )}
                </div>

                {/* Results */}
                {filteredGames.length > 0 ? (
                    <GameGrid
                        title=""
                        games={filteredGames}
                        onGameClick={handleGameClick}
                    />
                ) : query ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🎮</div>
                        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                            No games found
                        </h2>
                        <p className="text-text-secondary mb-6">
                            We couldn&apos;t find any games matching &quot;{query}&quot;
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Browse All Games
                        </a>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                            Start searching
                        </h2>
                        <p className="text-text-secondary">
                            Enter a game name or category to find games
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-20">
                        <p className="text-text-secondary">Loading...</p>
                    </div>
                </div>
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
