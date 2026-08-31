'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Car } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heart, Zap, Shield, ChevronRight, Minus, Plus } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore, availableColors } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  variant?: 'default' | 'compact' | 'featured';
  priority?: boolean;
}

export function CarCard({ car, variant = 'default', priority = false }: CarCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const { isFavorite, toggleItem } = useFavoritesStore();
  const { addItem } = useCartStore();
  
  const isFav = isFavorite(car.id);
  const primaryImage = car.images[imageIndex] || car.thumbnail;
  const powertrainLabel = car.fuelType === 'electric' ? 'Điện' : 
    car.fuelType === 'plug-in-hybrid' ? 'Plug-in Hybrid' :
    car.fuelType === 'hybrid' ? 'Hybrid' :
    car.fuelType === 'mild-hybrid' ? 'Mild Hybrid' : 'Xăng/Dầu';
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(car, availableColors[0], []);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(car.id);
  };
  
  if (variant === 'compact') {
    return (
      <Link href={`/cars/${car.id}`} className="group flex gap-4 p-3 rounded-xl bg-card hover:bg-muted/50 transition-colors">
        <div className="relative h-24 w-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <Image
            src={car.thumbnail}
            alt={car.model}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="128px"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-foreground truncate">{car.model} {car.trim}</p>
            <p className="text-xs text-muted-foreground">{car.year} • {powertrainLabel}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">{formatPrice(car.price)}</span>
            <Button variant="ghost" size="sm" onClick={handleAddToCart}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <article className="relative group overflow-hidden rounded-2xl bg-card border border-border">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={car.images[0] || car.thumbnail}
            alt={car.model}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <div className="flex gap-2">
              {car.isNew && <Badge variant="accent" size="sm">Mới</Badge>}
              {car.isPopular && <Badge variant="outline" size="sm">Phổ biến</Badge>}
              {car.discount && <Badge variant="destructive" size="sm">-{car.discount}%</Badge>}
            </div>
            <button
              onClick={handleToggleFavorite}
              className={cn(
                'p-2 rounded-full transition-all',
                isFav ? 'bg-red-500 text-white' : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
              )}
              aria-label={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            >
              <Heart className={cn('h-5 w-5', isFav ? 'fill-current' : '')} aria-hidden="true" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-white/80 uppercase tracking-wider">{car.category.toUpperCase()}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{car.model} <span className="font-medium">{car.trim}</span></h3>
              <p className="text-white/80">{car.year} • {powertrainLabel} • {car.drivetrain}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold text-white">{formatPrice(car.price)}</p>
              {car.originalPrice && (
                <p className="text-white/60 line-through text-lg">{formatPrice(car.originalPrice)}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" dot>
              <Zap className="h-3 w-3" />
              {powertrainLabel}
            </Badge>
            <Badge variant="outline" dot>
              <Shield className="h-3 w-3" />
              {car.safetyFeatures.length} tính năng an toàn
            </Badge>
            <Badge variant="outline" dot>
              {car.seating} chỗ ngồi
            </Badge>
            {car.range && (
              <Badge variant="outline" dot>
                {car.range}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1" rightIcon={<ChevronRight className="h-4 w-4" />} asChild>
              <Link href={`/cars/${car.id}`}>Xem chi tiết</Link>
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleAddToCart}>
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </article>
    );
  }
  
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:border-volvo-blue/30">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImageIndex(prev => (prev - 1 + car.images.length) % car.images.length);
            }}
            className="p-2 rounded-full bg-white/80 text-foreground hover:bg-white transition-colors"
            aria-label="Ảnh trước"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          
          <Image
            src={primaryImage}
            alt={`${car.model} - Ảnh ${imageIndex + 1}/${car.images.length}`}
            fill
            priority={priority && imageIndex === 0}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImageIndex(prev => (prev + 1) % car.images.length);
            }}
            className="p-2 rounded-full bg-white/80 text-foreground hover:bg-white transition-colors"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {car.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setImageIndex(idx);
              }}
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-all',
                idx === imageIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white'
              )}
              aria-label={`Ảnh ${idx + 1}`}
              aria-current={idx === imageIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <div className="flex gap-1.5">
            {car.isNew && <Badge variant="accent" size="sm">Mới</Badge>}
            {car.isPopular && <Badge variant="outline" size="sm">Phổ biến</Badge>}
            {car.discount && <Badge variant="destructive" size="sm">-{car.discount}%</Badge>}
          </div>
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'p-2 rounded-full transition-all',
              isFav ? 'bg-red-500 text-white' : 'bg-white/80 text-foreground hover:bg-white'
            )}
            aria-label={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          >
            <Heart className={cn('h-5 w-5', isFav ? 'fill-current' : '')} aria-hidden="true" />
          </button>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{car.category.toUpperCase()}</p>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-volvo-blue transition-colors line-clamp-1">
              {car.model} {car.trim}
            </h3>
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{car.year}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" size="sm" dot>
            <Zap className="h-3 w-3" />
            {powertrainLabel}
          </Badge>
          <Badge variant="outline" size="sm" dot>
            <Shield className="h-3 w-3" />
            {car.safetyFeatures.length} an toàn
          </Badge>
          <Badge variant="outline" size="sm">{car.drivetrain}</Badge>
        </div>
        
        <div className="flex items-baseline justify-between gap-4 pt-2 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-foreground">{formatPrice(car.price)}</p>
            {car.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">{formatPrice(car.originalPrice)}</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/cars/${car.id}`}>Chi tiết</Link>
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddToCart} className="flex-1">
              Thêm
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}