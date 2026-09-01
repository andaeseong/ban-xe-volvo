export interface Car {
  id: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  originalPrice?: number;
  images: string[];
  thumbnail: string;
  specs: CarSpecs;
  safetyFeatures: string[];
  category: 'sedan' | 'suv' | 'wagon' | 'electric' | 'hybrid';
  fuelType: 'electric' | 'hybrid' | 'plug-in-hybrid' | 'mild-hybrid' | 'gasoline' | 'diesel';
  transmission: 'automatic' | 'manual';
  drivetrain: 'FWD' | 'AWD' | 'RWD';
  seating: number;
  description: string;
  highlights: string[];
  isNew?: boolean;
  isPopular?: boolean;
  discount?: number;
}

export interface CarSpecs {
  engine: string;
  power: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  range?: string;
  batteryCapacity?: string;
  chargingTime?: string;
  fuelEconomy: string;
  co2Emissions: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
  };
  weight: string;
  cargoCapacity: string;
  towingCapacity?: string;
}

export interface SafetyFeature {
  id: string;
  name: string;
  category: 'active' | 'passive' | 'driver-assistance' | 'structural';
  description: string;
  icon: string;
  details: string[];
  standard: boolean;
}

export interface CartItem {
  id: string;
  car: Car;
  quantity: number;
  selectedColor: string;
  selectedOptions: string[];
  addedAt: Date;
}

export interface FavoriteItem {
  carId: string;
  addedAt: Date;
}

export interface PaymentPlan {
  id: string;
  name: string;
  downPaymentPercent: number;
  termMonths: number;
  interestRate: number;
  monthlyPayment: number;
  totalCost: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FilterOptions {
  category?: string[];
  fuelType?: string[];
  priceRange?: [number, number];
  year?: number[];
  drivetrain?: string[];
  seating?: number[];
  sortBy?: 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'popularity';
}