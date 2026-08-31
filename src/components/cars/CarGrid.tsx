'use client';

import { Car } from '@/types';
import { CarCard } from './CarCard';
import { cn } from '@/lib/utils';

interface CarGridProps {
  cars: Car[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'featured' | 'compact';
  showViewAll?: boolean;
  viewAllHref?: string;
}

export function CarGrid({ 
  cars, 
  columns = 3, 
  variant = 'default',
  showViewAll = false,
  viewAllHref = '/cars'
}: CarGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };
  
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Không tìm thấy xe phù hợp</p>
      </div>
    );
  }
  
  return (
    <div className={cn('grid gap-6 md:gap-8', gridCols[columns])} role="list" aria-label="Danh sách xe">
      {cars.map((car, index) => (
        <CarCard 
          key={car.id} 
          car={car} 
          variant={variant}
          priority={index < 4}
        />
      ))}
    </div>
  );
}