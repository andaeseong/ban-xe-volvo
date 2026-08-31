# Volvo Cars Vietnam - Website

Website bán xe Volvo chính hãng tại Việt Nam với đầy đủ tính năng: giỏ hàng, yêu thích, tính toán trả góp, đặt lịch lái thử, và thông tin an toàn chi tiết.

## Tính năng chính

- 🚗 **20 mẫu xe (2020-2026)**: EX90, EX30, XC90, XC60, XC40, S90, V90, C40 - điện, hybrid, plug-in hybrid
- 🛡️ **An toàn toàn diện**: 20+ tính năng an toàn chủ động, bị động, hỗ trợ lái xe, cấu trúc
- 🛒 **Giỏ hàng thông minh**: Chọn màu, tùy chọn, số lượng, mã khuyến mãi
- ❤️ **Danh sách yêu thích**: Lưu xe quan tâm, so sánh
- 💰 **Tính toán trả góp**: 4 gói định sẵn + tùy chỉnh, lãi suất, kỳ hạn, trả trước
- 📅 **Đặt lịch lái thử**: Chọn xe, đại lý, ngày giờ, thông tin cá nhân
- 🏢 **Hệ thống đại lý**: 8 đại lý trên toàn quốc với bản đồ, dịch vụ
- 📱 **Responsive**: Mobile-first, PWA ready, accessibility WCAG 2.1 AA
- 🌙 **Dark/Light mode**: Tự động theo hệ thống + chuyển đổi thủ công
- ⚡ **Performance**: Next.js 15, React 19, Tailwind CSS v4, GSAP animations

## Công nghệ

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand (persist)
- **Animation**: GSAP + ScrollTrigger
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Theme**: next-themes
- **Fonts**: Geist Sans & Mono (self-hosted)

## Cài đặt

```bash
# Clone repository
git clone https://github.com/andaeseong/ban-xe-volvo.git
cd ban-xe-volvo

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production
npm start
```

## Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router pages
│   ├── cars/               # Danh sách & chi tiết xe
│   ├── cart/               # Giỏ hàng
│   ├── favorites/          # Yêu thích
│   ├── safety/             # An toàn
│   ├── test-drive/         # Đặt lịch lái thử
│   ├── payment-calculator/ # Tính toán trả góp
│   ├── dealers/            # Đại lý
│   └── ...                 # About, sustainability, legal
├── components/
│   ├── ui/                 # Base UI components (Button, Card, Input, etc.)
│   ├── layout/             # Header, Footer, MainLayout
│   ├── cars/               # CarCard, CarGrid, Hero, Testimonials
│   ├── cart/               # Cart components
│   ├── favorites/          # Favorites components
│   ├── payment/            # PaymentCalculator
│   └── safety/             # SafetyHighlights
├── store/
│   ├── cartStore.ts        # Zustand cart state
│   └── favoritesStore.ts   # Zustand favorites state
├── lib/
│   ├── cars.ts             # Car data (20 models) & safety features
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript types
└── hooks/                  # Custom hooks
```

## Tính năng an toàn (20 tính năng)

**Chủ động (5)**: City Safety, Run-off Road Mitigation, Oncoming Lane Mitigation, Rear Collision Warning, Adaptive Headlights
**Bị động (5)**: Airbag System, WHIPS, Child Safety, Safety Cage, SIPS
**Hỗ trợ lái (8)**: Pilot Assist, BLIS, Driver Alert, Traffic Sign, Speed Limiter, 360° Camera, HUD, Park Assist
**Cấu trúc (2)**: Boron Steel Safety Cage, SIPS

## Môi trường

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://volvocars.vn
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxx
```

## Triển khai

### Vercel (Khuyến nghị)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Accessibility

- ✅ WCAG 2.1 Level AA
- ✅ Keyboard navigation hoàn toàn
- ✅ Screen reader support (NVDA, JAWS, VoiceOver)
- ✅ Focus indicators rõ ràng
- ✅ Skip links
- ✅ Tương phản ≥ 4.5:1
- ✅ Phóng to 200% không mất chức năng
- ✅ Phụ đề video, transcript
- ✅ ARIA labels, live regions

## Giấy phép

Proprietary - Volvo Car Corporation. All rights reserved.

## Liên hệ

- Website: https://volvocars.vn
- Hotline: 1800 555 888
- Email: support@volvocars.vn