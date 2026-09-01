'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Star, Shield, Zap, Car, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    location: 'Hà Nội',
    car: 'XC60 Recharge T6',
    rating: 5,
    text: 'Đã sở hữu XC60 Recharge gần 1 năm. Tiêu thụ nhiên liệu cực kỳ tiết kiệm, chạy điện trong city hoàn toàn yên tâm. Hệ thống Pilot Assist hỗ trợ đắc lực trên cao tốc. Dịch vụ sau bán của Volvo VN rất chuyên nghiệp.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    location: 'TP. Hồ Chí Minh',
    car: 'EX30 Ultra',
    rating: 5,
    text: 'EX30 nhỏ gọn nhưng không gian nội thất rộng rãi bất ngờ. Sạc nhanh 10-80% chỉ 26 phút rất tiện cho đi làm hàng ngày. Thiết kế nội thất tối giản, chất liệu bền vững rất phù hợp gu hiện đại. An toàn tuyệt đối cho gia đình.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Lê Minh Cường',
    location: 'Đà Nẵng',
    car: 'XC90 Recharge T8',
    rating: 5,
    text: 'XC90 là lựa chọn hoàn hảo cho gia đình 2 con. 7 chỗ ngồi thoải mái, thùng xe lớn chứa đủ đồ cho chuyến đi xa. Hệ thống an toàn City Safety đã giúp tránh được va chạm một lần. Giá trị bán lại cao, yên tâm đầu tư.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    location: 'Cần Thơ',
    car: 'S90 Recharge T8',
    rating: 5,
    text: 'Sedan sang trọng S90 khiến tôi hài lòng tuyệt đối. Khôi phục năng lượng khi phanh rất hiệu quả. Hệ thống âm thanh Bowers & Wilkins nghe nhạc cực hay. Ghế massage ventilated thoải mái cho chuyến đường dài. Đáng đồng tiền bát gạo.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    location: 'Hải Phòng',
    car: 'V90 Cross Country',
    rating: 4,
    text: 'V90 Cross Country đáp ứng tốt nhu cầu đi đường trường và đường xóm. Khung gầm cao, AWD bám đường chắc chắn. Thiết kế wagon thể thao, thùng xe linh hoạt. Chỉ tiếc bản B6 không có hybrid plug-in như bản Recharge.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Võ Thị Phượng',
    location: 'Nha Trang',
    car: 'C40 Recharge Twin',
    rating: 5,
    text: 'C40 thiết kế coupe SUV rất đẹp, nổi bật trên đường. Năng suất 408 mã lực tăng tốc cực nhanh. Nội thất không da nhưng vẫn sang trọng, thân thiện môi trường. Sạc tại nhà qua Wallbox rất tiện. Hài lòng 100% quyết định mua.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
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
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 md:py-28 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-volvo-gold/5 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-gold/10 text-volvo-gold text-sm font-medium mb-6">
            <Star className="h-4 w-4" aria-hidden="true" />
            Khách hàng nói về Volvo
          </span>
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Tin cậy từ hơn
            <br />
            <span className="gradient-text">500.000 chủ xe</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Trải nghiệm thực tế từ những người sở hữu Volvo tại Việt Nam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <article 
              key={testimonial.id} 
              className={cn('testimonial-card group relative p-6 md:p-8 rounded-2xl bg-card border border-border', 'transition-all duration-300 hover:shadow-xl hover:border-volvo-blue/30 hover:-translate-y-1')}
            >
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img 
                  src={testimonial.avatar} 
                  alt="" 
                  className="h-12 w-12 rounded-full object-cover"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Car className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium text-foreground">{testimonial.car}</span>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="4.9/5" label="Đánh giá trung bình" icon={Star} color="text-yellow-500" />
          <StatCard value="98%" label="Khách hàng hài lòng" icon={Shield} color="text-green-500" />
          <StatCard value="95%" label="Tỷ lệ mua lại" icon={Car} color="text-blue-500" />
          <StatCard value="24/7" label="Hỗ trợ khách hàng" icon={User} color="text-purple-500" />
        </div>
        
        <div className="text-center mt-12">
          <a href="/reviews" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-volvo-blue text-volvo-blue font-medium hover:bg-volvo-blue/5 transition-colors">
            Xem tất cả đánh giá
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, icon: Icon, color }: { value: string; label: string; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-card border border-border">
      <div className={cn('mb-3 flex justify-center', color)}>
        <Icon className="h-8 w-8" aria-hidden="true" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
}