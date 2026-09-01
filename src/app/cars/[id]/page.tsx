'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { CarCard } from '@/components/cars/CarCard';
import { CarGrid } from '@/components/cars/CarGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { 
  Car, 
  Zap, 
  Shield, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Download,
  Calendar,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  Minus,
  Plus
} from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { volvoCars, getCarById, getSafetyFeaturesByIds } from '@/lib/cars';
import { Car as CarType } from '@/types';
import { useCartStore, availableColors, availableOptions } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function CarDetailPage() {
  const params = useParams();
  const carId = params.id as string;
  const car = getCarById(carId);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const { addItem } = useCartStore();
  const { isFavorite, toggleItem } = useFavoritesStore();
  const isFav = car ? isFavorite(car.id) : false;
  
  const safetyFeatures = car ? getSafetyFeaturesByIds(car.safetyFeatures) : [];
  const standardSafety = safetyFeatures.filter(f => f.standard);
  const optionalSafety = safetyFeatures.filter(f => !f.standard);
  
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Car className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy xe</h1>
          <p className="text-muted-foreground mb-6">Mẫu xe này không tồn tại hoặc đã bị xóa</p>
          <Button asChild variant="primary">
            <a href="/cars">Quay lại danh sách xe</a>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem(car, selectedColor, selectedOptions);
  };
  
  const handleToggleFavorite = () => {
    toggleItem(car.id);
  };
  
  const primaryImage = car.images[imageIndex] || car.thumbnail;
  
  return (
    <div className="min-h-screen bg-background">
      <nav className="py-4 bg-muted/50 border-b border-border" aria-label="Breadcrumb">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><a href="/" className="hover:text-foreground transition-colors">Trang chủ</a></li>
            <li><ChevronRight className="h-4 w-4" aria-hidden="true" /></li>
            <li><a href="/cars" className="hover:text-foreground transition-colors">Xe mới</a></li>
            <li><ChevronRight className="h-4 w-4" aria-hidden="true" /></li>
            <li><a href={`/cars?category=${car.category}`} className="hover:text-foreground transition-colors capitalize">{car.category}</a></li>
            <li><ChevronRight className="h-4 w-4" aria-hidden="true" /></li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{car.model} {car.trim}</li>
          </ol>
        </div>
      </nav>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <Image
                src={primaryImage}
                alt={`${car.model} ${car.trim} - Ảnh ${imageIndex + 1}/${car.images.length}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-1.5">
                {car.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
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
              
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="flex gap-2">
                  {car.isNew && <Badge variant="accent">Mới</Badge>}
                  {car.isPopular && <Badge variant="outline">Phổ biến</Badge>}
                  {car.discount && <Badge variant="destructive">-{car.discount}%</Badge>}
                </div>
                <div className="flex gap-2">
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
                  <button className="p-2 rounded-full bg-white/80 text-foreground hover:bg-white transition-colors" aria-label="Chia sẻ">
                    <Share2 className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button className="p-2 rounded-full bg-white/80 text-foreground hover:bg-white transition-colors" aria-label="Tải brochure">
                    <Download className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={cn(
                    'flex-shrink-0 relative h-20 w-28 rounded-xl overflow-hidden border-2 transition-all',
                    idx === imageIndex 
                      ? 'border-volvo-blue' 
                      : 'border-transparent hover:border-volvo-blue/50'
                  )}
                  aria-label={`Xem ảnh ${idx + 1}`}
                  aria-current={idx === imageIndex ? 'true' : 'false'}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <Card className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{car.category.toUpperCase()}</span>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1">{car.model} <span className="font-medium">{car.trim}</span></h1>
                  <p className="text-muted-foreground mt-1">{car.year} • {car.fuelType === 'electric' ? 'Điện' : car.fuelType === 'plug-in-hybrid' ? 'Plug-in Hybrid' : car.fuelType === 'hybrid' ? 'Hybrid' : car.fuelType === 'mild-hybrid' ? 'Mild Hybrid' : 'Xăng/Dầu'} • {car.drivetrain}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" dot>
                    <Zap className="h-3 w-3" />
                    {car.fuelType === 'electric' ? 'Điện' : car.fuelType === 'plug-in-hybrid' ? 'Plug-in Hybrid' : car.fuelType === 'hybrid' ? 'Hybrid' : car.fuelType === 'mild-hybrid' ? 'Mild Hybrid' : 'Xăng/Dầu'}
                  </Badge>
                  <Badge variant="outline" dot>
                    <Settings className="h-3 w-3" />
                    {car.transmission === 'automatic' ? 'Tự động' : 'Số sàn'}
                  </Badge>
                  <Badge variant="outline" dot>
                    <Car className="h-3 w-3" />
                    {car.drivetrain}
                  </Badge>
                  <Badge variant="outline">{car.seating} chỗ</Badge>
                </div>
                
                <div className="flex items-baseline justify-between gap-4 mb-6 pt-4 border-t border-border">
                  <div>
                    <p className="text-3xl font-bold text-foreground">{formatPrice(car.price)}</p>
                    {car.originalPrice && (
                      <p className="text-lg text-muted-foreground line-through">{formatPrice(car.originalPrice)}</p>
                    )}
                  </div>
                  <Badge variant="accent" className="text-base px-4 py-2">
                    {car.discount ? `${car.discount}% OFF` : 'Giá tốt nhất'}
                  </Badge>
                </div>
                
                <div className="flex gap-3 mb-6">
                  <Button 
                    variant="primary" 
                    className="flex-1" 
                    size="lg"
                    onClick={handleAddToCart}
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    size="lg"
                    onClick={() => {}}
                    rightIcon={<Calendar className="h-5 w-5" />}
                  >
                    Đặt lịch lái thử
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>Có sẵn tại đại lý</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Hotline: 1800 555 888</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                  Tùy chọn mua hàng
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Màu sơn</label>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.slice(0, 8).map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            'px-4 py-2 rounded-full text-sm font-medium transition-all border-2',
                            selectedColor === color
                              ? 'border-volvo-blue bg-volvo-blue/5 text-volvo-blue'
                              : 'border-border hover:border-volvo-blue/50'
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Gói tùy chọn</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {availableOptions.map(option => (
                        <label key={option} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedOptions([...selectedOptions, option]);
                              } else {
                                setSelectedOptions(selectedOptions.filter(o => o !== option));
                              }
                            }}
                            className="h-4 w-4 rounded border-border text-volvo-blue focus:ring-volvo-blue"
                          />
                          <span className="text-sm text-foreground">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Giá xe</span>
                      <span className="font-medium">{formatPrice(car.price)}</span>
                    </div>
                    {selectedOptions.length > 0 && (
                      <div className="flex justify-between text-volvo-blue">
                        <span>Tùy chọn ({selectedOptions.length})</span>
                        <span className="font-medium">+ {formatPrice(selectedOptions.length * 5000000)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-border font-semibold text-lg">
                      <span>Tạm tính</span>
                      <span>{formatPrice(car.price + selectedOptions.length * 5000000)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="safety">An toàn</TabsTrigger>
              <TabsTrigger value="features">Tính năng</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{car.description}</p>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">Điểm nổi bật</h3>
                <ul className="space-y-3">
                  {car.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <SpecSection title="Động cơ & Hiệu suất" icon={Zap} specs={[
                  { label: 'Động cơ', value: car.specs.engine },
                  { label: 'Công suất tối đa', value: car.specs.power },
                  { label: 'Mô men xoắn tối đa', value: car.specs.torque },
                  { label: 'Tăng tốc 0-100 km/h', value: car.specs.acceleration },
                  { label: 'Tốc độ tối đa', value: car.specs.topSpeed },
                  ...(car.specs.range ? [{ label: 'Phạm vi (WLTP)', value: car.specs.range }] : []),
                  ...(car.specs.batteryCapacity ? [{ label: 'Dung lượng pin', value: car.specs.batteryCapacity }] : []),
                  ...(car.specs.chargingTime ? [{ label: 'Thời gian sạc 10-80%', value: car.specs.chargingTime }] : []),
                  { label: 'Tiêu thụ nhiên liệu/Điện', value: car.specs.fuelEconomy },
                  { label: 'Khí thải CO2', value: car.specs.co2Emissions },
                ]} />
                
                <SpecSection title="Kích thước & Trọng lượng" icon={Settings} specs={[
                  { label: 'Dài x Rộng x Cao', value: `${car.specs.dimensions.length} x ${car.specs.dimensions.width} x ${car.specs.dimensions.height}` },
                  { label: 'Cơ sở bánh xe', value: car.specs.dimensions.wheelbase },
                  { label: 'Trọng lượng', value: car.specs.weight },
                  { label: 'Dung tích thùng xe', value: car.specs.cargoCapacity },
                  ...(car.specs.towingCapacity ? [{ label: 'Khả năng kéo', value: car.specs.towingCapacity }] : []),
                ]} />
              </div>
            </TabsContent>
            
            <TabsContent value="safety" className="mt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" aria-hidden="true" />
                    Tính năng an toàn chuẩn ({standardSafety.length})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {standardSafety.map(feature => (
                      <SafetyFeatureCard key={feature.id} feature={feature} />
                    ))}
                  </div>
                </div>
                
                {optionalSafety.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-amber-500" aria-hidden="true" />
                      Tính năng an toàn tùy chọn ({optionalSafety.length})
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {optionalSafety.map(feature => (
                        <SafetyFeatureCard key={feature.id} feature={feature} optional />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: 'Hệ thống điện', items: ['Sạc nhanh DC', 'Sạc không dây (tùy chọn)', 'Cổng sạc Type 2', 'Quản lý năng lượng thông minh'] },
                  { icon: Settings, title: 'Công nghệ & Kết nối', items: ['Google Automotive Services', 'Apple CarPlay không dây', 'Android Auto không dây', 'Cập nhật OTA', 'Volvo Cars App', 'Khóa số Digital Key'] },
                  { icon: Car, title: 'Thoải mái & Tiện ích', items: ['Khí điều hòa 2-4 vùng', 'Làm sạch không khí PM2.5', 'Ghế trước điều chỉnh điện', 'Ghế massage & ventilated', 'Cửa sổ trời toàn cảnh', 'Cửa hậu tự động không tay'] },
                ].map((cat, i) => (
                  <FeatureCategory key={i} {...cat} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="text-center py-12">
                <Shield className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Đánh giá khách hàng</h3>
                <p className="text-muted-foreground mb-6">Đang tải đánh giá thực tế từ chủ xe Volvo...</p>
                <Button variant="outline" asChild>
                  <a href="/reviews">Xem tất cả đánh giá</a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Có thể bạn quan tâm</h2>
          <CarGrid 
            cars={volvoCars.filter(c => c.id !== car.id && c.category === car.category).slice(0, 4)} 
            columns={4}
          />
        </div>
      </div>
    </div>
  );
}

function SpecSection({ title, icon: Icon, specs }: { title: string; icon: React.ComponentType<{ className?: string }>; specs: { label: string; value: string }[] }) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
        {title}
      </h3>
      <dl className="space-y-3">
        {specs.map((spec, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
            <dt className="text-sm text-muted-foreground">{spec.label}</dt>
            <dd className="text-sm font-medium text-foreground text-right max-w-[60%] truncate">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function SafetyFeatureCard({ feature, optional = false }: { feature: { id: string; name: string; description: string; details: string[] }; optional?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className={cn('p-4', optional && 'border-amber-500/30 bg-amber-500/5')}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-foreground">{feature.name}</h4>
            {optional && <Badge variant="accent" size="sm">Tùy chọn</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={expanded}
          aria-label={expanded ? 'Thu gọn' : 'Mở rộng'}
        >
          <ChevronRight className={cn('h-5 w-5 transition-transform', expanded && 'rotate-90')} />
        </button>
      </div>
      {expanded && (
        <ul className="mt-3 space-y-1.5 pl-4 border-l-2 border-volvo-blue/20">
          {feature.details.map((detail, i) => (
            <li key={i} className="text-sm text-muted-foreground relative">
              <span className="absolute -left-4 top-1 h-1.5 w-1.5 rounded-full bg-volvo-blue" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function FeatureCategory({ icon: Icon, title, items }: { icon: React.ComponentType<{ className?: string }>; title: string; items: string[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-volvo-blue/10 text-volvo-blue">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}