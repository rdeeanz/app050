'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    UserCircleIcon,
    TrophyIcon,
    ClockIcon,
    FireIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    PlayIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Dummy user data
const dummyUser = {
    id: 1,
    username: 'GamerPro99',
    email: 'gamerpro99@email.com',
    avatar: null,
    joinDate: '2024-10-15',
    level: 42,
    xp: 8450,
    xpToNextLevel: 10000,
    totalPlayTime: 156, // hours
    achievements: 28,
    favoriteGenre: 'Action',
};

// Dummy game play history
const dummyGameHistory = [
    {
        id: 1,
        title: 'Neon Runner',
        category: 'Action',
        thumbnail: 'https://picsum.photos/seed/game1/400/300',
        playCount: 47,
        totalPlayTime: 24.5, // hours
        lastPlayed: '2024-12-15',
        highScore: 125000,
        rating: 5,
    },
    {
        id: 2,
        title: 'Crystal Quest',
        category: 'Puzzle',
        thumbnail: 'https://picsum.photos/seed/game2/400/300',
        playCount: 32,
        totalPlayTime: 18.2,
        lastPlayed: '2024-12-14',
        highScore: 89500,
        rating: 4,
    },
    {
        id: 3,
        title: 'Speed Racer X',
        category: 'Racing',
        thumbnail: 'https://picsum.photos/seed/game3/400/300',
        playCount: 28,
        totalPlayTime: 15.8,
        lastPlayed: '2024-12-13',
        highScore: 156000,
        rating: 5,
    },
    {
        id: 4,
        title: 'Galaxy Defender',
        category: 'Arcade',
        thumbnail: 'https://picsum.photos/seed/game4/400/300',
        playCount: 21,
        totalPlayTime: 12.3,
        lastPlayed: '2024-12-12',
        highScore: 78000,
        rating: 4,
    },
    {
        id: 5,
        title: 'Mind Bender',
        category: 'Puzzle',
        thumbnail: 'https://picsum.photos/seed/game5/400/300',
        playCount: 15,
        totalPlayTime: 8.5,
        lastPlayed: '2024-12-10',
        highScore: 45000,
        rating: 3,
    },
    {
        id: 6,
        title: 'Battle Arena',
        category: 'Multiplayer',
        thumbnail: 'https://picsum.photos/seed/game6/400/300',
        playCount: 12,
        totalPlayTime: 6.2,
        lastPlayed: '2024-12-08',
        highScore: 32000,
        rating: 4,
    },
];

// Category colors
const categoryColors: Record<string, string> = {
    Action: 'from-red-500 to-orange-500',
    Puzzle: 'from-purple-500 to-pink-500',
    Racing: 'from-blue-500 to-cyan-500',
    Arcade: 'from-yellow-500 to-amber-500',
    Multiplayer: 'from-green-500 to-emerald-500',
};

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'achievements'>('overview');
    const user = dummyUser;
    const gameHistory = dummyGameHistory;

    const totalPlays = gameHistory.reduce((sum, g) => sum + g.playCount, 0);
    const xpPercentage = (user.xp / user.xpToNextLevel) * 100;

    const handleLogout = () => {
        alert('Logout clicked! (Demo - would redirect to home)');
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-card border border-white/10 rounded-2xl overflow-hidden mb-8">
                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent" />

                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-2xl bg-surface border-4 border-card flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircleIcon className="w-16 h-16 text-text-secondary" />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="font-heading text-2xl font-bold text-foreground">
                                        {user.username}
                                    </h1>
                                    <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-bold rounded-full">
                                        Level {user.level}
                                    </span>
                                </div>
                                <p className="text-text-secondary text-sm mt-1">
                                    Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-surface hover:bg-card transition-colors text-text-secondary hover:text-foreground">
                                    <Cog6ToothIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg bg-surface hover:bg-red-500/20 transition-colors text-text-secondary hover:text-red-400"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* XP Progress */}
                        <div className="mt-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-text-secondary">Level Progress</span>
                                <span className="text-primary font-medium">{user.xp.toLocaleString()} / {user.xpToNextLevel.toLocaleString()} XP</span>
                            </div>
                            <div className="h-3 bg-surface rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                                    style={{ width: `${xpPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <PlayIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{totalPlays}</p>
                                <p className="text-text-muted text-sm">Total Plays</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/20 rounded-lg">
                                <ClockIcon className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{user.totalPlayTime}h</p>
                                <p className="text-text-muted text-sm">Play Time</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/20 rounded-lg">
                                <TrophyIcon className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{user.achievements}</p>
                                <p className="text-text-muted text-sm">Achievements</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <FireIcon className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{gameHistory.length}</p>
                                <p className="text-text-muted text-sm">Games Played</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${activeTab === 'overview'
                                ? 'text-primary border-primary'
                                : 'text-text-secondary border-transparent hover:text-foreground'
                            }`}
                    >
                        <ChartBarIcon className="w-5 h-5 inline-block mr-2" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('games')}
                        className={`px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${activeTab === 'games'
                                ? 'text-primary border-primary'
                                : 'text-text-secondary border-transparent hover:text-foreground'
                            }`}
                    >
                        <PlayIcon className="w-5 h-5 inline-block mr-2" />
                        My Games
                    </button>
                    <button
                        onClick={() => setActiveTab('achievements')}
                        className={`px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${activeTab === 'achievements'
                                ? 'text-primary border-primary'
                                : 'text-text-secondary border-transparent hover:text-foreground'
                            }`}
                    >
                        <TrophyIcon className="w-5 h-5 inline-block mr-2" />
                        Achievements
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <div>
                            <h2 className="font-heading text-xl font-bold text-foreground mb-4">Recent Activity</h2>
                            <div className="space-y-3">
                                {gameHistory.slice(0, 4).map((game) => (
                                    <div key={game.id} className="flex items-center gap-4 bg-card border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                                        <img
                                            src={game.thumbnail}
                                            alt={game.title}
                                            className="w-16 h-12 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-foreground truncate">{game.title}</h3>
                                            <p className="text-text-muted text-sm">
                                                Last played: {new Date(game.lastPlayed).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-primary font-bold">{game.playCount} plays</p>
                                            <p className="text-text-muted text-sm">{game.totalPlayTime}h total</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Favorite Genre */}
                        <div className="bg-card border border-white/10 rounded-xl p-6">
                            <h2 className="font-heading text-xl font-bold text-foreground mb-4">Your Stats</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-text-muted text-sm">Favorite Genre</p>
                                    <p className="text-lg font-bold text-primary">{user.favoriteGenre}</p>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm">Average Session</p>
                                    <p className="text-lg font-bold text-foreground">{(user.totalPlayTime / totalPlays * 60).toFixed(0)} min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'games' && (
                    <div>
                        <h2 className="font-heading text-xl font-bold text-foreground mb-4">Games You&apos;ve Played</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gameHistory.map((game) => (
                                <div key={game.id} className="bg-card border border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                                    <div className="flex">
                                        <img
                                            src={game.thumbnail}
                                            alt={game.title}
                                            className="w-32 h-full object-cover"
                                        />
                                        <div className="flex-1 p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-foreground">{game.title}</h3>
                                                    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r ${categoryColors[game.category] || 'from-gray-500 to-gray-600'} text-white mt-1`}>
                                                        {game.category}
                                                    </span>
                                                </div>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            className={`w-4 h-4 ${i < game.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <p className="text-text-muted">Play Count</p>
                                                    <p className="text-foreground font-bold">{game.playCount}</p>
                                                </div>
                                                <div>
                                                    <p className="text-text-muted">Play Time</p>
                                                    <p className="text-foreground font-bold">{game.totalPlayTime}h</p>
                                                </div>
                                                <div>
                                                    <p className="text-text-muted">High Score</p>
                                                    <p className="text-primary font-bold">{game.highScore.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-text-muted">Last Played</p>
                                                    <p className="text-foreground font-bold">{new Date(game.lastPlayed).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div className="text-center py-12 bg-card rounded-xl border border-white/5">
                        <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                        <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                            {user.achievements} Achievements Unlocked!
                        </h2>
                        <p className="text-text-secondary mb-6">
                            Keep playing to unlock more achievements and earn badges
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Play More Games
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
