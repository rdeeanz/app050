'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BellIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock notifications data - in a real app this would come from API/state management
const initialNotifications = [
    {
        id: 1,
        type: 'new_game',
        title: 'New Game Added!',
        message: 'Crystal Quest is now available to play. Explore magical worlds and collect gems in this exciting puzzle adventure!',
        time: '2 min ago',
        read: false,
    },
    {
        id: 2,
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'You reached 1000 plays across all games. Keep playing to unlock more achievements!',
        time: '1 hour ago',
        read: false,
    },
    {
        id: 3,
        type: 'update',
        title: 'Game Updated',
        message: 'Speed Racer X has new levels! 5 new challenging tracks have been added to test your skills.',
        time: '3 hours ago',
        read: true,
    },
    {
        id: 4,
        type: 'promo',
        title: '🎉 Weekend Event!',
        message: 'Double XP on all multiplayer games this weekend. Play now and level up faster!',
        time: '5 hours ago',
        read: true,
    },
    {
        id: 5,
        type: 'new_game',
        title: 'New Puzzle Game!',
        message: 'Mind Bender is now live! Challenge your brain with 100+ unique puzzles.',
        time: '1 day ago',
        read: true,
    },
    {
        id: 6,
        type: 'achievement',
        title: 'New High Score!',
        message: 'You beat your previous high score in Neon Runner. Can you beat it again?',
        time: '2 days ago',
        read: true,
    },
    {
        id: 7,
        type: 'update',
        title: 'System Maintenance Complete',
        message: 'All systems are back online. Thank you for your patience!',
        time: '3 days ago',
        read: true,
    },
    {
        id: 8,
        type: 'promo',
        title: 'New Feature: Game Favorites',
        message: 'You can now save your favorite games for quick access. Try it out!',
        time: '1 week ago',
        read: true,
    },
];

const notificationIcons: Record<string, string> = {
    new_game: '🎮',
    achievement: '🏆',
    update: '🔄',
    promo: '🎉',
};

const notificationColors: Record<string, string> = {
    new_game: 'from-green-500 to-emerald-600',
    achievement: 'from-yellow-500 to-amber-600',
    update: 'from-blue-500 to-cyan-600',
    promo: 'from-purple-500 to-pink-600',
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const unreadCount = notifications.filter(n => !n.read).length;
    const filteredNotifications = filter === 'unread'
        ? notifications.filter(n => !n.read)
        : notifications;

    const markAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <BellIcon className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                            Notifications
                        </h1>
                        {unreadCount > 0 && (
                            <span className="px-2.5 py-1 bg-accent text-white text-sm font-bold rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </div>
                    <p className="text-text-secondary">
                        Stay updated with the latest games, achievements, and events
                    </p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    {/* Filter Tabs */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all'
                                ? 'bg-primary text-black'
                                : 'bg-surface text-text-secondary hover:text-foreground'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'unread'
                                ? 'bg-primary text-black'
                                : 'bg-surface text-text-secondary hover:text-foreground'
                                }`}
                        >
                            Unread ({unreadCount})
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface text-text-secondary hover:text-foreground transition-colors"
                            >
                                <CheckCircleIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">Mark all read</span>
                            </button>
                        )}
                        {/* HIDDEN: Clear All button - uncomment to enable
                        {notifications.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface text-text-secondary hover:text-red-400 transition-colors"
                            >
                                <TrashIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">Clear all</span>
                            </button>
                        )}
                        */}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`relative bg-card border rounded-xl overflow-hidden transition-all hover:shadow-lg ${!notification.read
                                    ? 'border-primary/30 shadow-md shadow-primary/10'
                                    : 'border-white/5'
                                    }`}
                            >
                                {/* Unread indicator bar */}
                                {!notification.read && (
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${notificationColors[notification.type] || 'from-primary to-secondary'}`} />
                                )}

                                <div className="p-4 pl-5">
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${notificationColors[notification.type] || 'from-primary to-secondary'} flex items-center justify-center text-2xl`}>
                                            {notificationIcons[notification.type] || '📢'}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="font-semibold text-foreground">
                                                        {notification.title}
                                                    </h3>
                                                    <p className="text-text-secondary text-sm mt-1">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-text-muted text-xs mt-2">
                                                        {notification.time}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-2 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-primary"
                                                            title="Mark as read"
                                                        >
                                                            <CheckCircleIcon className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                    {/* HIDDEN: Delete button - uncomment to enable
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="p-2 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-red-400"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                    */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-card rounded-xl border border-white/5">
                            <div className="text-6xl mb-4">🔔</div>
                            <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                                {filter === 'unread' ? 'All caught up!' : 'No notifications'}
                            </h2>
                            <p className="text-text-secondary mb-6">
                                {filter === 'unread'
                                    ? 'You have read all your notifications'
                                    : 'When you get notifications, they will appear here'}
                            </p>
                            <Link
                                href="/"
                                className="inline-block px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Browse Games
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
