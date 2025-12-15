'use client';

import { useState, useMemo } from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import GameCarousel from '@/components/GameCarousel';
import GameGrid from '@/components/GameGrid';
import { categories, gameSections, games, getGamesByCategory } from '@/data/mockData';
import type { Game } from '@/types';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter games based on selected category
  const filteredGames = useMemo(() => {
    return getGamesByCategory(activeCategory);
  }, [activeCategory]);

  // Update sections based on filter
  const filteredSections = useMemo(() => {
    if (activeCategory === 'all') {
      return gameSections;
    }
    // When a specific category is selected, show filtered grid
    return [];
  }, [activeCategory]);

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
  };

  const handleGameClick = (game: Game) => {
    console.log('Game clicked:', game.title);
    // In a real app, this would navigate to the game page
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {activeCategory === 'all' ? (
          // Show all sections when "All Games" is selected
          <>
            {/* Top Picks Carousel */}
            <GameCarousel
              title={filteredSections[0]?.title || '🔥 Top Picks'}
              games={filteredSections[0]?.games || []}
              viewAllLink="/top-picks"
              onGameClick={handleGameClick}
            />

            {/* New Games Carousel */}
            <GameCarousel
              title={filteredSections[1]?.title || '✨ New Games'}
              games={filteredSections[1]?.games || []}
              viewAllLink="/new"
              onGameClick={handleGameClick}
            />

            {/* Featured Games Grid */}
            <GameGrid
              title={filteredSections[2]?.title || '⭐ Featured Games'}
              games={filteredSections[2]?.games || []}
              onGameClick={handleGameClick}
            />

            {/* Action Games Carousel */}
            <GameCarousel
              title={filteredSections[3]?.title || '💥 Action Games'}
              games={filteredSections[3]?.games || []}
              viewAllLink="/category/action"
              onGameClick={handleGameClick}
            />

            {/* Puzzle Games Carousel */}
            <GameCarousel
              title={filteredSections[4]?.title || '🧩 Puzzle Games'}
              games={filteredSections[4]?.games || []}
              viewAllLink="/category/puzzle"
              onGameClick={handleGameClick}
            />

            {/* Trending Now Carousel */}
            <GameCarousel
              title={filteredSections[5]?.title || '📈 Trending Now'}
              games={filteredSections[5]?.games || []}
              viewAllLink="/trending"
              onGameClick={handleGameClick}
            />
          </>
        ) : (
          // Show filtered grid when a specific category is selected
          <GameGrid
            title={`${categories.find(c => c.slug === activeCategory)?.name || 'Games'}`}
            games={filteredGames}
            onGameClick={handleGameClick}
          />
        )}

        {/* Show message if no games in category */}
        {activeCategory !== 'all' && filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">
              No games found in this category.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 text-primary hover:text-primary/80 font-medium"
            >
              View all games →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
