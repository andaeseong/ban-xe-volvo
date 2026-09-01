'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CarSelector } from '@/components/cars/CarSelector';
import { Car, Calendar, Clock, MapPin, Phone, Mail, CheckCircle, ArrowRight, Shield, Zap, User, Sparkles, Award } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { volvoCars, getCarById } from '@/lib/cars';

const testDriveSchema = z.object({
  carId: z.string().min(1, 'Vui lòng chọn xe'),
  firstName: z.string().min(2, 'Họ phải có ít nhất 2 ký tự'),
  lastName: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').max(11, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  province: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  dealer: z.string().min(1, 'Vui lòng chọn đại lý'),
  preferredDate: z.string().min(1, 'Vui lòng chọn ngày'),
  preferredTime: z.string().min(1, 'Vui lòng chọn khung giờ'),
  notes: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Bạn cần đồng ý điều khoản'),
});

type TestDriveFormData = z.infer<typeof testDriveSchema>;

const provinces = [
  { value: 'hanoi', label: 'Hà Nội' },
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'danang', label: 'Đà Nẵng' },
  { value: 'cantho', label: 'Cần Thơ' },
  { value: 'haiphong', label: 'Hải Phòng' },
  { value: 'binhduong', label: 'Bình Dương' },
  { value: 'dongnai', label: 'Đồng Nai' },
  { value: 'khanhhoa', label: 'Khánh Hòa' },
];

const dealersByProvince: Record<string, { value: string; label: string }[]> = {
  hanoi: [
    { value: 'hanoi-1', label: 'Volvo Cars Hà Nội - Đại lý授权 1' },
    { value: 'hanoi-2', label: 'Volvo Cars Hà Nội - Đại lý授权 2' },
    { value: 'hanoi-3', label: 'Volvo Cars Hà Nội - Đại lý授权 3' },
  ],
  hcm: [
    { value: 'hcm-1', label: 'Volvo Cars Sài Gòn - Đại lý授权 1' },
    { value: 'hcm-2', label: 'Volvo Cars Sài Gòn - Đại lý授权 2' },
    { value: 'hcm-3', label: 'Volvo Cars Sài Gòn - Đại lý授权 3' },
    { value: 'hcm-4', label: 'Volvo Cars Sài Gòn - Đại lý授权 4' },
  ],
  danang: [
    { value: 'danang-1', label: 'Volvo Cars Đà Nẵng - Đại lý授权 1' },
  ],
  cantho: [
    { value: 'cantho-1', label: 'Volvo Cars Cần Thơ - Đại lý授权 1' },
  ],
  haiphong: [
    { value: 'haiphong-1', label: 'Volvo Cars Hải Phòng - Đại lý授权 1' },
  ],
  binhduong: [
    { value: 'binhduong-1', label: 'Volvo Cars Bình Dương - Đại lý授权 1' },
  ],
  dongnai: [
    { value: 'dongnai-1', label: 'Volvo Cars Đồng Nai - Đại lý授权 1' },
  ],
  khanhhoa: [
    { value: 'khanhhoa-1', label: 'Volvo Cars Nha Trang - Đại lý授权 1' },
  ],
};

const timeSlots = [
  { value: 'morning', label: 'Sáng (8:00 - 11:30)' },
  { value: 'afternoon', label: 'Chiều (13:30 - 17:00)' },
  { value: 'evening', label: 'Tối (17:30 - 20:00)' },
];

export default function TestDrivePage() {
  const [selectedCar, setSelectedCar] = useState(volvoCars[0]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      carId: selectedCar.id,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      province: '',
      dealer: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
      consent: false,
    },
  });
  
  const watchedProvince = watch('province');
  
  const handleCarChange = (carId: string) => {
    const car = getCarById(carId);
    if (car) {
      setSelectedCar(car);
      setValue('carId', car.id);
    }
  };
  
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setValue('dealer', '');
  };
  
  const onSubmit = async (data: TestDriveFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="py-8 bg-muted/50 border-b border-border">
          <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Đặt lịch lái thử</h1>
          </div>
        </div>
        
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-6 p-4 rounded-full bg-green-500/10 w-20 h-20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Đăng ký thành công!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cảm ơn bạn đã đăng ký lái thử <strong className="text-foreground">{selectedCar.model} {selectedCar.trim}</strong>. 
              Đội ngũ tư vấn sẽ liên hệ với bạn trong vòng 30 phút để xác nhận lịch hẹn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <a href="/cars">Tiếp tục khám phá</a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsSubmitted(false)}>
                Đăng ký xe khác
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="py-8 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Đặt lịch lái thử</h1>
          <p className="text-muted-foreground mt-1">Trải nghiệm trực tiếp hiệu suất, an toàn và sự thoải mái của Volvo</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="double-bezel sticky top-24">
              <div className="double-bezel-inner p-5 sm:p-6 space-y-5">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#003057] text-white shadow-volvo">
                    <Car className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">Chọn xe lái thử</h3>
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">{volvoCars.length} mẫu xe • Điện • Hybrid • Xăng</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-amber-900 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-300">
                    <Sparkles className="h-3 w-3" /> 2026
                  </span>
                </div>

                {/* Premium Car Selector */}
                <CarSelector
                  cars={volvoCars}
                  selectedCarId={selectedCar.id}
                  onSelect={handleCarChange}
                  label="Chọn xe lái thử"
                />
                {/* Hidden native select for form validation */}
                <select {...register('carId')} value={selectedCar.id} onChange={e => handleCarChange(e.target.value)} className="sr-only" aria-hidden="true" tabIndex={-1}>
                  {volvoCars.map(car => (
                    <option key={car.id} value={car.id}>{car.model} {car.trim}</option>
                  ))}
                </select>
                {errors.carId && <p className="text-sm text-red-600 dark:text-red-400 -mt-3">{errors.carId.message}</p>}
                
                {/* Summary - High contrast */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3 dark:bg-slate-800/50 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Tóm tắt lựa chọn</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Có sẵn giao ngay
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white border border-slate-200 p-2.5 text-center shadow-sm dark:bg-slate-900 dark:border-slate-700">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Giá niêm yết</p>
                      <p className="mt-1 text-[13px] font-bold text-[#003057] dark:text-sky-400 leading-tight">{formatPrice(selectedCar.price)}</p>
                    </div>
                    <div className="rounded-xl bg-white border border-slate-200 p-2.5 text-center shadow-sm dark:bg-slate-900 dark:border-slate-700">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Nhiên liệu</p>
                      <p className="mt-1 text-[13px] font-bold text-slate-900 dark:text-white leading-tight truncate">{selectedCar.fuelType === 'electric' ? 'Điện' : selectedCar.fuelType === 'plug-in-hybrid' ? 'PHEV' : 'Hybrid'}</p>
                    </div>
                    <div className="rounded-xl bg-white border border-slate-200 p-2.5 text-center shadow-sm dark:bg-slate-900 dark:border-slate-700">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Năm</p>
                      <p className="mt-1 text-[13px] font-bold text-slate-900 dark:text-white">{selectedCar.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl bg-[#003057] px-3.5 py-2.5 text-white dark:bg-slate-900 dark:border dark:border-slate-700 dark:text-slate-100">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
                      <Award className="h-4 w-4 text-amber-300" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight">Bảo hành 3 năm • Bảo dưỡng miễn phí 60.000km</p>
                      <p className="text-[11px] font-medium text-white/80 dark:text-slate-400">Áp dụng toàn quốc • Hỗ trợ 24/7</p>
                    </div>
                  </div>
                </div>
                
                {/* Benefits - Premium */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Quyền lợi lái thử</p>
                  {[
                    { icon: Shield, title: 'Bảo hiểm miễn phí', desc: 'Toàn rủi ro trong quá trình lái thử', color: 'emerald' },
                    { icon: Zap, title: 'Tư vấn viên riêng', desc: 'Hỗ trợ trọn gói từ A–Z', color: 'sky' },
                    { icon: User, title: 'Quà tặng 1.000.000đ', desc: 'Voucher bảo dưỡng khi lái thử', color: 'amber' },
                  ].map(item => (
                    <div key={item.title} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:border-slate-300 hover:shadow-md transition-all dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-600">
                      <div className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
                        item.color === 'emerald' && 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400',
                        item.color === 'sky' && 'bg-sky-50 border-sky-200 text-sky-600 dark:bg-sky-500/15 dark:border-sky-500/30 dark:text-sky-400',
                        item.color === 'amber' && 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-400',
                      )}>
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-bold leading-tight text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
                      </div>
                      <span className="hidden sm:inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Thông tin đăng ký</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Họ <span className="text-destructive">*</span></label>
                  <Input
                    placeholder="Nguyễn"
                    {...register('firstName')}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && <p id="firstName-error" className="text-sm text-destructive mt-1" role="alert">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tên <span className="text-destructive">*</span></label>
                  <Input
                    placeholder="Văn A"
                    {...register('lastName')}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && <p id="lastName-error" className="text-sm text-destructive mt-1" role="alert">{errors.lastName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Số điện thoại <span className="text-destructive">*</span></label>
                  <Input
                    type="tel"
                    placeholder="090 123 4567"
                    {...register('phone')}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p id="phone-error" className="text-sm text-destructive mt-1" role="alert">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email <span className="text-destructive">*</span></label>
                  <Input
                    type="email"
                    placeholder="nguyen.van.a@email.com"
                    {...register('email')}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p id="email-error" className="text-sm text-destructive mt-1" role="alert">{errors.email.message}</p>}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tỉnh/Thành phố <span className="text-destructive">*</span></label>
                  <Select
                    {...register('province')}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    aria-describedby={errors.province ? 'province-error' : undefined}
                    aria-invalid={!!errors.province}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </Select>
                  {errors.province && <p id="province-error" className="text-sm text-destructive mt-1" role="alert">{errors.province.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Đại lý <span className="text-destructive">*</span></label>
                  <Select
                    {...register('dealer')}
                    disabled={!selectedProvince}
                    aria-describedby={errors.dealer ? 'dealer-error' : undefined}
                    aria-invalid={!!errors.dealer}
                  >
                    <option value="">Chọn đại lý</option>
                    {selectedProvince && dealersByProvince[selectedProvince]?.map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </Select>
                  {errors.dealer && <p id="dealer-error" className="text-sm text-destructive mt-1" role="alert">{errors.dealer.message}</p>}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ngày mong muốn <span className="text-destructive">*</span></label>
                  <Input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('preferredDate')}
                    aria-describedby={errors.preferredDate ? 'date-error' : undefined}
                    aria-invalid={!!errors.preferredDate}
                  />
                  {errors.preferredDate && <p id="date-error" className="text-sm text-destructive mt-1" role="alert">{errors.preferredDate.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Khung giờ <span className="text-destructive">*</span></label>
                  <Select
                    {...register('preferredTime')}
                    aria-describedby={errors.preferredTime ? 'time-error' : undefined}
                    aria-invalid={!!errors.preferredTime}
                  >
                    <option value="">Chọn khung giờ</option>
                    {timeSlots.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </Select>
                  {errors.preferredTime && <p id="time-error" className="text-sm text-destructive mt-1" role="alert">{errors.preferredTime.message}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Ghi chú thêm</label>
                <Input
                  placeholder="Yêu cầu đặc biệt, số người đi cùng, ..."
                  {...register('notes')}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 rounded border-border text-volvo-blue focus:ring-volvo-blue"
                  {...register('consent')}
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                  Tôi đồng ý cung cấp thông tin cá nhân để Volvo Cars Việt Nam và đại lý授权 liên hệ tư vấn, 
                  đặt lịch lái thử và gửi thông tin ưu đãi. Xem <a href="/privacy" className="text-volvo-blue hover:underline">Chính sách bảo mật</a>.
                </label>
              </div>
              {errors.consent && <p className="text-sm text-destructive mb-6" role="alert">{errors.consent.message}</p>}
              
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full" 
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Gửi đăng ký
              </Button>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}