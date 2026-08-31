import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types';

interface FavoritesState {
  items: string[];
  addItem: (carId: string) => void;
  removeItem: (carId: string) => void;
  toggleItem: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  getFavorites: () => Car[];
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (carId) => {
        if (!get().items.includes(carId)) {
          set(state => ({ items: [...state.items, carId] }));
        }
      },
      
      removeItem: (carId) => {
        set(state => ({
          items: state.items.filter(id => id !== carId),
        }));
      },
      
      toggleItem: (carId) => {
        if (get().items.includes(carId)) {
          get().removeItem(carId);
        } else {
          get().addItem(carId);
        }
      },
      
      isFavorite: (carId) => {
        return get().items.includes(carId);
      },
      
      getFavorites: () => {
        const { volvoCars } = require('@/lib/cars');
        return get().items.map(id => volvoCars.find(car => car.id === id)).filter(Boolean);
      },
      
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'volvo-favorites',
    }
  )
);