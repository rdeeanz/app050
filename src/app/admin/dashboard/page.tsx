'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ShieldCheckIcon,
    HomeIcon,
    UsersIcon,
    Squares2X2Icon,
    Cog6ToothIcon,
    ChartBarIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { games as mockGames } from '@/data/mockData';

// Type for admin games
type AdminGame = {
    id: number;
    title: string;
    category: string;
    status: 'active' | 'inactive';
    plays: number;
    featured: boolean;
};

// Transform mockData games for admin use
const initialGames: AdminGame[] = mockGames.map((game, index) => ({
    id: index + 1,
    title: game.title,
    category: game.category.charAt(0).toUpperCase() + game.category.slice(1),
    status: 'active' as const,
    plays: game.plays,
    featured: game.badges.some(b => b.type === 'hot' || b.type === 'top'),
}));

// Dummy data for users
const initialUsers = [
    { id: 1, username: 'GamerPro99', email: 'gamerpro99@email.com', status: 'active', joined: '2024-10-15', plays: 155 },
    { id: 2, username: 'SpeedKing', email: 'speedking@email.com', status: 'active', joined: '2024-11-01', plays: 89 },
    { id: 3, username: 'PuzzleMaster', email: 'puzzlemaster@email.com', status: 'active', joined: '2024-11-15', plays: 234 },
    { id: 4, username: 'ArcadeHero', email: 'arcadehero@email.com', status: 'banned', joined: '2024-09-20', plays: 45 },
    { id: 5, username: 'NightRider', email: 'nightrider@email.com', status: 'active', joined: '2024-12-01', plays: 67 },
];

// Site settings
const initialSettings = {
    siteName: 'GameVerse',
    siteDescription: 'Play Free Online Games',
    maintenanceMode: false,
    allowRegistration: true,
    maxGamesPerPage: 12,
    featuredGamesCount: 6,
    enableNotifications: true,
    enableComments: true,
};

type TabType = 'overview' | 'games' | 'users' | 'settings';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [games, setGames] = useState(initialGames);
    const [users] = useState(initialUsers);
    const [settings, setSettings] = useState(initialSettings);
    const [searchTerm, setSearchTerm] = useState('');

    // Add Game Modal state
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [newGame, setNewGame] = useState({
        title: '',
        category: 'Action',
        plays: 0,
        featured: false,
    });

    const gameCategories = ['Action', 'Adventure', 'Puzzle', 'Racing', 'Sports', 'Strategy', 'Multiplayer', 'Shooter', 'Rpg', 'Simulation', 'Horror'];

    useEffect(() => {
        // Check if admin is logged in
        const adminLoggedIn = localStorage.getItem('adminLoggedIn');
        if (adminLoggedIn !== 'true') {
            router.push('/admin');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        router.push('/admin');
    };

    const toggleGameStatus = (id: number) => {
        setGames(prev =>
            prev.map(game =>
                game.id === id
                    ? { ...game, status: game.status === 'active' ? 'inactive' : 'active' }
                    : game
            )
        );
    };

    const toggleFeatured = (id: number) => {
        setGames(prev =>
            prev.map(game =>
                game.id === id ? { ...game, featured: !game.featured } : game
            )
        );
    };

    const handleSettingChange = (key: string, value: boolean | string | number) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleAddGame = () => {
        if (!newGame.title.trim()) {
            alert('Please enter a game title');
            return;
        }
        const newGameEntry: AdminGame = {
            id: games.length + 1,
            title: newGame.title,
            category: newGame.category,
            status: 'active',
            plays: newGame.plays,
            featured: newGame.featured,
        };
        setGames(prev => [newGameEntry, ...prev]);
        setNewGame({ title: '', category: 'Action', plays: 0, featured: false });
        setShowAddGameModal(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-text-secondary">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Stats for overview
    const totalPlays = games.reduce((sum, g) => sum + g.plays, 0);
    const activeGames = games.filter(g => g.status === 'active').length;
    const activeUsers = users.filter(u => u.status === 'active').length;

    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-card border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                                <ShieldCheckIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="font-heading text-lg font-bold text-foreground">
                                    Super Admin Dashboard
                                </h1>
                                <p className="text-xs text-text-muted">GameVerse Control Panel</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-text-secondary hover:text-foreground transition-colors text-sm"
                            >
                                View Site →
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'overview'
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                            : 'bg-surface text-text-secondary hover:text-foreground'
                            }`}
                    >
                        <ChartBarIcon className="w-5 h-5" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('games')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'games'
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                            : 'bg-surface text-text-secondary hover:text-foreground'
                            }`}
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                        Games
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'users'
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                            : 'bg-surface text-text-secondary hover:text-foreground'
                            }`}
                    >
                        <UsersIcon className="w-5 h-5" />
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings'
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                            : 'bg-surface text-text-secondary hover:text-foreground'
                            }`}
                    >
                        <Cog6ToothIcon className="w-5 h-5" />
                        Settings
                    </button>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-card border border-white/10 rounded-xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-500/20 rounded-xl">
                                        <Squares2X2Icon className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-foreground">{games.length}</p>
                                        <p className="text-text-muted">Total Games</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-card border border-white/10 rounded-xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-500/20 rounded-xl">
                                        <UsersIcon className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-foreground">{users.length}</p>
                                        <p className="text-text-muted">Total Users</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-card border border-white/10 rounded-xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-500/20 rounded-xl">
                                        <ChartBarIcon className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-foreground">{totalPlays.toLocaleString()}</p>
                                        <p className="text-text-muted">Total Plays</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-card border border-white/10 rounded-xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                                        <BellIcon className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-foreground">{activeGames}</p>
                                        <p className="text-text-muted">Active Games</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-card border border-white/10 rounded-xl p-6">
                            <h2 className="font-heading text-lg font-bold text-foreground mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <button className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl hover:bg-primary/20 transition-colors group">
                                    <PlusIcon className="w-8 h-8 text-text-secondary group-hover:text-primary" />
                                    <span className="text-sm text-text-secondary group-hover:text-foreground">Add Game</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl hover:bg-primary/20 transition-colors group">
                                    <UsersIcon className="w-8 h-8 text-text-secondary group-hover:text-primary" />
                                    <span className="text-sm text-text-secondary group-hover:text-foreground">Manage Users</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl hover:bg-primary/20 transition-colors group">
                                    <BellIcon className="w-8 h-8 text-text-secondary group-hover:text-primary" />
                                    <span className="text-sm text-text-secondary group-hover:text-foreground">Send Notification</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl hover:bg-primary/20 transition-colors group">
                                    <Cog6ToothIcon className="w-8 h-8 text-text-secondary group-hover:text-primary" />
                                    <span className="text-sm text-text-secondary group-hover:text-foreground">Site Settings</span>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-card border border-white/10 rounded-xl p-6">
                            <h2 className="font-heading text-lg font-bold text-foreground mb-4">Recent Activity</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <p className="text-text-secondary text-sm flex-1">New user <span className="text-foreground">NightRider</span> registered</p>
                                    <span className="text-text-muted text-xs">2 hours ago</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <p className="text-text-secondary text-sm flex-1">Game <span className="text-foreground">Crystal Quest</span> reached 8,900 plays</p>
                                    <span className="text-text-muted text-xs">5 hours ago</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                    <p className="text-text-secondary text-sm flex-1">Site settings updated</p>
                                    <span className="text-text-muted text-xs">1 day ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Games Tab */}
                {activeTab === 'games' && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-md">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search games..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary"
                                />
                            </div>
                            <button
                                onClick={() => setShowAddGameModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Add Game
                            </button>
                        </div>

                        {/* Games Table */}
                        <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-surface">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Game</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Category</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Status</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Plays</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Featured</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredGames.map((game) => (
                                            <tr key={game.id} className="hover:bg-surface/50">
                                                <td className="px-4 py-4 text-foreground font-medium">{game.title}</td>
                                                <td className="px-4 py-4 text-text-secondary">{game.category}</td>
                                                <td className="px-4 py-4">
                                                    <button
                                                        onClick={() => toggleGameStatus(game.id)}
                                                        className={`px-2 py-1 text-xs font-medium rounded-full ${game.status === 'active'
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-red-500/20 text-red-400'
                                                            }`}
                                                    >
                                                        {game.status}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4 text-text-secondary">{game.plays.toLocaleString()}</td>
                                                <td className="px-4 py-4">
                                                    <button
                                                        onClick={() => toggleFeatured(game.id)}
                                                        className={`w-10 h-6 rounded-full transition-colors ${game.featured ? 'bg-primary' : 'bg-surface'
                                                            }`}
                                                    >
                                                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${game.featured ? 'translate-x-5' : 'translate-x-1'
                                                            }`} />
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-1 hover:text-primary transition-colors text-text-muted">
                                                            <EyeIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-1 hover:text-primary transition-colors text-text-muted">
                                                            <PencilIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-1 hover:text-red-400 transition-colors text-text-muted">
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-md">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="text-text-secondary text-sm">
                                {activeUsers} active / {users.length} total users
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-surface">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">User</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Email</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Status</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Joined</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Plays</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-surface/50">
                                                <td className="px-4 py-4 text-foreground font-medium">{user.username}</td>
                                                <td className="px-4 py-4 text-text-secondary">{user.email}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === 'active'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-text-secondary">{new Date(user.joined).toLocaleDateString()}</td>
                                                <td className="px-4 py-4 text-text-secondary">{user.plays}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-1 hover:text-primary transition-colors text-text-muted">
                                                            <EyeIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-1 hover:text-primary transition-colors text-text-muted">
                                                            <PencilIcon className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-1 hover:text-red-400 transition-colors text-text-muted">
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        {/* General Settings */}
                        <div className="bg-card border border-white/10 rounded-xl p-6">
                            <h2 className="font-heading text-lg font-bold text-foreground mb-6">General Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Site Name</label>
                                    <input
                                        type="text"
                                        value={settings.siteName}
                                        onChange={(e) => handleSettingChange('siteName', e.target.value)}
                                        className="w-full max-w-md px-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Site Description</label>
                                    <input
                                        type="text"
                                        value={settings.siteDescription}
                                        onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                                        className="w-full max-w-md px-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Display Settings */}
                        <div className="bg-card border border-white/10 rounded-xl p-6">
                            <h2 className="font-heading text-lg font-bold text-foreground mb-6">Display Settings</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Games Per Page</label>
                                    <input
                                        type="number"
                                        value={settings.maxGamesPerPage}
                                        onChange={(e) => handleSettingChange('maxGamesPerPage', parseInt(e.target.value))}
                                        className="w-full px-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Featured Games Count</label>
                                    <input
                                        type="number"
                                        value={settings.featuredGamesCount}
                                        onChange={(e) => handleSettingChange('featuredGamesCount', parseInt(e.target.value))}
                                        className="w-full px-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Toggle Settings */}
                        <div className="bg-card border border-white/10 rounded-xl p-6">
                            <h2 className="font-heading text-lg font-bold text-foreground mb-6">Feature Toggles</h2>
                            <div className="space-y-4">
                                {[
                                    { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Put site in maintenance mode' },
                                    { key: 'allowRegistration', label: 'Allow Registration', desc: 'Allow new user registrations' },
                                    { key: 'enableNotifications', label: 'Enable Notifications', desc: 'Enable push notifications' },
                                    { key: 'enableComments', label: 'Enable Comments', desc: 'Allow users to comment on games' },
                                ].map((setting) => (
                                    <div key={setting.key} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                                        <div>
                                            <p className="text-foreground font-medium">{setting.label}</p>
                                            <p className="text-text-muted text-sm">{setting.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => handleSettingChange(setting.key, !settings[setting.key as keyof typeof settings])}
                                            className={`w-12 h-7 rounded-full transition-colors ${settings[setting.key as keyof typeof settings] ? 'bg-primary' : 'bg-gray-600'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => alert('Settings saved! (Demo)')}
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Save All Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Game Modal */}
            {showAddGameModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-red-500 to-orange-500">
                            <h2 className="font-heading text-xl font-bold text-white">Add New Game</h2>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Game Title *
                                </label>
                                <input
                                    type="text"
                                    value={newGame.title}
                                    onChange={(e) => setNewGame(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter game title"
                                    className="w-full px-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Category
                                </label>
                                <select
                                    value={newGame.category}
                                    onChange={(e) => setNewGame(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary"
                                >
                                    {gameCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Initial Plays */}
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Initial Plays Count
                                </label>
                                <input
                                    type="number"
                                    value={newGame.plays}
                                    onChange={(e) => setNewGame(prev => ({ ...prev, plays: parseInt(e.target.value) || 0 }))}
                                    placeholder="0"
                                    className="w-full px-4 py-2 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary"
                                />
                            </div>

                            {/* Featured Toggle */}
                            <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                                <span className="text-foreground">Featured Game</span>
                                <button
                                    type="button"
                                    onClick={() => setNewGame(prev => ({ ...prev, featured: !prev.featured }))}
                                    className={`w-12 h-7 rounded-full transition-colors ${newGame.featured ? 'bg-primary' : 'bg-gray-600'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${newGame.featured ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-white/10 flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowAddGameModal(false);
                                    setNewGame({ title: '', category: 'Action', plays: 0, featured: false });
                                }}
                                className="px-4 py-2 rounded-lg bg-surface text-text-secondary hover:text-foreground transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddGame}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity"
                            >
                                Add Game
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
