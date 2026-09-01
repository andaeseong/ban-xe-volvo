'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, Zap, Globe, Leaf, Award, Users, Target, Clock, CheckCircle, ArrowRight, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

const milestones = [
  { year: '1927', title: 'Chiếc Volvo đầu tiên', desc: 'ÖV4 (Jakob) ra mắt tại Gothenburg, Thụy Điển', icon: Car },
  { year: '1959', title: 'Thắt an toàn 3 điểm', desc: 'Nils Bohlin phát minh - Cứu sống hàng triệu người', icon: Shield },
  { year: '1972', title: 'Ghế trẻ em ngửa', desc: 'Volvo tiên phong bảo vệ trẻ em trong xe', icon: Users },
  { year: '1991', title: 'Hệ thống WHIPS', desc: 'Chống chấn thương cột sống khi va chạm từ phía sau', icon: Award },
  { year: '2008', title: 'City Safety', desc: 'Phanh khẩn cấp tự động đầu tiên trên xe lượng sản xuất', icon: Zap },
  { year: '2018', title: 'Cam kết điện hóa', desc: 'Mọi Volvo mới từ 2019 đều có phiên bản điện', icon: Leaf },
  { year: '2020', title: 'EX30 ra mắt', desc: 'Xe SUV điện nhỏ gọn, tiếp cận nhất từ trước đến nay', icon: Car },
  { year: '2023', title: 'EX90 - Flagship điện', desc: 'Xe SUV điện cao cấp với LiDAR và Core Computing', icon: Target },
];

const values = [
  { icon: Shield, title: 'An toàn', desc: 'Mỗi quyết định đặt an toàn con người lên trên hết. Zero Collisions là mục tiêu 2030.', color: 'text-blue-500' },
  { icon: Leaf, title: 'Bền vững', desc: 'Mục tiêu trung hòa carbon 2040. Kinh tế tuần hoàn, vật liệu tái chế, năng lượng tái tạo.', color: 'text-green-500' },
  { icon: Users, title: 'Con người', desc: 'Thiết kế xung quanh con người. Công nghệ phục vụ cuộc sống, không phức tạp hóa.', color: 'text-purple-500' },
  { icon: Globe, title: 'Toàn cầu', desc: 'Hơn 100 quốc gia. Sản xuất tại Thụy Điển, Bỉ, Mỹ, Trung Quốc, Malaysia. Chuẩn mực toàn cầu.', color: 'text-orange-500' },
];

const stats = [
  { value: '100+', label: 'Quốc gia có mặt' },
  { value: '50,000+', label: 'Nhân viên toàn cầu' },
  { value: '700,000+', label: 'Xe bán/năm' },
  { value: '95+', label: 'Năm lịch sử' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-volvo-blue/10 via-transparent to-volvo-gold/10" aria-hidden="true" />
        <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
        
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-volvo-blue/10 text-volvo-blue text-sm font-medium mb-6">
            <Globe className="h-4 w-4" aria-hidden="true" />
            Volvo Car Corporation
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            Được thiết kế
            <br />
            <span className="gradient-text">xung quanh bạn</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Volvo Cars được thành lập năm 1927 tại Gothenburg, Thụy Điển. 
            Gần một thế kỷ sau, chúng tôi vẫn kiên định với triết lý: xe hơi được tạo ra để phục vụ con người.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl md:text-5xl font-bold text-volvo-blue mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, i) => (
              <Card key={i} className="p-6 h-full">
                <div className={cn('mb-4 p-4 rounded-xl', `${value.color}/10`)} style={{ borderColor: `var(--color-${value.color.replace('text-', '').replace('-500', '')}-500)/20` }}>
                  <value.icon className={cn('h-8 w-8', value.color)} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-muted/50 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hành trình 95+ năm đổi mới</h2>
            <p className="text-lg text-muted-foreground">Những cột mốc quan trọng định hình ngành ô tô toàn cầu</p>
          </div>
          
          <div className="space-y-6">
            {milestones.map((milestone, i) => (
              <Card key={i} className="p-6 flex gap-6">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="text-3xl font-bold text-volvo-blue">{milestone.year}</div>
                  <div className="h-32 w-px bg-border mx-auto my-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <milestone.icon className="h-6 w-6 text-volvo-blue" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{milestone.desc}</p>
                </div>
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
                <Leaf className="h-4 w-4" aria-hidden="true" />
                Cam kết bền vững 2040
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trung hòa carbon
                <br />
                <span className="gradient-text">trước năm 2040</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Volvo cam kết trở thành công ty khí hậu trung hòa vào năm 2040. 
                Mọi khía cạnh của kinh doanh - từ thiết kế, sản xuất đến logistics - đều đang được chuyển đổi.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: '100% xe điện năm 2030', desc: 'Ngừng bán xe động cơ đốt hoàn toàn' },
                  { title: 'Giảm 75% carbon/xe năm 2030', desc: 'So với năm 2018 theo chu kỳ đời sản phẩm' },
                  { title: 'Năng lượng tái tạo 100%', desc: 'Tất cả nhà máy sản xuất dùng điện xanh' },
                  { title: '25% vật liệu tái chế', desc: 'Trong mỗi chiếc xe mới đến năm 2025' },
                  { title: 'Kinh tế tuần hoàn', desc: 'Thiết kế để tái sử dụng, tái chế, tái chế' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Leaf className="h-24 w-24 mx-auto text-green-500/30 mb-6" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">2040</h3>
                  <p className="text-muted-foreground mb-2">Trung hòa carbon</p>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold text-green-500">100%</p>
                      <p className="text-muted-foreground">Xe điện 2030</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold text-blue-500">75%</p>
                      <p className="text-muted-foreground">Giảm carbon</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-background/50">
                      <p className="text-2xl font-bold text-purple-500">25%</p>
                      <p className="text-muted-foreground">Vật liệu tái chế</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-muted/50 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trải nghiệm Volvo tại Việt Nam</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Hệ thống đại lý授权 trên toàn quốc, dịch vụ hậu mãi chuẩn mực toàn cầu, 
            và cam kết "An toàn - Bền vững - Thông minh" cho mọi khách hàng Việt Nam.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Đại lý授权 toàn quốc', desc: 'Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ, Hải Phòng, Bình Dương, Đồng Nai, Khánh Hòa' },
              { icon: Wrench, title: 'Dịch vụ hậu mãi chuẩn Volvo', desc: 'Kỹ thuật viên chứng chỉ, phụ tùng chính hãng, quy trình sửa chữa chuẩn Thụy Điển' },
              { icon: CreditCard, title: 'Giải pháp tài chính linh hoạt', desc: 'Trả góp ưu đãi, bảo hiểm GAP, bảo vệ suất lãi, duyệt hồ sơ trong ngày' },
            ].map((item, i) => (
              <Card key={i} className="p-6 h-full">
                <div className="p-3 rounded-xl bg-volvo-blue/10 text-volvo-blue mb-4">
                  <item.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
          
          <div className="mt-12">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />} asChild>
              <a href="/cars">Khám phá đội xe Volvo</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Wrench({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CreditCard({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}