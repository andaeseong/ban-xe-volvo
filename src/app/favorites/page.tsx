'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Car, Heart, Trash2, ArrowRight, Zap, Shield, Share2, X, Filter, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import { volvoCars, getCarById } from '@/lib/cars';

export default function FavoritesPage() {
  const { items, removeItem, toggleItem, isFavorite, clearFavorites } = useFavoritesStore();
  const { addItem } = useCartStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const favoriteCars = items.map(id => getCarById(id)).filter(Boolean);
  
  const handleAddToCart = (car: any) => {
    addItem(car, 'Crystal White Pearl', []);
  };
  
  if (favoriteCars.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="text-center">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Chưa có xe yêu thích</h1>
          <p className="text-muted-foreground mb-6">Bạn chưa thêm xe nào vào danh sách yêu thích</p>
          <Button asChild variant="primary" size="lg">
            <Link href="/cars">Khám phá đội xe</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="py-8 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Yêu thích</h1>
              <p className="text-muted-foreground mt-1">{favoriteCars.length} mẫu xe đã lưu</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => { if (confirm('Xóa tất cả xe yêu thích?')) clearFavorites(); }}>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tất cả
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                aria-label="Chế độ lưới"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                aria-label="Chế độ danh sách"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteCars.map((car, index) => (
            <Card key={car!.id} className={cn('relative overflow-hidden transition-all hover:shadow-xl', viewMode === 'list' ? 'flex' : '')}>
              <button
                onClick={() => toggleItem(car!.id)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 text-red-500 hover:bg-white transition-colors"
                aria-label="Bỏ yêu thích"
              >
                <Heart className="h-5 w-5 fill-current" aria-hidden="true" />
              </button>
              
              <div className={cn('relative aspect-[4/3] overflow-hidden bg-muted', viewMode === 'list' ? 'w-48 flex-shrink-0' : '')}>
                <Link href={`/cars/${car!.id}`}>
                  <Image
                    src={car!.thumbnail}
                    alt={car!.model}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes={viewMode === 'list' ? "192px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                  />
                </Link>
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {car!.isNew && <Badge variant="accent" size="sm">Mới</Badge>}
                  {car!.isPopular && <Badge variant="outline" size="sm">Phổ biến</Badge>}
                  {car!.discount && <Badge variant="destructive" size="sm">-{car!.discount}%</Badge>}
                </div>
              </div>
              
              <div className={cn('p-4 flex flex-col', viewMode === 'list' ? 'flex-1 justify-between' : 'h-full')}>
                <Link href={`/cars/${car!.id}`} className="group">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{car!.category.toUpperCase()}</p>
                  <h3 className="font-semibold text-foreground group-hover:text-volvo-blue transition-colors line-clamp-1 mb-1">
                    {car!.model} {car!.trim}
                  </h3>
                  <p className="text-sm text-muted-foreground">{car!.year} • {car!.fuelType === 'electric' ? 'Điện' : car!.fuelType === 'plug-in-hybrid' ? 'Plug-in Hybrid' : 'Hybrid'} • {car!.drivetrain}</p>
                </Link>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="outline" size="sm" dot>
                    <Zap className="h-3 w-3" />
                    {car!.fuelType === 'electric' ? 'Điện' : car!.fuelType === 'plug-in-hybrid' ? 'Plug-in Hybrid' : 'Hybrid'}
                  </Badge>
                  <Badge variant="outline" size="sm" dot>
                    <Shield className="h-3 w-3" />
                    {car!.safetyFeatures.length} an toàn
                  </Badge>
                </div>
                
                <div className="flex items-baseline justify-between gap-2 mt-auto">
                  <div>
                    <p className="text-xl font-bold text-foreground">{formatPrice(car!.price)}</p>
                    {car!.originalPrice && <p className="text-sm text-muted-foreground line-through">{formatPrice(car!.originalPrice)}</p>}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAddToCart(car)}>Thêm giỏ</Button>
                    <Button variant="primary" size="sm" className="flex-1" asChild>
                      <Link href={`/cars/${car!.id}`}>Xem</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {favoriteCars.length > 8 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => {}}>
              Xem thêm
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}