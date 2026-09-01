'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CarGrid } from '@/components/cars/CarGrid';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Zap, 
  Car as CarIcon, 
  Users, 
  Settings,
  Grid,
  List,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { volvoCars } from '@/lib/cars';
import { Car } from '@/types';

const categories = [
  { value: 'all', label: 'Tất cả', icon: CarIcon },
  { value: 'electric', label: 'Xe điện', icon: Zap },
  { value: 'suv', label: 'SUV', icon: CarIcon },
  { value: 'sedan', label: 'Sedan', icon: CarIcon },
  { value: 'wagon', label: 'Wagon', icon: CarIcon },
  { value: 'hybrid', label: 'Hybrid', icon: Settings },
];

const fuelTypes = [
  { value: 'electric', label: 'Điện thuần túy' },
  { value: 'plug-in-hybrid', label: 'Plug-in Hybrid' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'mild-hybrid', label: 'Mild Hybrid' },
  { value: 'gasoline', label: 'Xăng' },
  { value: 'diesel', label: 'Dầu' },
];

const sortOptions = [
  { value: 'popularity', label: 'Phổ biến nhất' },
  { value: 'price-asc', label: 'Giá thấp đến cao' },
  { value: 'price-desc', label: 'Giá cao đến thấp' },
  { value: 'year-desc', label: 'Mới nhất' },
  { value: 'year-asc', label: 'Cũ nhất' },
];

const years = [...new Set(volvoCars.map(c => c.year))].sort((a, b) => b - a);

function CarsPageContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedDrivetrains, setSelectedDrivetrains] = useState<string[]>([]);
  const [selectedSeating, setSelectedSeating] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc'>('popularity');
  
  const initialCategory = searchParams.get('category');
  const initialFuelType = searchParams.get('fuelType');
  
  useEffect(() => {
    if (initialCategory && !selectedCategories.includes(initialCategory)) {
      setSelectedCategories([initialCategory]);
    }
    if (initialFuelType && !selectedFuelTypes.includes(initialFuelType)) {
      setSelectedFuelTypes([initialFuelType]);
    }
  }, [initialCategory, initialFuelType, selectedCategories, selectedFuelTypes]);
  
  const filteredCars = useMemo(() => {
    let result = [...volvoCars];
    
    if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
      result = result.filter(car => selectedCategories.includes(car.category));
    }
    
    if (selectedFuelTypes.length > 0) {
      result = result.filter(car => selectedFuelTypes.includes(car.fuelType));
    }
    
    if (selectedYears.length > 0) {
      result = result.filter(car => selectedYears.includes(car.year));
    }
    
    if (selectedDrivetrains.length > 0) {
      result = result.filter(car => selectedDrivetrains.includes(car.drivetrain));
    }
    
    if (selectedSeating.length > 0) {
      result = result.filter(car => selectedSeating.includes(car.seating));
    }
    
    result = result.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => {
          const aScore = (a.isPopular ? 100 : 0) + (a.isNew ? 50 : 0);
          const bScore = (b.isPopular ? 100 : 0) + (b.isNew ? 50 : 0);
          return bScore - aScore;
        });
        break;
    }
    
    return result;
  }, [selectedCategories, selectedFuelTypes, selectedYears, selectedDrivetrains, selectedSeating, priceRange, sortBy]);
  
  const hasActiveFilters = 
    selectedCategories.length > 0 ||
    selectedFuelTypes.length > 0 ||
    selectedYears.length > 0 ||
    selectedDrivetrains.length > 0 ||
    selectedSeating.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100000000;
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFuelTypes([]);
    setSelectedYears([]);
    setSelectedDrivetrains([]);
    setSelectedSeating([]);
    setPriceRange([0, 100000000]);
    setSortBy('popularity');
  };
  
  const removeCategory = (cat: string) => setSelectedCategories(prev => prev.filter(c => c !== cat));
  const removeFuelType = (ft: string) => setSelectedFuelTypes(prev => prev.filter(f => f !== ft));
  const removeYear = (y: number) => setSelectedYears(prev => prev.filter(yr => yr !== y));
  const removeDrivetrain = (d: string) => setSelectedDrivetrains(prev => prev.filter(dt => dt !== d));
  const removeSeating = (s: number) => setSelectedSeating(prev => prev.filter(st => st !== s));
  
  return (
    <div className="min-h-screen bg-background">
      <div className="relative py-12 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              Khám phá đội xe Volvo
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              20 mẫu xe từ 2020-2026: Xe điện, Hybrid, Plug-in Hybrid, SUV, Sedan, Wagon.
              Tất cả đều trang bị công nghệ an toàn hàng đầu thế giới.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={cn(
            'lg:w-72 flex-shrink-0',
            showFilters ? 'block' : 'hidden lg:block'
          )}>
            <div className="sticky top-24 space-y-6">
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Bộ lọc</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4 mr-1" />
                      Xóa tất cả
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  <FilterSection
                    title="Danh mục"
                    icon={CarIcon}
                    options={categories.map(c => ({ value: c.value, label: c.label }))}
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                    multiple
                  />
                  
                  <FilterSection
                    title="Loại nhiên liệu"
                    icon={Zap}
                    options={fuelTypes}
                    selected={selectedFuelTypes}
                    onChange={setSelectedFuelTypes}
                    multiple
                  />
                  
                  <FilterSection
                    title="Năm sản xuất"
                    icon={Settings}
                    options={years.map(y => ({ value: y.toString(), label: y.toString() }))}
                    selected={selectedYears.map(y => y.toString())}
                    onChange={(vals) => setSelectedYears(vals.map(v => parseInt(v)))}
                    multiple
                  />
                  
                  <FilterSection
                    title="Hệ dẫn động"
                    icon={Settings}
                    options={[
                      { value: 'AWD', label: 'AWD (4WD)' },
                      { value: 'FWD', label: 'FWD (Dẫn động trước)' },
                      { value: 'RWD', label: 'RWD (Dẫn động sau)' },
                    ]}
                    selected={selectedDrivetrains}
                    onChange={setSelectedDrivetrains}
                    multiple
                  />
                  
                  <FilterSection
                    title="Số chỗ ngồi"
                    icon={Users}
                    options={[
                      { value: '5', label: '5 chỗ' },
                      { value: '7', label: '7 chỗ' },
                    ]}
                    selected={selectedSeating.map(s => s.toString())}
                    onChange={(vals) => setSelectedSeating(vals.map(v => parseInt(v)))}
                    multiple
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <span className="p-2 rounded-lg bg-muted">{formatPrice(priceRange[0])}</span>
                      <span className="text-muted-foreground">-</span>
                      <span className="p-2 rounded-lg bg-muted">{formatPrice(priceRange[1])}</span>
                    </label>
                    <Slider
                      min={0}
                      max={100000000}
                      step={1000000}
                      value={priceRange}
                      onValueChange={(v) => setPriceRange(v as [number, number])}
                      aria-label="Khoảng giá"
                    />
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-4">Sắp xếp</h3>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
              </Card>
            </div>
          </aside>
          
          <main className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Tìm thấy <span className="font-semibold text-foreground">{filteredCars.length}</span> mẫu xe
                </span>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
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
            
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Bộ lọc đang áp dụng">
                {selectedCategories.filter(c => c !== 'all').map(cat => (
                  <Badge key={cat} variant="outline" size="sm" onRemove={() => removeCategory(cat)}>
                    {categories.find(c => c.value === cat)?.label || cat}
                  </Badge>
                ))}
                {selectedFuelTypes.map(ft => (
                  <Badge key={ft} variant="outline" size="sm" onRemove={() => removeFuelType(ft)}>
                    {fuelTypes.find(f => f.value === ft)?.label || ft}
                  </Badge>
                ))}
                {selectedYears.map(y => (
                  <Badge key={y} variant="outline" size="sm" onRemove={() => removeYear(y)}>
                    {y}
                  </Badge>
                ))}
                {selectedDrivetrains.map(d => (
                  <Badge key={d} variant="outline" size="sm" onRemove={() => removeDrivetrain(d)}>
                    {d}
                  </Badge>
                ))}
                {selectedSeating.map(s => (
                  <Badge key={s} variant="outline" size="sm" onRemove={() => removeSeating(s)}>
                    {s} chỗ
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 100000000) && (
                  <Badge variant="outline" size="sm" onRemove={() => setPriceRange([0, 100000000])}>
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </Badge>
                )}
              </div>
            )}
            
            {filteredCars.length > 0 ? (
              <CarGrid 
                cars={filteredCars} 
                variant={viewMode === 'list' ? 'compact' : 'default'}
                columns={viewMode === 'list' ? 1 : 3}
              />
            ) : (
              <div className="text-center py-16">
                <CarIcon className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">Không tìm thấy xe phù hợp</h3>
                <p className="text-muted-foreground mb-6">Hãy thử điều chỉnh bộ lọc hoặc xóa tất cả bộ lọc</p>
                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}
            
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="primary" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm">5</Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-volvo-blue border-t-transparent rounded-full" /></div>}>
      <CarsPageContent />
    </Suspense>
  );
}

function FilterSection({ 
  title, 
  icon: Icon, 
  options, 
  selected, 
  onChange, 
  multiple 
}: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  options: { value: string; label: string }[]; 
  selected: string[]; 
  onChange: (vals: string[]) => void; 
  multiple: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
        <Icon className="h-4 w-4 text-volvo-blue" aria-hidden="true" />
        {title}
      </label>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type={multiple ? 'checkbox' : 'radio'}
              checked={selected.includes(opt.value)}
              onChange={(e) => {
                if (multiple) {
                  if (e.target.checked) {
                    onChange([...selected, opt.value]);
                  } else {
                    onChange(selected.filter(v => v !== opt.value));
                  }
                } else {
                  onChange(e.target.checked ? [opt.value] : []);
                }
              }}
              className="h-4 w-4 rounded border-border text-volvo-blue focus:ring-volvo-blue"
            />
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}