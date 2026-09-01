'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Car as CarType } from '@/types';
import { ChevronDown, Check, Search, Sparkles, Zap, Shield } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

interface CarSelectorProps {
  cars: CarType[];
  selectedCarId: string;
  onSelect: (carId: string) => void;
  label?: string;
}

export function CarSelector({ cars, selectedCarId, onSelect, label = 'Chọn xe của bạn' }: CarSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedCar = cars.find(c => c.id === selectedCarId) || cars[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const filtered = cars.filter(c => 
    c.model.toLowerCase().includes(search.toLowerCase()) ||
    c.trim.toLowerCase().includes(search.toLowerCase()) ||
    c.year.toString().includes(search)
  );

  const fuelLabel = (fuel: CarType['fuelType']) => 
    fuel === 'electric' ? 'Điện' : 
    fuel === 'plug-in-hybrid' ? 'Plug-in Hybrid' :
    fuel === 'hybrid' ? 'Hybrid' :
    fuel === 'mild-hybrid' ? 'Mild Hybrid' : 'Xăng'

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger - Premium double-bezel style */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={cn(
          'group w-full text-left relative overflow-hidden rounded-2xl p-1.5 bg-slate-100 border border-slate-200/80 shadow-sm transition-all duration-300',
          'hover:bg-slate-200/60 hover:border-slate-300 hover:shadow-md hover:-translate-y-[1px]',
          'focus:outline-none focus:ring-4 focus:ring-[#003057]/10 focus:border-[#003057]/20 focus:bg-white',
          'dark:bg-slate-800/60 dark:border-slate-700/60 dark:hover:bg-slate-800 dark:hover:border-slate-600',
          open && 'bg-white border-[#003057]/20 shadow-lg ring-4 ring-[#003057]/10 dark:bg-slate-900 dark:border-sky-500/30'
        )}
      >
        {/* Inner */}
        <div className="relative flex items-center gap-3 rounded-[1.1rem] bg-white border border-white/90 shadow-sm p-2.5 pr-3 dark:bg-slate-900 dark:border-slate-800">
          {/* Image */}
          <div className="relative h-[56px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
            <Image
              src={selectedCar.thumbnail}
              alt={selectedCar.model}
              fill
              className="object-cover"
              sizes="76px"
            />
            {selectedCar.isNew && (
              <span className="absolute left-1 top-1 rounded-full bg-[#B9973B] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-900">Mới</span>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#003057] dark:text-sky-400">Đã chọn</p>
              <span className="hidden sm:inline-flex h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <p className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400">{selectedCar.year} • {fuelLabel(selectedCar.fuelType)}</p>
            </div>
            <p className="truncate text-[15px] font-bold leading-tight text-slate-900 dark:text-white">
              {selectedCar.model} <span className="font-medium text-slate-700 dark:text-slate-300">{selectedCar.trim}</span>
            </p>
            <p className="truncate text-[13px] font-semibold text-[#003057] dark:text-sky-400">
              {formatPrice(selectedCar.price)}
              {selectedCar.discount && <span className="ml-1.5 inline-flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-500/15">-{selectedCar.discount}%</span>}
            </p>
          </div>

          {/* Chevron */}
          <div className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm transition-all duration-300 group-hover:bg-black group-hover:scale-105 dark:bg-white dark:text-slate-900',
            open && 'rotate-180 bg-[#003057] dark:bg-sky-500'
          )}>
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search */}
          <div className="sticky top-0 z-10 border-b border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                autoFocus
                type="search"
                placeholder="Tìm EX90, XC60, 2024, Điện..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#003057] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#003057]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500"
              />
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 font-medium text-white dark:bg-white dark:text-slate-900">
                <Sparkles className="h-3 w-3" /> {filtered.length} mẫu xe
              </span>
              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Nhấn để chọn • Esc để đóng</span>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto overscroll-contain p-2">
            {filtered.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Không tìm thấy</p>
                <p className="text-xs text-slate-500">Thử từ khóa khác: EX90, Điện, 2024</p>
              </div>
            ) : (
              <div className="grid gap-2">
                {filtered.map(car => {
                  const isSelected = car.id === selectedCarId;
                  return (
                    <button
                      key={car.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelect(car.id);
                        setOpen(false);
                        setSearch('');
                      }}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all',
                        isSelected
                          ? 'border-[#003057] bg-[#003057]/[0.06] shadow-sm dark:border-sky-500 dark:bg-sky-500/10'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:hover:border-slate-600'
                      )}
                    >
                      <div className="relative h-[52px] w-[68px] shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200/60 dark:border-slate-600/60">
                        <Image src={car.thumbnail} alt={car.model} fill className="object-cover" sizes="68px" />
                        {isSelected && <span className="absolute inset-0 ring-2 ring-[#003057] dark:ring-sky-500 rounded-lg pointer-events-none" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className={cn('truncate text-sm font-bold leading-tight', isSelected ? 'text-[#003057] dark:text-sky-400' : 'text-slate-900 dark:text-white')}>
                            {car.model} <span className={cn('font-medium', isSelected ? 'text-[#003057]/80 dark:text-sky-300' : 'text-slate-600 dark:text-slate-300')}>{car.trim}</span>
                          </p>
                          {car.isNew && <span className="shrink-0 rounded-full bg-[#B9973B] px-1.5 py-0.5 text-[9px] font-bold text-slate-900">Mới</span>}
                          {car.isPopular && <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"><Sparkles className="h-3 w-3" /> Phổ biến</span>}
                        </div>
                        <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                          {car.year} • {fuelLabel(car.fuelType)} • {car.drivetrain} • {car.seating} chỗ
                        </p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {formatPrice(car.price)}
                          {car.originalPrice && <span className="ml-1.5 text-xs font-normal text-slate-400 line-through">{formatPrice(car.originalPrice)}</span>}
                        </p>
                      </div>

                      <div className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                        isSelected ? 'border-[#003057] bg-[#003057] text-white dark:border-sky-500 dark:bg-sky-500 dark:text-slate-900' : 'border-slate-200 bg-white text-transparent group-hover:border-slate-300 dark:border-slate-600 dark:bg-slate-700'
                      )}>
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Shield className="h-3.5 w-3.5 text-[#003057] dark:text-sky-400" />
              <span className="font-medium">Giá đã bao gồm VAT</span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span>Chưa bao gồm phí đăng ký & bảo hiểm</span>
              <span className="ml-auto hidden sm:inline-flex items-center gap-1"><Zap className="h-3 w-3" /> Cập nhật theo thời giá</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
