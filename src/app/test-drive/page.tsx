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
import { Car, Calendar, Clock, MapPin, Phone, Mail, CheckCircle, ArrowRight, Shield, Zap, User } from 'lucide-react';
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
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-volvo-blue/10 text-volvo-blue">
                  <Car className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Chọn xe lái thử</h3>
                  <p className="text-sm text-muted-foreground">{volvoCars.length} mẫu xe có sẵn</p>
                </div>
              </div>
              
              <Select
                {...register('carId')}
                onChange={(e) => handleCarChange(e.target.value)}
                className="mb-4"
                aria-label="Chọn mẫu xe"
              >
                {volvoCars.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.model} {car.trim} ({car.year}) - {formatPrice(car.price)}
                  </option>
                ))}
              </Select>
              
              <div className="p-4 rounded-xl bg-muted/50 border border-border mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Giá xe</span>
                  <span className="font-medium text-foreground">{formatPrice(selectedCar.price)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Loại xe</span>
                  <span className="font-medium text-foreground">{selectedCar.model} {selectedCar.trim}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Năm</span>
                  <span className="font-medium text-foreground">{selectedCar.year}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                  <Shield className="h-5 w-5 text-green-500" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-foreground">Bảo hiểm lái thử miễn phí</p>
                    <p className="text-sm text-muted-foreground">Bảo hiểm toàn rủi ro trong quá trình lái thử</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <Zap className="h-5 w-5 text-blue-500" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-foreground">Tư vấn viên chuyên属</p>
                    <p className="text-sm text-muted-foreground">Hỗ trợ trọn gói từ A-Z</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <User className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-foreground">Quà tặng đặc biệt</p>
                    <p className="text-sm text-muted-foreground">Voucher bảo dưỡng 1.000.000đ khi lái thử</p>
                  </div>
                </div>
              </div>
            </Card>
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