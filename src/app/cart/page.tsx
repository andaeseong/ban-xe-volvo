'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, calculateMonthlyPayment, calculateTotalCost } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Input';
import { Car, Trash2, Minus, Plus, Heart, Shield, Zap, ArrowRight, CreditCard, Truck, Tag, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore, availableColors, availableOptions } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';

const paymentPlans = [
  { id: 'standard', name: 'Tiêu chuẩn', downPayment: 30, term: 48, rate: 7.99 },
  { id: 'low-monthly', name: 'Trả góp thấp', downPayment: 20, term: 60, rate: 8.49 },
  { id: 'quick', name: 'Trả nhanh', downPayment: 50, term: 36, rate: 7.49 },
  { id: 'flexible', name: 'Linh hoạt', downPayment: 15, term: 72, rate: 8.99 },
];

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, clearCart } = useCartStore();
  const { toggleItem, isFavorite } = useFavoritesStore();
  const [selectedPlan, setSelectedPlan] = useState(paymentPlans[0]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? 5000000 : 0;
  const tax = subtotal * 0.1;
  const discount = promoApplied ? promoDiscount : 0;
  const total = getTotal() - discount;
  
  const monthlyPayment = calculateMonthlyPayment(
    total,
    selectedPlan.downPayment,
    selectedPlan.term,
    selectedPlan.rate
  );
  
  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === 'VOLVO2024') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.05);
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
  
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="text-center">
          <Car className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Giỏ hàng trống</h1>
          <p className="text-muted-foreground mb-6">Chưa có xe nào trong giỏ hàng của bạn</p>
          <Button asChild variant="primary" size="lg">
            <Link href="/cars">Mua xe ngay</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="py-8 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Giỏ hàng</h1>
          <p className="text-muted-foreground mt-1">{items.length} mẫu xe • {formatPrice(subtotal)}</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {items.map((item, index) => (
              <Card key={item.id} className="p-4 flex gap-4">
                <div className="relative h-24 w-32 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={item.car.thumbnail}
                    alt={item.car.model}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground truncate">{item.car.model} {item.car.trim}</h3>
                      <p className="text-sm text-muted-foreground">{item.car.year} • {item.car.fuelType === 'electric' ? 'Điện' : item.car.fuelType === 'plug-in-hybrid' ? 'Plug-in Hybrid' : 'Hybrid'} • {item.car.drivetrain}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="outline" size="sm">Màu: {item.selectedColor}</Badge>
                        {item.selectedOptions.length > 0 && (
                          <Badge variant="outline" size="sm">+{item.selectedOptions.length} tùy chọn</Badge>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Xóa khỏi giỏ hàng"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{formatPrice(item.car.price * item.quantity)}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.car.price)} x {item.quantity}</p>
                    </div>
                  </div>
                  
                  {item.selectedOptions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">Tùy chọn đã chọn:</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.selectedOptions.map(opt => (
                          <Badge key={opt} variant="secondary" size="sm">{opt}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Mã khuyến mãi
              </h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Nhập mã khuyến mãi"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  className="flex-1"
                />
                {promoApplied ? (
                  <Button variant="outline" onClick={handlePromoRemove}>
                    Xóa
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handlePromoApply}>
                    Áp dụng
                  </Button>
                )}
              </div>
              {promoApplied && (
                <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Đã áp dụng: Giảm {formatPrice(promoDiscount)}
                )}
              )}
            </Card>
          </div>
          
          <div className="lg:col-span-4">
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Tóm tắt đơn hàng
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính ({items.reduce((a, b) => a + b.quantity, 0)} xe)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Vận chuyển
                  </span>
                  <span className="font-medium">{shipping > 0 ? formatPrice(shipping) : 'Miễn phí'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    VAT (10%)
                  </span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      Giảm giá
                    </span>
                    <span className="font-medium">-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-volvo-blue/5 border border-volvo-blue/20 mb-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Trả góp ước tính
                </h4>
                <Select
                  value={selectedPlan.id}
                  onChange={(e) => setSelectedPlan(paymentPlans.find(p => p.id === e.target.value)!)}
                  className="mb-3"
                >
                  {paymentPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {plan.downPayment}% trước, {plan.term} tháng, {plan.rate}%/năm
                    </option>
                  ))}
                </Select>
                <div className="text-center p-3 rounded-lg bg-background border border-border">
                  <p className="text-2xl font-bold text-volvo-blue">{formatPrice(monthlyPayment)}</p>
                  <p className="text-xs text-muted-foreground">/tháng trong {selectedPlan.term} tháng</p>
                  <p className="text-xs text-muted-foreground">Trả trước {selectedPlan.downPayment}% • Lãi suất {selectedPlan.rate}%/năm</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Thanh toán ngay
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {}}
                >
                  Lưu để mua sau
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Bảo mật thanh toán 100%</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>Duyệt hồ sơ trong 30 phút</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <span>Giao xe tận nhà miễn phí</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}