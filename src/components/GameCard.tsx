'use client';

import Image from 'next/image';
import { PlayIcon } from '@heroicons/react/24/solid';
import type { Game, Badge } from '@/types';

interface GameCardProps {
    game: Game;
    onClick?: (game: Game) => void;
}

function BadgeComponent({ badge }: { badge: Badge }) {
    const badgeClasses: Record<string, string> = {
        hot: 'badge badge-hot',
        top: 'badge badge-top',
        new: 'badge badge-new',
        updated: 'badge badge-updated',
    };

    return (
        <span className={badgeClasses[badge.type] || 'badge'}>
            {badge.label}
        </span>
    );
}

function formatPlays(plays: number): string {
    if (plays >= 1000000) {
        return `${(plays / 1000000).toFixed(1)}M`;
    }
    if (plays >= 1000) {
        return `${(plays / 1000).toFixed(0)}K`;
    }
    return plays.toString();
}

export default function GameCard({ game, onClick }: GameCardProps) {
    const handleClick = () => {
        onClick?.(game);
    };

    return (
        <div
            className="game-card group relative bg-card rounded-xl overflow-hidden cursor-pointer"
            onClick={handleClick}
        >
            {/* Thumbnail Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={game.thumbnail}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                {/* Badges */}
                {game.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {game.badges.map((badge, index) => (
                            <BadgeComponent key={index} badge={badge} />
                        ))}
                    </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform shadow-lg shadow-primary/50">
                        <PlayIcon className="w-8 h-8 text-black ml-1" />
                    </div>
                </div>

                {/* Game Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                        {game.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {formatPlays(game.plays)}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {game.rating}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
