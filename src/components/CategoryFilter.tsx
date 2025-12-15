'use client';

import { useRef } from 'react';
import type { Category } from '@/types';

interface CategoryFilterProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (categorySlug: string) => void;
    onSearch?: (query: string) => void;
}

export default function CategoryFilter({
    categories,
    activeCategory,
    onCategoryChange,
}: CategoryFilterProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleCategoryClick = (slug: string) => {
        onCategoryChange(slug);
    };

    return (
        <section className="py-4 sticky top-16 md:top-20 z-40 bg-background/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* Scrollable Categories */}
                <div
                    ref={scrollRef}
                    className="flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-2"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.slug)}
                            className={`chip flex-none ${activeCategory === category.slug ? 'chip-active' : ''
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
