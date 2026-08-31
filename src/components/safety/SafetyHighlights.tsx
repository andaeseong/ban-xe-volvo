'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Car, Eye, Zap, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { safetyFeaturesDatabase } from '@/lib/cars';

gsap.registerPlugin(ScrollTrigger);

const safetyCategories = [
  {
    id: 'active',
    name: 'An toàn chủ động',
    icon: Shield,
    description: 'Hệ thống chủ động ngăn chặn va chạm trước khi xảy ra',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    features: ['city-safety', 'run-off-road', 'oncoming-lane', 'rear-collision', 'adaptive-headlights'],
  },
  {
    id: 'passive',
    name: 'An toàn bị động',
    icon: Car,
    description: 'Bảo vệ tối đa khi va chạm không thể tránh免受',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    features: ['airbags', 'whips', 'child-safety', 'safety-cage', 'sip'],
  },
  {
    id: 'driver-assistance',
    name: 'Hỗ trợ lái xe',
    icon: Eye,
    description: 'Công nghệ thông minh giảm căng thẳng cho người lái',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    features: ['pilot-assist', 'blis', 'driver-alert', 'traffic-sign', 'speed-limiter', '360-camera', 'head-up-display', 'park-assist'],
  },
  {
    id: 'structural',
    name: 'Cấu trúc vững chắc',
    icon: Zap,
    description: 'Thiết kế khung gầm và vật liệu tiên tiến hấp thụ năng lượng',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    features: ['safety-cage', 'sip'],
  },
];

export function SafetyHighlights() {
  const sectionRef = useRef<HTMLSectionElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.safety-category-card', {
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
      
      gsap.from('.safety-stat', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="safety-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-volvo-blue/5 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-blue/10 text-volvo-blue text-sm font-medium mb-6">
            <Shield className="h-4 w-4" aria-hidden="true" />
            Cam kết an toàn số 1 thế giới
          </span>
          <h2 id="safety-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            An toàn không chỉ là tính năng,<br />
            <span className="gradient-text">đó là DNA của Volvo</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mỗi chiếc Volvo được thiết kế với mục tiêu "Zero Collisions" - không có tử vong hay chấn thương nghiêm trọng trong xe Volvo mới.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyCategories.map((category, index) => (
            <article 
              key={category.id} 
              className={cn(
                'safety-category-card group relative p-6 md:p-8 rounded-2xl bg-card border border-border',
                'transition-all duration-300 hover:shadow-xl hover:border-volvo-blue/30'
              )}
            >
              <div className={cn('mb-4 p-4 rounded-xl', category.bgColor)}>
                <category.icon className={cn('h-8 w-8', category.color)} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
              <ul className="space-y-2 mb-6">
                {category.features.slice(0, 3).map(featureId => {
                  const feature = safetyFeaturesDatabase.find(f => f.id === featureId);
                  return feature ? (
                    <li key={feature.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className={cn('h-4 w-4 flex-shrink-0', category.color)} aria-hidden="true" />
                      {feature.name}
                    </li>
                  ) : null;
                })}
              </ul>
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <a href={`/safety#${category.id}`}>
                  Xem chi tiết <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </article>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatCard 
            value="50+" 
            label="Năm nghiên cứu an toàn" 
            icon={Shield}
            color="text-blue-500"
            index={0}
          />
          <StatCard 
            value="100+" 
            label="Giải thưởng an toàn" 
            icon={AlertTriangle}
            color="text-green-500"
            index={1}
          />
          <StatCard 
            value="0" 
            label="Mục tiêu tử vong" 
            icon={CheckCircle}
            color="text-purple-500"
            index={2}
          />
          <StatCard 
            value="20+" 
            label="Tính năng chuẩn" 
            icon={Car}
            color="text-orange-500"
            index={3}
          />
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />} asChild>
            <a href="/safety">Khám phá tất cả công nghệ an toàn</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, icon: Icon, color, index }: { value: string; label: string; icon: React.ComponentType<{ className?: string }>; color: string; index: number }) {
  return (
    <div className={cn('safety-stat text-center p-6 rounded-2xl bg-card border border-border', 'transition-all duration-300 hover:shadow-lg hover:border-volvo-blue/30')}>
      <div className={cn('mb-3 flex justify-center', color)}>
        <Icon className="h-8 w-8" aria-hidden="true" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-foreground">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
}