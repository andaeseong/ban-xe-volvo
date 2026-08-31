'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { Car, Zap, Shield, ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.from(contentRef.current?.children || [], {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
      });
      
      tl.from('.hero-scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      }, '-=0.5');
      
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (heroRef.current) {
            heroRef.current.style.setProperty('--parallax-y', `${progress * 100}px`);
          }
        },
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="relative z-10">
          <Image
            src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1600&h=1000&fit=crop"
            alt=""
            width={1600}
            height={1000}
            priority
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 max-w-[90vw] max-h-[80vh] object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.3)] opacity-90"
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div 
        ref={contentRef} 
        className="relative z-20 mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-20 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 text-sm font-medium">
            <Zap className="h-4 w-4 text-volvo-gold" aria-hidden="true" />
            <span>EX90 - Xe SUV điện hoàn toàn mới</span>
            <span className="w-px h-4 bg-white/20 mx-1" />
            <Shield className="h-4 w-4 text-volvo-gold" aria-hidden="true" />
            <span>An toàn chuẩn mực vàng</span>
          </div>
          
          <h1 
            id="hero-title" 
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tighter text-white"
          >
            Tương lai của sự
            <br />
            <span className="gradient-text">an toàn & bền vững</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Khám phá Volvo EX90 - xe SUV điện hoàn toàn mới với công nghệ LiDAR tiên tiến, 
            Core Computing NVIDIA DRIVE Orin và phạm vi vận hành lên đến 600km.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="xl" 
              variant="primary" 
              rightIcon={<ArrowRight className="h-5 w-5" />}
              asChild
            >
              <Link href="/cars/volvo-ex90-2026">Khám phá EX90</Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/cars">Xem tất cả xe</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 md:gap-12 pt-8">
            <div className="flex items-center gap-3 text-white/80">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <Zap className="h-6 w-6 text-volvo-gold" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">600km</p>
                <p className="text-sm">Phạm vi WLTP</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <Shield className="h-6 w-6 text-volvo-gold" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">LiDAR</p>
                <p className="text-sm">Chuẩn bị tự lái</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                <Car className="h-6 w-6 text-volvo-gold" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">4.9s</p>
                <p className="text-sm">0-100 km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-pulse-soft" aria-hidden="true">
        <span className="text-xs uppercase tracking-widest">Cuộn để khám phá</span>
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}