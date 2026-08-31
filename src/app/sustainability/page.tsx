'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, Leaf, Zap, Globe, Recycle, Target, CheckCircle, ArrowRight, Clock, Factory, Truck, Leaf as LeafIcon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const goals = [
  { year: '2025', title: '25% vật liệu tái chế', desc: 'Trong mỗi chiếc xe mới sản xuất', icon: Recycle, color: 'text-green-500' },
  { year: '2025', title: '100% năng lượng tái tạo', desc: 'Tất cả nhà máy sản xuất trên toàn cầu', icon: Sun, color: 'text-yellow-500' },
  { year: '2030', title: '100% xe bán là xe điện', desc: 'Ngừng hoàn toàn xe động cơ đốt', icon: Zap, color: 'text-blue-500' },
  { year: '2030', title: 'Giảm 75% carbon/xe', desc: 'So với năm 2018 theo chu kỳ đời', icon: LeafIcon, color: 'text-emerald-500' },
  { year: '2030', title: 'Giảm 50% carbon/xe vận hành', desc: 'Mục tiêu khoa học dựa trên khoa học', icon: Target, color: 'text-orange-500' },
  { year: '2040', title: 'Trung hòa carbon toàn diện', desc: 'Toàn bộ chuỗi giá trị, phạm vi 1, 2, 3', icon: Globe, color: 'text-purple-500' },
];

const initiatives = [
  { icon: LeafIcon, title: 'Vật liệu bền vững', desc: 'Sử dụng thép xanh, nhôm tái chế, polymer sinh học, vải PET tái chế từ chai nhựa', metrics: ['25% vật liệu tái chế 2025', 'Thép xanh SSAB', 'Không da động vật tùy chọn'] },
  { icon: Factory, title: 'Sản xuất xanh', desc: 'Nhà máy khí hậu trung hòa, năng lượng tái tạo 100%, nước tuần hoàn, không rác thải chôn lấp', metrics: ['100% điện xanh 2025', 'Nước tuần hoàn 99%', 'Không chôn lấp'] },
  { icon: Truck, title: 'Logistics bền vững', desc: 'Chuyển dịch hàng đường sắt, tàu chạy biofuel, tối ưu hóa đường vận tải, bao bì tái sử dụng', metrics: ['Giảm 40% CO2 logistics', 'Biofuel cho tàu biển', 'Bao bì 100% tái chế'] },
  { icon: Zap, title: 'Pin & Năng lượng', desc: 'Pin được thiết kế để tái sử dụng (second life), tái chế 95% vật liệu pin, sạc thông minh', metrics: ['95% tái chế pin', 'Second life storage', 'Sạc hai chiều V2G'] },
];

const circularEconomy = [
  { step: 1, title: 'Thiết kế', desc: 'Thiết kế để tháo rời, tái sử dụng, tái chế từ đầu', icon: Target },
  { step: 2, title: 'Vật liệu', desc: 'Ưu tiên vật liệu tái chế, sinh học, có chứng chỉ bền vững', icon: Recycle },
  { step: 3, title: 'Sản xuất', desc: 'Năng lượng tái tạo, quy trình hiệu quả, không rác thải', icon: Factory },
  { step: 4, title: 'Sử dụng', desc: 'Bảo dưỡng dự phòng, cập nhật OTA, mở rộng vòng đời', icon: Clock },
  { step: 5, title: 'Tái sử dụng', desc: 'Pin second life, phụ tùng remanufactured, nâng cấp phần mềm', icon: Zap },
  { step: 6, title: 'Tái chế', desc: 'Tách tách 95% vật liệu, quay lại chu trình sản xuất', icon: Recycle },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" aria-hidden="true" />
        <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
        
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-sm font-medium mb-6">
            <LeafIcon className="h-4 w-4" aria-hidden="true" />
            Cam kết bền vững 2040
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            Trung hòa carbon
            <br />
            <span className="gradient-text">trước năm 2040</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Volvo cam kết trở thành công ty khí hậu trung hòa vào năm 2040. 
            Mọi khía cạnh của kinh doanh - từ thiết kế, sản xuất đến logistics - đều đang được chuyển đổi 
            theo khoa học khí hậu.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {goals.map((goal, i) => (
              <Card key={i} className="p-6 h-full relative overflow-hidden">
                <div className="absolute top-3 right-3 text-4xl font-bold text-foreground/5">{goal.year}</div>
                <div className={cn('mb-4 p-4 rounded-xl', `${goal.color}/10`)} style={{ borderColor: `var(--color-${goal.color.replace('text-', '').replace('-500', '')}-500)/20` }}>
                  <goal.icon className={cn('h-8 w-8', goal.color)} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{goal.title}</h3>
                <p className="text-muted-foreground">{goal.desc}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Kinh tế tuần hoàn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Thiết kế để loại bỏ rác thải, lưu giữ vật liệu trong sử dụng càng lâu càng tốt, 
              và tái tạo hệ thống tự nhiên.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {circularEconomy.map((step, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-volvo-blue/10 text-volvo-blue flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                  <div>
                    <step.icon className="h-8 w-8 text-volvo-blue" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-muted/50 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hành động cụ thể</h2>
            <p className="text-lg text-muted-foreground">Ba trụ cột chính trong chiến lược bền vững của Volvo</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {initiatives.map((initiative, i) => (
              <Card key={i} className="p-6 h-full">
                <div className="p-4 rounded-xl bg-green-500/10 text-green-500 mb-4">
                  <initiative.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{initiative.title}</h3>
                <p className="text-muted-foreground mb-4">{initiative.desc}</p>
                <ul className="space-y-2">
                  {initiative.metrics.map((metric, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Chứng chỉ khoa học', desc: 'Mục tiêu giảm phát thải được SBTi (Science Based Targets initiative) xác nhận phù hợp với mục tiêu 1.5°C', icon: Target },
              { title: 'Báo cáo minh bạch', desc: 'Báo cáo phát thải hàng năm theo chuẩn CDP, GRI, TCFD. Công khai tiến độ tới năm 2040', icon: Shield },
              { title: 'Hợp tác toàn cầu', desc: 'Tham gia UN Global Compact, RE100, EV100, SteelZero. Đẩy mạnh chuyển đổi ngành', icon: Globe },
            ].map((item, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="mx-auto mb-4 p-4 rounded-xl bg-volvo-blue/10 text-volvo-blue">
                  <item.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-gold/10 text-volvo-gold text-sm font-medium mb-6">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Điện hóa hoàn toàn
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Mọi Volvo mới
                <br />
                <span className="gradient-text">điện thuần túy 2030</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Từ năm 2030, Volvo sẽ chỉ bán xe điện thuần túy. 
                Không động cơ đốt, không hybrid - chỉ có điện thuần túy với hiệu suất cao, 
                không khí thải, và trải nghiệm lái tuyệt vời.
              </p>
              
              <div className="space-y-4">
                {[
                  'EX90 - Flagship SUV điện 7 chỗ',
                  'EX30 - SUV điện nhỏ gọn thông minh',
                  'EX40/EC40 - Crossover điện thể thao',
                  'ES90 - Sedan điện cao cấp (sắp ra mắt)',
                  'Điện hóa toàn bộ dòng xe 2030',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Zap className="h-24 w-24 mx-auto text-green-500/30 mb-6" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">2030</h3>
                  <p className="text-muted-foreground mb-2">100% xe điện</p>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold text-green-500">0g</p>
                      <p className="text-muted-foreground">CO2/km</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold text-blue-500">100%</p>
                      <p className="text-muted-foreground">Điện thuần túy</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold text-purple-500">0L</p>
                      <p className="text-muted-foreground">Xăng/dầu</p>
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