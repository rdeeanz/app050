// Game and category types for the gaming portal

export type BadgeType = 'hot' | 'top' | 'new' | 'updated';

export interface Badge {
  type: BadgeType;
  label: string;
}

export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  badges: Badge[];
  category: string;
  plays: number;
  rating: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface GameSection {
  id: string;
  title: string;
  games: Game[];
  viewAllLink?: string;
  layout?: 'carousel' | 'grid';
}
