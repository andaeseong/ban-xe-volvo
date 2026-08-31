'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mail, CheckCircle, Shield, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const newsletterSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  consent: z.boolean().refine(val => val === true, 'Bạn cần đồng ý nhận thông tin'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });
  
  const onSubmit = async (data: NewsletterFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <section className="relative py-20 md:py-28 lg:py-32" aria-labelledby="newsletter-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-volvo-blue/10 via-transparent to-volvo-gold/10" aria-hidden="true" />
        <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
        
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-6 p-4 rounded-full bg-green-500/10 w-20 h-20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cảm ơn bạn đã đăng ký!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Bạn sẽ nhận được tin tức mới nhất, ưu đãi đặc biệt và lời mời sự kiện từ Volvo Cars Việt Nam.
            </p>
            <Button variant="ghost" size="lg" onClick={() => setIsSubmitted(false)}>
              Đăng ký email khác
            </Button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="relative py-20 md:py-28 lg:py-32" aria-labelledby="newsletter-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-volvo-blue/10 via-transparent to-volvo-gold/10" aria-hidden="true" />
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-blue/10 text-volvo-blue text-sm font-medium mb-6">
              <Zap className="h-4 w-4" aria-hidden="true" />
              Tin tức & Ưu đãi độc quyền
            </span>
            <h2 id="newsletter-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              Cập nhật sớm nhất
              <br />
              <span className="gradient-text">đội xe Volvo mới</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Đăng ký nhận bản tin để không bỏ lỡ: ra mắt xe mới, chương trình khuyến mãi, 
              sự kiện lái thử và công nghệ an toàn tiên tiến.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                </div>
                <span className="text-sm text-muted-foreground">Không spam, hủy đăng ký bất kỳ lúc nào</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Shield className="h-5 w-5 text-blue-500" aria-hidden="true" />
                </div>
                <span className="text-sm text-muted-foreground">Bảo mật thông tin tuyệt đối</span>
              </div>
            </div>
          </div>
          
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Địa chỉ email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nguyen.van.a@email.com"
                    className="pl-12"
                    {...register('email')}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 rounded border-border text-volvo-blue focus:ring-volvo-blue"
                  {...register('consent')}
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                  Tôi đồng ý nhận email marketing từ Volvo Cars Việt Nam bao gồm tin tức sản phẩm, 
                  ưu đãi, sự kiện và khảo sát. Xem <a href="/privacy" className="text-volvo-blue hover:underline">Chính sách bảo mật</a>.
                </label>
              </div>
              {errors.consent && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.consent.message}
                </p>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Đăng ký nhận tin
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Bằng cách đăng ký, bạn đồng ý với <a href="/terms" className="text-volvo-blue hover:underline">Điều khoản sử dụng</a> 
                và <a href="/privacy" className="text-volvo-blue hover:underline">Chính sách bảo mật</a> của Volvo.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}