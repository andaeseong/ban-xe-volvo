import { Hero } from '@/components/cars/Hero';
import { CarGrid } from '@/components/cars/CarGrid';
import { SafetyHighlights } from '@/components/safety/SafetyHighlights';
import { PaymentCalculator } from '@/components/payment/PaymentCalculator';
import { Testimonials } from '@/components/cars/Testimonials';
import { Newsletter } from '@/components/cars/Newsletter';
import { volvoCars, getNewCars, getPopularCars } from '@/lib/cars';

export default function Home() {
  const newCars = getNewCars().slice(0, 4);
  const popularCars = getPopularCars().slice(0, 4);
  const allCars = [...newCars, ...popularCars.filter(c => !newCars.some(nc => nc.id === c.id))].slice(0, 8);
  
  return (
    <>
      <Hero />
      
      <section className="py-20 md:py-28 lg:py-32" aria-labelledby="models-heading">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-blue/10 text-volvo-blue text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-volvo-gold animate-pulse-soft" />
                <span className="absolute inset-0 rounded-full bg-volvo-gold" />
              </span>
              Dòng xe mới nhất 2026
            </span>
            <h2 id="models-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              Khám phá đội xe Volvo
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Từ xe SUV điện hoàn toàn mới EX90 đến sedan sang trọng S90, 
              tìm chiếc xe phù hợp với lối sống của bạn.
            </p>
          </div>
          
          <CarGrid cars={allCars} />
          
          <div className="text-center mt-12">
            <a href="/cars" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-volvo-blue text-white font-medium hover:bg-volvo-blue-dark transition-colors">
              Xem tất cả 20 mẫu xe
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      <SafetyHighlights />
      
      <PaymentCalculator />
      
      <Testimonials />
      
      <Newsletter />
    </>
  );
}