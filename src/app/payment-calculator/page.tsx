'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { Badge } from '@/components/ui/Badge';
import { Car, CreditCard, Calculator, ArrowRight, CheckCircle, Shield, Zap, Truck, Tag } from 'lucide-react';
import { cn, formatPrice, calculateMonthlyPayment, calculateTotalCost } from '@/lib/utils';
import { volvoCars } from '@/lib/cars';

const paymentSchema = z.object({
  carId: z.string().min(1, 'Vui lòng chọn xe'),
  price: z.number().min(1, 'Giá xe không hợp lệ'),
  downPayment: z.number().min(0).max(100),
  termMonths: z.number().min(12).max(84),
  interestRate: z.number().min(0).max(30),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const defaultPlans = [
  { id: 'standard', name: 'Tiêu chuẩn', downPaymentPercent: 30, termMonths: 48, interestRate: 7.99 },
  { id: 'low-monthly', name: 'Trả góp thấp', downPaymentPercent: 20, termMonths: 60, interestRate: 8.49 },
  { id: 'quick', name: 'Trả nhanh', downPaymentPercent: 50, termMonths: 36, interestRate: 7.49 },
  { id: 'flexible', name: 'Linh hoạt', downPaymentPercent: 15, termMonths: 72, interestRate: 8.99 },
];

export default function PaymentCalculatorPage() {
  const [selectedCar, setSelectedCar] = useState(volvoCars[0]);
  const [selectedPlan, setSelectedPlan] = useState(defaultPlans[0]);
  const [customDownPayment, setCustomDownPayment] = useState(30);
  const [customTerm, setCustomTerm] = useState(48);
  const [customRate, setCustomRate] = useState(7.99);
  const [isCustom, setIsCustom] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      carId: selectedCar.id,
      price: selectedCar.price,
      downPayment: 30,
      termMonths: 48,
      interestRate: 7.99,
    },
  });
  
  const watchedValues = watch();
  
  const monthlyPayment = useMemo(() => {
    const price = watchedValues.price || selectedCar.price;
    const downPayment = watchedValues.downPayment ?? customDownPayment;
    const termMonths = watchedValues.termMonths ?? customTerm;
    const interestRate = watchedValues.interestRate ?? customRate;
    return calculateMonthlyPayment(price, downPayment, termMonths, interestRate);
  }, [watchedValues.price, watchedValues.downPayment, watchedValues.termMonths, watchedValues.interestRate, customDownPayment, customTerm, customRate, selectedCar.price]);
  
  const totalCost = useMemo(() => {
    const price = watchedValues.price || selectedCar.price;
    const downPayment = watchedValues.downPayment ?? customDownPayment;
    const termMonths = watchedValues.termMonths ?? customTerm;
    const interestRate = watchedValues.interestRate ?? customRate;
    return calculateTotalCost(price, downPayment, termMonths, interestRate);
  }, [watchedValues.price, watchedValues.downPayment, watchedValues.termMonths, watchedValues.interestRate, customDownPayment, customTerm, customRate, selectedCar.price]);
  
  const downPaymentAmount = useMemo(() => {
    const price = watchedValues.price || selectedCar.price;
    const percent = watchedValues.downPayment ?? customDownPayment;
    return price * (percent / 100);
  }, [watchedValues.price, watchedValues.downPayment, customDownPayment, selectedCar.price]);
  
  const loanAmount = useMemo(() => {
    const price = watchedValues.price || selectedCar.price;
    return price - downPaymentAmount;
  }, [watchedValues.price, downPaymentAmount, selectedCar.price]);
  
  const totalInterest = totalCost - (watchedValues.price || selectedCar.price);
  
  const handleCarChange = (carId: string) => {
    const car = volvoCars.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
      setValue('carId', car.id);
      setValue('price', car.price);
    }
  };
  
  const handlePlanSelect = (plan: typeof defaultPlans[0]) => {
    setSelectedPlan(plan);
    setIsCustom(false);
    setValue('downPayment', plan.downPaymentPercent);
    setValue('termMonths', plan.termMonths);
    setValue('interestRate', plan.interestRate);
    setCustomDownPayment(plan.downPaymentPercent);
    setCustomTerm(plan.termMonths);
    setCustomRate(plan.interestRate);
  };
  
  const handleCustomChange = () => {
    setIsCustom(true);
  };
  
  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === 'VOLVO2024') {
      setPromoApplied(true);
      setPromoDiscount((watchedValues.price || selectedCar.price) * 0.05);
    } else if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
      setPromoDiscount(10000000);
    }
  };
  
  const handlePromoRemove = () => {
    setPromoCode('');
    setPromoApplied(false);
    setPromoDiscount(0);
  };
  
  const finalTotal = totalCost - promoDiscount;
  const finalMonthly = calculateMonthlyPayment(
    finalTotal,
    watchedValues.downPayment ?? customDownPayment,
    watchedValues.termMonths ?? customTerm,
    watchedValues.interestRate ?? customRate
  );
  
  return (
    <div className="min-h-screen bg-background">
      <div className="py-8 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Công cụ tính toán trả góp</h1>
          <p className="text-muted-foreground mt-1">Tính toán minh bạch, nhanh chóng - Không费 dụng ẩn</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(() => {})} className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-volvo-blue/10 text-volvo-blue">
                  <Car className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Chọn xe của bạn</h3>
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
                  <span className="font-medium text-foreground">{formatPrice(watchedValues.price || selectedCar.price)}</span>
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
            </Card>
            
            <Card className="p-6 sticky top-24" style={{ top: '320px' }}>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Chọn gói trả góp
              </h3>
              
              <div className="space-y-3 mb-6" role="radiogroup" aria-label="Gói trả góp định sẵn">
                {defaultPlans.map(plan => {
                  const planMonthly = calculateMonthlyPayment(watchedValues.price || selectedCar.price, plan.downPaymentPercent, plan.termMonths, plan.interestRate);
                  const planTotal = calculateTotalCost(watchedValues.price || selectedCar.price, plan.downPaymentPercent, plan.termMonths, plan.interestRate);
                  const isSelected = selectedPlan.id === plan.id && !isCustom;
                  
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => handlePlanSelect(plan)}
                      role="radio"
                      aria-checked={isSelected}
                      className={cn(
                        'w-full p-4 rounded-xl border-2 text-left transition-all',
                        isSelected
                          ? 'border-volvo-blue bg-volvo-blue/5'
                          : 'border-border hover:border-volvo-blue/50'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn('h-5 w-5 rounded-full border-2 flex items-center justify-center', isSelected ? 'border-volvo-blue' : 'border-border')}>
                            {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-volvo-blue" />}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{plan.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Trả trước {plan.downPaymentPercent}% • {plan.termMonths} tháng • Lãi suất {plan.interestRate}%/năm
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">{formatPrice(planMonthly)}/tháng</p>
                          <p className="text-xs text-muted-foreground">Tổng: {formatPrice(planTotal)}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => { setIsCustom(true); setSelectedPlan({...selectedPlan, id: 'custom' }); }}
              >
                Tùy chỉnh thông số <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Card>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6 md:p-8">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Tùy chỉnh chi tiết
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Trả trước: <span className="text-volvo-blue font-bold">{watchedValues.downPayment ?? customDownPayment}%</span>
                    <span className="text-muted-foreground ml-2">({formatPrice(downPaymentAmount)})</span>
                  </label>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={watchedValues.downPayment ?? customDownPayment}
                    onValueChange={(val) => {
                      const num = Array.isArray(val) ? val[0] : val;
                      setCustomDownPayment(num);
                      setValue('downPayment', num);
                      handleCustomChange();
                    }}
                    aria-label="Phần trăm trả trước"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Kỳ hạn: <span className="text-volvo-blue font-bold">{watchedValues.termMonths ?? customTerm} tháng</span>
                  </label>
                  <Slider
                    min={12}
                    max={84}
                    step={6}
                    value={watchedValues.termMonths ?? customTerm}
                    onValueChange={(val) => {
                      const num = Array.isArray(val) ? val[0] : val;
                      setCustomTerm(num);
                      setValue('termMonths', num);
                      handleCustomChange();
                    }}
                    aria-label="Ký hạn vay (tháng)"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>12 tháng</span>
                    <span>84 tháng</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Lãi suất: <span className="text-volvo-blue font-bold">{(watchedValues.interestRate ?? customRate).toFixed(2)}%/năm</span>
                  </label>
                  <Slider
                    min={0}
                    max={30}
                    step={0.25}
                    value={watchedValues.interestRate ?? customRate}
                    onValueChange={(val) => {
                      const num = Array.isArray(val) ? val[0] : val;
                      setCustomRate(num);
                      setValue('interestRate', num);
                      handleCustomChange();
                    }}
                    aria-label="Lãi suất năm (%)"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0%</span>
                    <span>30%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Xe đã chọn</label>
                  <Select {...register('carId')} onChange={(e) => handleCarChange(e.target.value)} disabled>
                    <option value={selectedCar.id}>{selectedCar.model} {selectedCar.trim}</option>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-volvo-blue/5 border border-volvo-blue/20 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-foreground">Kết quả tính toán</span>
                  <Badge variant="accent" size="sm">Tự động cập nhật</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 rounded-xl bg-background border border-border">
                    <p className="text-2xl font-bold text-volvo-blue">{formatPrice(finalMonthly)}</p>
                    <p className="text-xs text-muted-foreground">Hàng tháng</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-background border border-border">
                    <p className="text-2xl font-bold text-foreground">{formatPrice(finalTotal)}</p>
                    <p className="text-xs text-muted-foreground">Tổng chi phí</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-background border border-border">
                    <p className="text-2xl font-bold text-foreground">{formatPrice(downPaymentAmount)}</p>
                    <p className="text-xs text-muted-foreground">Trả trước</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-background border border-border">
                    <p className="text-2xl font-bold text-amber-500">{formatPrice(totalInterest - promoDiscount)}</p>
                    <p className="text-xs text-muted-foreground">Tổng lãi suất</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Số tiền vay</span>
                    <span className="font-medium">{formatPrice(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Kỳ hạn</span>
                    <span className="font-medium">{watchedValues.termMonths ?? customTerm} tháng</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Lãi suất/năm</span>
                    <span className="font-medium">{(watchedValues.interestRate ?? customRate).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Trả trước</span>
                    <span className="font-medium">{(watchedValues.downPayment ?? customDownPayment)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 mb-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-green-500" />
                  Mã khuyến mãi
                </h4>
                <div className="flex gap-3">
                  <Input
                    placeholder="Nhập mã (VOLVO2024, WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-1"
                  />
                  {promoApplied ? (
                    <Button variant="outline" onClick={handlePromoRemove}>Xóa</Button>
                  ) : (
                    <Button variant="primary" onClick={handlePromoApply}>Áp dụng</Button>
                  )}
                </div>
                {promoApplied && (
                  <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    Đã áp dụng: Giảm {formatPrice(promoDiscount)}
                  )}
                )}
              </div>
              
              <div className="space-y-3">
                <Button variant="primary" className="w-full" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Đăng ký tư vấn tài chính
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {}}>
                  Lưu kết quả tính toán
                </Button>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                Lợi ích khi trả góp tại Volvo
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Lãi suất ưu đãi từ 6.99%/năm',
                  'Thủ tục nhanh gọn, duyệt trong ngày',
                  'Bảo hiểm xe miễn phí năm đầu',
                  'Bảo dưỡng định kỳ 3 năm/60.000km',
                  'Hỗ trợ đổi xe cũ lấy xe mới',
                  'Tư vấn tận răng 24/7',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" aria-hidden="true" />
                Bảo vệ tài chính
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Bảo hiểm GAP
                  </h4>
                  <p className="text-sm text-muted-foreground">Bù chênh lệch giá trị xe khi toàn loss</p>
                </div>
                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    Bảo hiểm mất việc
                  </h4>
                  <p className="text-sm text-muted-foreground">Trả thay bạn 6-12 kỳ khi mất việc làm</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-500" />
                    Bảo vệ suất lãi
                  </h4>
                  <p className="text-sm text-muted-foreground">Cố định lãi suất 3 năm đầu tiên</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-purple-500" />
                    Bảo hiểm giao thông
                  </h4>
                  <p className="text-sm text-muted-foreground">Miễn trừ trách nhiệm khi vi phạm luật</p>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}