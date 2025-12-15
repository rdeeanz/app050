'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheckIcon, LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Super Admin Credentials (Demo only - in production, use secure authentication)
const ADMIN_CREDENTIALS = {
    username: 'superadmin',
    password: 'Admin@123',
};

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Check credentials
        if (
            formData.username === ADMIN_CREDENTIALS.username &&
            formData.password === ADMIN_CREDENTIALS.password
        ) {
            // Store admin session (Demo only - in production, use secure session management)
            localStorage.setItem('adminLoggedIn', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-4">
                        <ShieldCheckIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-foreground">
                        Super Admin Access
                    </h1>
                    <p className="text-text-secondary mt-2">
                        Enter your credentials to access the admin dashboard
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Username field */}
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter admin username"
                                        className="w-full pl-10 pr-4 py-3 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter admin password"
                                        className="w-full pl-10 pr-12 py-3 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                            >
                                Access Admin Dashboard
                            </button>
                        </form>

                        {/* Demo Credentials Info */}
                        <div className="mt-6 p-4 bg-surface rounded-lg border border-white/5">
                            <p className="text-xs text-text-muted text-center mb-2">
                                Demo Credentials:
                            </p>
                            <div className="flex justify-center gap-4 text-sm">
                                <span className="text-text-secondary">
                                    Username: <code className="text-primary">superadmin</code>
                                </span>
                                <span className="text-text-secondary">
                                    Password: <code className="text-primary">Admin@123</code>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
