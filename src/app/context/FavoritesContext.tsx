'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { HotelCard } from '@/components/home/types';

interface FavoritesContextType {
  favorites: HotelCard[];
  addFavorite: (hotel: HotelCard) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<HotelCard[]>([]);
  const { isLoggedIn, user } = useAuth();

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    if (isLoggedIn && user) {
      const savedFavorites = localStorage.getItem(`favorites-${user.email}`);
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          console.error('Failed to parse favorites from localStorage', error);
        }
      }
    } else {
      // Clear favorites when logged out
      setFavorites([]);
    }
  }, [isLoggedIn, user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoggedIn && user && favorites.length > 0) {
      localStorage.setItem(`favorites-${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, isLoggedIn, user]);

  const addFavorite = (hotel: HotelCard) => {
    if (!isLoggedIn) return;
    setFavorites(prev => {
      // Only add if not already in favorites
      if (!prev.some(item => item.id === hotel.id)) {
        return [...prev, hotel];
      }
      return prev;
    });
  };

  const removeFavorite = (id: number) => {
    if (!isLoggedIn) return;
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 