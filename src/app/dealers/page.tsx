'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, Calendar, Navigation, Car, Shield, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const dealers = [
  {
    id: 'hanoi-1',
    name: 'Volvo Cars Hà Nội - Đại lý授权 1',
    city: 'Hà Nội',
    address: 'Số 123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    phone: '024 3555 8888',
    email: 'hanoi1@volvocars.vn',
    hours: 'Thứ 2 - CN: 8:00 - 20:00',
    services: ['Bán xe mới', 'Bảo dưỡng', 'Sửa chữa', 'Phụ tùng', 'Bảo hiểm', 'Trả góp'],
    hasTestDrive: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
    lat: 21.0285,
    lng: 105.8542,
  },
  {
    id: 'hanoi-2',
    name: 'Volvo Cars Hà Nội - Đại lý授权 2',
    city: 'Hà Nội',
    address: 'Km 10 Đại lộ Thăng Long, Cầu Giấy, Hà Nội',
    phone: '024 3777 9999',
    email: 'hanoi2@volvocars.vn',
    hours: 'Thứ 2 - CN: 8:00 - 20:00',
    services: ['Bán xe mới', 'Bảo dưỡng', 'Sửa chữa', 'Phụ tùng', 'Bảo hiểm', 'Trả góp'],
    hasTestDrive: true,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
    lat: 21.0385,
    lng: 105.7842,
  },
  {
    id: 'hcm-1',
    name: 'Volvo Cars Sài Gòn - Đại lý授权 1',
    city: 'TP. Hồ Chí Minh',
    address: 'Số 456 Võ Văn Tần, Quận 3, TP.HCM',
    phone: '028 3555 7777',
    email: 'hcm1@volvocars.vn',
    hours: 'Thứ 2 - CN: 8:00 - 20:00',
    services: ['Bán xe mới', 'Bảo dưỡng', 'Sửa chữa', 'Phụ tùng', 'Bảo hiểm', 'Trả góp'],
    hasTestDrive: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
    lat: 10.7765,
    lng: 106.7012,
  },
  {
    id: 'hcm-2',
    name: 'Volvo Cars Sài Gòn - Đại lý授权 2',
    city: 'TP. Hồ Chí Minh',
    address: 'Số 789 Đường 3/2, Quận 10, TP.HCM',
    phone: '028 3888 6666',
    email: 'hcm2@volvocars.vn',
    hours: 'Thứ 2 - CN: 8:00 - 20:00',
    services: ['Bán xe mới', 'Bảo dưỡng', 'Sửa chữa', 'Phụ tùng', 'Bảo hiểm', 'Trả góp'],
    hasTestDrive: true,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
    lat: 10.7665,
    lng: 106.6812,
  },
  {
    id: 'danang-1',
    name: 'Volvo Cars Đà Nẵng - Đại lý授权 1',
    city: 'Đà Nẵng',
    address: 'Số 321 Nguyễn Tri Phương, Hải Châu, Đà Nẵng',
    phone: '0236 3555 888',
    email: 'danang1@volvocars.vn',
    hours: 'Thứ 2 - CN: 8:00 - 19:00',
    services: ['Bán xe mới', 'Bảo dưỡng', 'Sửa chữa', 'Phụ tùng', 'Bảo hiểm'],
    hasTestDrive: true,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
    lat: 16.0544,
    lng: 108.2022,
  },
  {
    id: 'cantho-1',
    name: 'Volvo Cars Cần Thơ - Đại lý授权 1',
    city: 'Cần Thơ',
    address: 'Số 555 đường 30/4, Ninh Kiều, Cần Thơ',
    phone: '0292 3555 999',
    email: 'cantho1@volvocars.vn',
    hours: 'Thứ 2 - CN: 8:00 - 19:00',
    services: ['Bán xe mới', 'Bảo dưỡng', 'Sửa chữa', 'Phụ tùng', 'Bảo hiểm'],
    hasTestDrive: true,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop',
    lat: 10.0452,
    lng: 105.7469,
  },
];

export default function DealersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Hệ thống đại lý授权</h1>
          <p className="text-muted-foreground mt-1">{dealers.length} đại lý trên toàn quốc - Luôn gần bạn</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {dealers.map((dealer, index) => (
            <Card key={dealer.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={dealer.image}
                  alt={dealer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-sm font-medium">{dealer.city}</span>
                  {dealer.hasTestDrive && (
                    <span className="px-3 py-1 rounded-full bg-volvo-blue text-white text-sm font-medium flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      Lái thử
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-sm font-medium">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {dealer.rating}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{dealer.name}</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-volvo-blue flex-shrink-0" />
                    <span>{dealer.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-volvo-blue flex-shrink-0" />
                    <a href={`tel:${dealer.phone.replace(/\s/g, '')}`} className="hover:text-volvo-blue transition-colors">{dealer.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4 text-volvo-blue flex-shrink-0" />
                    <span>{dealer.hours}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {dealer.services.map((service, i) => (
                    <span key={i} className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                      {service}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="primary" className="flex-1" rightIcon={<Navigation className="h-4 w-4" />}>
                    Chỉ đường
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => {}}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Đặt lịch
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Không tìm thấy đại lý gần bạn?</h2>
          <div className="text-center">
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Liên hệ hotline 1800 555 888 để được tư vấn và hỗ trợ tìm đại lý phù hợp nhất, 
              hoặc để tư vấn viên đến tận nơi hỗ trợ bạn.
            </p>
            <Button variant="primary" size="lg" rightIcon={<Phone className="h-5 w-5" />}>
              Gọi hotline 1800 555 888
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}