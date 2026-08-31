import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car, CartItem } from '@/types';
import { generateId } from '@/lib/utils';

interface CartState {
  items: CartItem[];
  addItem: (car: Car, color: string, options: string[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

const availableColors = [
  'Crystal White Pearl',
  'Onyx Black Metallic',
  'Silver Dawn Metallic',
  'Thunder Grey Metallic',
  'Platinum Grey Metallic',
  'Vapour Grey Metallic',
  'Bright Silver Metallic',
  'Fusion Red Metallic',
  'Denim Blue Metallic',
  'Sage Green Metallic',
];

const availableOptions = [
  'Panoramic Sunroof',
  'Bowers & Wilkins Premium Audio',
  '360° Camera',
  'Park Assist Pilot',
  'Head-Up Display',
  'Heated Rear Seats',
  'Heated Steering Wheel',
  'Air Purifier',
  'Wireless Phone Charging',
  'Integrated Booster Cushions',
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (car, color, options) => {
        const existingItem = get().items.find(
          item => item.car.id === car.id && item.selectedColor === color
        );
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              item.car.id === car.id && item.selectedColor === color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          const newItem: CartItem = {
            id: generateId(),
            car,
            quantity: 1,
            selectedColor: color || availableColors[0],
            selectedOptions: options || [],
            addedAt: new Date(),
          };
          set(state => ({ items: [...state.items, newItem] }));
        }
      },
      
      removeItem: (itemId) => {
        set(state => ({
          items: state.items.filter(item => item.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.car.price * item.quantity, 0);
      },
      
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = subtotal > 0 ? 5000000 : 0; // 5M VND shipping
        const tax = subtotal * 0.1; // 10% VAT
        return subtotal + shipping + tax;
      },
    }),
    {
      name: 'volvo-cart',
    }
  )
);

export { availableColors, availableOptions };