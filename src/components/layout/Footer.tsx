'use client';

import Link from 'next/link';
import { Car, Shield, Zap, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = {
  models: [
    { label: 'EX90', href: '/cars/volvo-ex90-2026' },
    { label: 'EX30', href: '/cars/volvo-ex30-2026' },
    { label: 'XC90 Recharge', href: '/cars/volvo-xc90-2026' },
    { label: 'XC60 Recharge', href: '/cars/volvo-xc60-2026' },
    { label: 'XC40 Recharge', href: '/cars/volvo-xc40-2026' },
    { label: 'C40 Recharge', href: '/cars/volvo-c40-2025' },
    { label: 'S90 Recharge', href: '/cars/volvo-s90-2025' },
    { label: 'V90 Cross Country', href: '/cars/volvo-v90-2025' },
  ],
  support: [
    { label: 'Đặt lịch lái thử', href: '/test-drive' },
    { label: 'Tính toán thanh toán', href: '/payment-calculator' },
    { label: 'Tìm đại lý', href: '/dealers' },
    { label: 'Bảo dưỡng & Sửa chữa', href: '/service' },
    { label: 'Phụ tùng chính hãng', href: '/parts' },
    { label: 'Bảo hành Volvo', href: '/warranty' },
    { label: 'Volvo On Call', href: '/on-call' },
  ],
  company: [
    { label: 'Về Volvo', href: '/about' },
    { label: 'Cam kết an toàn', href: '/safety' },
    { label: 'Bền vững', href: '/sustainability' },
    { label: 'Tuyển dụng', href: '/careers' },
    { label: 'Báo chí', href: '/press' },
    { label: 'Nhà đầu tư', href: '/investors' },
  ],
  legal: [
    { label: 'Chính sách bảo mật', href: '/privacy' },
    { label: 'Điều khoản sử dụng', href: '/terms' },
    { label: 'Cài đặt Cookie', href: '/cookies' },
    { label: 'Truy cập', href: '/accessibility' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/volvocarsvietnam', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/volvocarsvietnam', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/volvocarsvn', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/volvocarsvietnam', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2" aria-label="Volvo Cars Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-volvo-blue">
                <Car className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-foreground">Volvo</span>
            </Link>
            <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
              Volvo Cars - Đổi mới cho cuộc sống an toàn, bền vững và thông minh. 
              Khám phá dòng xe điện, hybrid và plug-in hybrid tiên tiến nhất.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-volvo-blue/10 hover:text-volvo-blue transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          <nav aria-label="Models">
            <h3 className="font-semibold text-foreground mb-4">Dòng xe</h3>
            <ul className="space-y-3">
              {footerLinks.models.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-volvo-blue transition-colors flex items-center gap-2"
                  >
                    <Zap className="h-4 w-4 text-volvo-blue" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <nav aria-label="Support">
            <h3 className="font-semibold text-foreground mb-4">Hỗ trợ</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-volvo-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <nav aria-label="Company">
            <h3 className="font-semibold text-foreground mb-4">Công ty</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-volvo-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="mt-12 md:mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>© 2026 Volvo Car Corporation. All rights reserved.</span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" aria-hidden="true" />
                An toàn hàng đầu
              </span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Điện tử hóa
              </span>
            </div>
            
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-volvo-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-volvo-blue/10 text-volvo-blue">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-foreground">Đại lý chính hãng</p>
              <p>Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-volvo-blue/10 text-volvo-blue">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-foreground">Hotline 24/7</p>
              <p className="text-volvo-blue font-medium">1800 555 888</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-volvo-blue/10 text-volvo-blue">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-foreground">Email hỗ trợ</p>
              <p>support@volvocars.vn</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}