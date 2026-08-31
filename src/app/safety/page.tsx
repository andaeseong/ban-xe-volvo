'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { 
  Shield, 
  Car, 
  Eye, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { safetyFeaturesDatabase } from '@/lib/cars';
import { SafetyFeature } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const safetyCategories = [
  { id: 'active', name: 'An toàn chủ động', icon: Shield, description: 'Hệ thống chủ động ngăn chặn va chạm trước khi xảy ra', color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
  { id: 'passive', name: 'An toàn bị động', icon: Car, description: 'Bảo vệ tối đa khi va chạm không thể tránh khỏi', color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' },
  { id: 'driver-assistance', name: 'Hỗ trợ lái xe', icon: Eye, description: 'Công nghệ thông minh giảm căng thẳng cho người lái', color: 'text-purple-500', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' },
  { id: 'structural', name: 'Cấu trúc vững chắc', icon: Zap, description: 'Thiết kế khung gầm và vật liệu tiên tiến hấp thụ năng lượng', color: 'text-orange-500', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20' },
];

export default function SafetyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('all');
  const sectionRef = useRef<HTMLSectionElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.safety-category-section', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
      
      gsap.from('.safety-feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const filteredFeatures = safetyFeaturesDatabase.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeTab === 'all' || feature.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });
  
  const featuresByCategory = safetyCategories.map(cat => ({
    ...cat,
    features: filteredFeatures.filter(f => f.category === cat.id),
  }));
  
  const toggleFeature = (id: string) => {
    setExpandedFeatures(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-volvo-blue/10 via-transparent to-volvo-gold/10" aria-hidden="true" />
        <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
        
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-blue/10 text-volvo-blue text-sm font-medium mb-6">
            <Shield className="h-4 w-4" aria-hidden="true" />
            Cam kết an toàn số 1 thế giới
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            An toàn không chỉ là tính năng,<br />
            <span className="gradient-text">đó là DNA của Volvo</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mỗi chiếc Volvo được thiết kế với mục tiêu "Zero Collisions" - không có tử vong hay chấn thương nghiêm trọng trong xe Volvo mới. 
            Khám phá hơn 20 công nghệ an toàn tiên tiến được trang bị chuẩn trên mọi dòng xe.
          </p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Tìm kiếm tính năng an toàn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-volvo-blue/50 focus:border-transparent"
              aria-label="Tìm kiếm tính năng an toàn"
            />
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="flex flex-wrap gap-2">
              <TabsTrigger value="all">Tất cả ({safetyFeaturesDatabase.length})</TabsTrigger>
              {safetyCategories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name} ({safetyFeaturesDatabase.filter(f => f.category === cat.id).length})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <TabsContent value="all" className="mt-6">
          <div ref={sectionRef} className="space-y-8">
            {featuresByCategory.map(category => (
              category.features.length > 0 && (
                <section key={category.id} className="safety-category-section">
                  <div className={cn('mb-4 flex items-center gap-3 p-4 rounded-xl', category.bgColor, category.borderColor)}>
                    <category.icon className={cn('h-7 w-7', category.color)} aria-hidden="true" />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{category.name}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <span className="ml-auto px-3 py-1 rounded-full bg-background/50 text-sm font-medium text-foreground">
                      {category.features.length} tính năng
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.features.map(feature => (
                      <SafetyFeatureCard 
                        key={feature.id} 
                        feature={feature} 
                        isExpanded={expandedFeatures.has(feature.id)}
                        onToggle={() => toggleFeature(feature.id)}
                        categoryColor={category.color.replace('text-', '').replace('-500', '')}
                      />
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>
        </TabsContent>
        
        {safetyCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div ref={sectionRef} className="space-y-8">
              <section className="safety-category-section">
                <div className={cn('mb-6 flex items-center gap-3 p-4 rounded-xl', category.bgColor, category.borderColor)}>
                  <category.icon className={cn('h-8 w-8', category.color)} aria-hidden="true" />
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{category.name}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.features.map(feature => (
                    <SafetyFeatureCard 
                      key={feature.id} 
                      feature={feature} 
                      isExpanded={expandedFeatures.has(feature.id)}
                      onToggle={() => toggleFeature(feature.id)}
                      categoryColor={category.color.replace('text-', '').replace('-500', '')}
                    />
                  ))}
                </div>
              </section>
            </div>
          </TabsContent>
        ))}
      </div>
      
      <section className="py-16 md:py-24 bg-muted/50 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Công nghệ an toàn hàng đầu thế giới
            </h2>
            <p className="text-lg text-muted-foreground">
              Volvo là thương hiệu đầu tiên giới thiệu nhiều công nghệ an toàn hiện nay. 
              Cam kết "Zero Collisions" là động lực cho mọi đổi mới.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '1959', label: 'Thắt an toàn 3 điểm', desc: 'Phát minh thay đổi ngành ô tô', icon: Shield },
              { value: '1972', label: 'Ghế trẻ em ngửa', desc: 'Bảo vệ trẻ em tối ưu', icon: Car },
              { value: '1991', label: 'Hệ thống WHIPS', desc: 'Chống chấn thương cổ', icon: AlertTriangle },
              { value: '1998', label: 'SIPS & Túi khí bên', desc: 'Bảo vệ va chạm bên', icon: Zap },
              { value: '2003', label: 'BLIS', desc: 'Cảnh báo điểm mù', icon: Eye },
              { value: '2008', label: 'City Safety', desc: 'Phanh khẩn cấp tự động', icon: Shield },
              { value: '2014', label: 'Pilot Assist', desc: 'Hỗ trợ lái bán tự động', icon: Car },
              { value: '2020', label: 'LiDAR chuẩn', desc: 'Sẵn sàng tự lái hoàn toàn', icon: Zap },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="mx-auto mb-4 p-4 rounded-xl bg-background border border-border">
                  <item.icon className="h-8 w-8 mx-auto text-volvo-blue" aria-hidden="true" />
                </div>
                <p className="text-2xl font-bold text-volvo-blue">{item.value}</p>
                <p className="font-medium text-foreground mt-1">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-blue/10 text-volvo-blue text-sm font-medium mb-6">
                <Shield className="h-4 w-4" aria-hidden="true" />
                Cam kết an toàn
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Mục tiêu: Không tử vong
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Tầm nhìn 2030 của Volvo: Không ai tử vong hoặc bị chấn thương nghiêm trọng trong một chiếc Volvo mới. 
                Chúng tôi không chỉ xây dựng xe an toàn - chúng tôi xây dựng tương lai an toàn hơn cho tất cả.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Tất cả tính năng an toàn chủ động chuẩn bị</h4>
                    <p className="text-sm text-muted-foreground">City Safety, Pilot Assist, BLIS, Run-off Road Mitigation... chuẩn trên mọi dòng xe</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <CheckCircle className="h-5 w-5 text-blue-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cấu trúc khung gầm Boron Steel</h4>
                    <p className="text-sm text-muted-foreground">Thép Boron siêu cứng tạo nên lồng bảo vệ vững chắc nhất trong phân khúc</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <CheckCircle className="h-5 w-5 text-purple-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sẵn sàng cho kỷ nguyên tự lái</h4>
                    <p className="text-sm text-muted-foreground">LiDAR chuẩn, Core Computing NVIDIA DRIVE Orin, cập nhật OTA liên tục</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-volvo-blue/20 to-volvo-gold/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Shield className="h-24 w-24 mx-auto text-volvo-blue/30 mb-6" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Zero Collisions</h3>
                  <p className="text-muted-foreground">Mục tiêu 2030</p>
                  <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-volvo-blue">0</p>
                      <p className="text-muted-foreground">Tử vong</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-500">100%</p>
                      <p className="text-muted-foreground">Xe có an toàn chủ động</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SafetyFeatureCard({ feature, isExpanded, onToggle, categoryColor }: { feature: SafetyFeature; isExpanded: boolean; onToggle: () => void; categoryColor: string }) {
  return (
    <Card className="safety-feature-card p-4 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className="font-medium text-foreground">{feature.name}</h4>
            {!feature.standard && <Badge variant="accent" size="sm">Tùy chọn</Badge>}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{feature.description}</p>
        </div>
        <button
          onClick={onToggle}
          className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-border animate-in slide-down-0 duration-200">
          <ul className="space-y-1.5">
            {feature.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-50" style={{ color: `var(--color-${categoryColor}-500)` }} />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}