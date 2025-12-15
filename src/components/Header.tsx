'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
    BellIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'New Games', href: '/new' },
    { name: 'Top Games', href: '/top' },
    { name: 'Multiplayer', href: '/multiplayer' },
];

// Mock notifications data
const mockNotifications = [
    {
        id: 1,
        type: 'new_game',
        title: 'New Game Added!',
        message: 'Crystal Quest is now available to play',
        time: '2 min ago',
        read: false,
    },
    {
        id: 2,
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'You reached 1000 plays across all games',
        time: '1 hour ago',
        read: false,
    },
    {
        id: 3,
        type: 'update',
        title: 'Game Updated',
        message: 'Speed Racer X has new levels',
        time: '3 hours ago',
        read: true,
    },
    {
        id: 4,
        type: 'promo',
        title: '🎉 Weekend Event!',
        message: 'Double XP on all multiplayer games',
        time: '5 hours ago',
        read: true,
    },
];

const notificationIcons: Record<string, string> = {
    new_game: '🎮',
    achievement: '🏆',
    update: '🔄',
    promo: '🎉',
};

export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const notificationRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close notification dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const markAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <span className="text-black font-bold text-xl">G</span>
                        </div>
                        <span className="hidden sm:block font-heading text-xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                            GameVerse
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-text-secondary hover:text-foreground transition-colors font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className={`hidden md:flex items-center relative transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'
                            }`}
                    >
                        <MagnifyingGlassIcon className="absolute left-3 w-5 h-5 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search games..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-transparent rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </form>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Notification */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={toggleNotifications}
                                className="hidden md:flex p-2 rounded-lg hover:bg-surface transition-colors relative group"
                            >
                                <BellIcon className="w-6 h-6 text-text-secondary group-hover:text-foreground transition-colors" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-surface/50">
                                        <h3 className="font-heading font-semibold text-foreground">
                                            Notifications
                                        </h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-primary hover:text-primary/80 font-medium"
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>

                                    {/* Notifications List */}
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    onClick={() => markAsRead(notification.id)}
                                                    className={`px-4 py-3 border-b border-white/5 hover:bg-surface/50 cursor-pointer transition-colors ${!notification.read ? 'bg-primary/5' : ''
                                                        }`}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className="text-2xl">
                                                            {notificationIcons[notification.type] || '📢'}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium text-foreground text-sm truncate">
                                                                    {notification.title}
                                                                </p>
                                                                {!notification.read && (
                                                                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                                                )}
                                                            </div>
                                                            <p className="text-text-muted text-xs mt-0.5 line-clamp-2">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-text-muted text-xs mt-1">
                                                                {notification.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-8 text-center">
                                                <p className="text-text-muted text-sm">No notifications</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="px-4 py-3 border-t border-white/10 bg-surface/50">
                                        <Link
                                            href="/notifications"
                                            onClick={() => setIsNotificationOpen(false)}
                                            className="block w-full text-center text-sm text-primary hover:text-primary/80 font-medium"
                                        >
                                            View All Notifications
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User */}
                        <Link
                            href="/signin"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface transition-colors group"
                        >
                            <UserCircleIcon className="w-8 h-8 text-text-secondary group-hover:text-foreground transition-colors" />
                            <span className="text-sm font-medium text-text-secondary group-hover:text-foreground transition-colors">Sign In</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="w-6 h-6 text-foreground" />
                            ) : (
                                <Bars3Icon className="w-6 h-6 text-foreground" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="px-4 py-4 border-t border-white/10">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search games..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </form>

                    {/* Mobile Nav Links */}
                    <nav className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-4 py-3 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Sign In */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <Link
                            href="/signin"
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface hover:bg-card transition-colors"
                        >
                            <UserCircleIcon className="w-6 h-6 text-text-secondary" />
                            <span className="font-medium text-text-secondary">Sign In</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
