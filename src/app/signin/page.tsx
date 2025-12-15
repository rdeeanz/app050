'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EnvelopeIcon, LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo only - in real app, this would connect to authentication service
        // Redirect to dashboard after successful login/register
        router.push('/dashboard');
    };

    const handleGoogleSignIn = () => {
        // Demo only - in real app, this would initiate Google OAuth flow
        // Redirect to dashboard after successful Google login
        router.push('/dashboard');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <span className="text-black font-bold text-2xl">G</span>
                        </div>
                        <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                            GameVerse
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-white/10">
                        <button
                            onClick={() => setIsSignUp(false)}
                            className={`flex-1 py-4 text-center font-semibold transition-colors ${!isSignUp
                                ? 'bg-surface text-primary border-b-2 border-primary'
                                : 'text-text-secondary hover:text-foreground'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsSignUp(true)}
                            className={`flex-1 py-4 text-center font-semibold transition-colors ${isSignUp
                                ? 'bg-surface text-primary border-b-2 border-primary'
                                : 'text-text-secondary hover:text-foreground'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <div className="p-6 sm:p-8">
                        {/* Google Sign In */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            {/* Google Icon */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-text-muted text-sm">or</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name field (only for sign up) */}
                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your username"
                                            className="w-full pl-10 pr-4 py-3 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            required={isSignUp}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email/Username field */}
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    {isSignUp ? 'Email Address' : 'Email Address or Username'}
                                </label>
                                <div className="relative">
                                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type={isSignUp ? 'email' : 'text'}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={isSignUp ? 'Enter your email' : 'Enter email or username'}
                                        className="w-full pl-10 pr-4 py-3 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-12 py-3 bg-surface border border-white/10 rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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

                            {/* Forgot password (only for sign in) */}
                            {!isSignUp && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                            >
                                {isSignUp ? 'Create Account' : 'Sign In'}
                            </button>
                        </form>

                        {/* Terms (only for sign up) */}
                        {isSignUp && (
                            <p className="mt-4 text-xs text-text-muted text-center">
                                By creating an account, you agree to our{' '}
                                <button className="text-primary hover:underline">Terms of Service</button>
                                {' '}and{' '}
                                <button className="text-primary hover:underline">Privacy Policy</button>
                            </p>
                        )}
                    </div>
                </div>

                {/* Back to home link */}
                <p className="mt-6 text-center text-text-secondary">
                    <Link href="/" className="hover:text-primary transition-colors">
                        ← Back to GameVerse
                    </Link>
                </p>
            </div>
        </div>
    );
}
