'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { 
  Car, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Shield,
  Zap,
  Settings
} from 'lucide-react';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/cars', label: 'Xe mới' },
  { href: '/cars?category=electric', label: 'Xe điện' },
  { href: '/cars?category=suv', label: 'SUV' },
  { href: '/cars?category=sedan', label: 'Sedan' },
  { href: '/cars?category=wagon', label: 'Wagon' },
  { href: '/safety', label: 'An toàn' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-background/95 backdrop-blur-2xl shadow-sm border-b border-border' 
        : 'bg-transparent'
    )}>
      <nav className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Volvo Cars Home">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-volvo-blue">
              <Car className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="hidden md:block text-xl font-bold text-foreground">Volvo</span>
          </Link>
          
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'bg-volvo-blue/10 text-volvo-blue'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="md:hidden"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Link href="/favorites" className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Yêu thích">
              <Heart className="h-5 w-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-volvo-blue text-white text-[10px] font-medium">
                3
              </span>
            </Link>
            
            <Link href="/cart" className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Giỏ hàng">
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-volvo-blue text-white text-[10px] font-medium">
                2
              </span>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="hidden md:flex"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              className="hidden md:flex"
              rightIcon={<Zap className="h-4 w-4" />}
            >
              Đặt lịch lái thử
            </Button>
            
            <button
              className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-xl transition-colors',
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? 'bg-volvo-blue/10 text-volvo-blue'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button variant="outline" className="flex-1" rightIcon={<Zap className="h-4 w-4" />}>
                  Đặt lịch lái thử
                </Button>
                <Button variant="ghost" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Cài đặt
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}