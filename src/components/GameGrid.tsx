import GameCard from './GameCard';
import type { Game } from '@/types';

interface GameGridProps {
    title: string;
    games: Game[];
    onGameClick?: (game: Game) => void;
}

export default function GameGrid({ title, games, onGameClick }: GameGridProps) {
    return (
        <section className="px-4 sm:px-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    {title}
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {games.map((game, index) => (
                    <div
                        key={game.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <GameCard game={game} onClick={onGameClick} />
                    </div>
                ))}
            </div>
        </section>
    );
}
