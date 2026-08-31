'use client';

import { Card } from '@/components/ui/Card';
import { Shield, Eye, Keyboard, Volume2, Contrast, MousePointer, CheckCircle, AlertTriangle, Download, Globe, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const wcagCriteria = [
  { level: 'A', title: 'Mức độ A (Tối thiểu)', items: [
    'Tất cả nội dung không phải văn bản có văn bản thay thế',
    'Video/âm thanh có phụ đề/mô tả âm thanh',
    'Thông tin không chỉ truyền đạt bằng màu sắc',
    'Âm thanh tự phát có thể tắt/điều khiển âm lượng',
    'Chức năng hoạt động bằng bàn phím',
    'Không có bẫy bàn phím',
    'Giới hạn thời gian có thể tắt/kéo dài',
    'Nội dung nhấp nháy không quá 3 lần/giây',
    'Có cách bỏ qua khối nội dung lặp lại',
    'Tiêu đề trang mô tả chủ đề/đích đến',
    'Thứ tự tab hợp lý',
    'Mục đích liên kết rõ ràng từ ngữ cảnh',
    'Ngôn ngữ trang được xác định',
    'Yếu tố nhận diện nhất quán',
    'Lỗi nhập liệu được xác định, mô tả',
    'Nhãn/hướng dẫn cho trường nhập liệu',
  ]},
  { level: 'AA', title: 'Mức độ AA (Khuyến nghị)', items: [
    'Tỷ lệ tương phản văn bản ≥ 4.5:1 (3:1 cho văn bản lớn)',
    'Tỷ lệ tương phản UI ≥ 3:1',
    'Văn bản có thể phóng to 200% không mất chức năng',
    'Sử dụng văn bản thay vì hình ảnh văn bản',
    'Có nhiều cách tìm trang web (tìm kiếm, map, menu)',
    'Tiêu đề/nhãn mô tả chủ đề/đích đến',
    'Trạng thái tập trung (focus) rõ ràng',
    'Ngôn ngữ đoạn văn được xác định',
    'Thành phần lặp lại xuất hiện theo thứ tự nhất quán',
    'Chức năng hoạt động bằng nhiều cách (bàn phím, chuột, cảm ứng, giọng nói)',
    'Lỗi nhập liệu có gợi ý sửa chữa',
    'Điền lại thông tin tự động (autocomplete)',
  ]},
  { level: 'AAA', title: 'Mức độ AAA (Tối ưu)', items: [
    'Tỷ lệ tương phản văn bản ≥ 7:1 (4.5:1 cho văn bản lớn)',
    'Âm thanh nền thấp hoặc có thể tắt',
    'Không yêu cầu thời gian cụ thể',
    'Không gián đoạn (có thể tạm dừng/tiếp tục)',
    'Lưu lại dữ liệu khi xác thực lại',
    'Văn bản không quá rộng (≤ 80 ký tự/độ), căn đều 2 bên',
    'Khoảng cách dòng ≥ 1.5, đoạn ≥ 1.5x dòng',
    'Không cần cuộn ngang khi phóng to 400%',
    'Có phiên bản thay thế cho nội dung phức tạp',
    'Giải thích từ viết tắt, chuyên ngành, thành ngữ',
    'Cấp độ đọc phù hợp (trung học cơ sở)',
    'Phiên bản âm thanh cho văn bản dài',
  ]},
];

const features = [
  { icon: Keyboard, title: 'Điều hướng bàn phím', desc: 'Tất cả chức năng có thể truy cập bằng Tab, Enter, Esc, Space, mũi tên. Thứ tự focus logic, có skip link.' },
  { icon: Eye, title: 'Hỗ trợ Screen Reader', desc: 'Semantic HTML5, ARIA labels, live regions, heading structure, landmark roles. Tested với NVDA, JAWS, VoiceOver.' },
  { icon: Contrast, title: 'Tương phản & Màu sắc', desc: 'Tỷ lệ ≥ 4.5:1 (AA), ≥ 7:1 (AAA). Không chỉ dùng màu để truyền thông tin. Hỗ trợ chế độ độ tương phản cao.' },
  { icon: Volume2, title: 'Đa phương tiện', desc: 'Video có phụ đề, transcript, mô tả âm thanh. Audio có điều khiển phát/dừng, âm lượng, tốc độ.' },
  { icon: Globe, title: 'Ngôn ngữ & Quốc tế hóa', desc: 'lang="vi" trên thẻ html, lang cho đoạn tiếng Anh. Hỗ trợ RTL, định dạng ngày/giờ/số theo locale.' },
  { icon: MousePointer, title: 'Tương tác & Thiết bị', desc: 'Mục tiêu chạm ≥ 44x44px. Hỗ trợ chuột, bàn phím, cảm ứng, bút, giọng nói, công nghệ hỗ trợ.' },
];

const testingTools = [
  { name: 'axe DevTools', category: 'Extension', desc: 'Quét tự động vi phạm WCAG 2.1 A/AA/AAA', url: 'https://www.deque.com/axe/devtools/' },
  { name: 'WAVE', category: 'Web/Extension', desc: 'Đánh giá trực quan lỗi accessibility', url: 'https://wave.webaim.org/' },
  { name: 'Lighthouse', category: 'DevTools', desc: 'Báo cáo accessibility trong Chrome DevTools', url: 'https://developer.chrome.com/docs/lighthouse/overview/' },
  { name: 'Colour Contrast Analyser', category: 'Desktop App', desc: 'Kiểm tra tỷ lệ tương phản màu sắc chính xác', url: 'https://www.tpgi.com/color-contrast-checker/' },
  { name: 'NVDA', category: 'Screen Reader', desc: 'Miễn phí, Windows. Test trải nghiệm người mù', url: 'https://www.nvaccess.org/download/' },
  { name: 'VoiceOver', category: 'Screen Reader', desc: 'Tích hợp macOS/iOS. Cmd+F5 để bật', url: 'https://support.apple.com/guide/voiceover/welcome/mac' },
  { name: 'JAWS', category: 'Screen Reader', desc: 'Thương mại, Windows. Phổ biến trong doanh nghiệp', url: 'https://www.freedomscientific.com/products/software/jaws/' },
  { name: 'Keyboard Testing', category: 'Manual', desc: 'Tab qua mọi phần tử, kiểm tra focus, skip link, modal trap', url: '' },
];

const commitments = [
  { title: 'Tuân thủ WCAG 2.1 AA', desc: 'Trang web được thiết kế, phát triển, kiểm tra để đáp ứng tiêu chuẩn WCAG 2.1 Level AA.' },
  { title: 'Kiểm tra liên tục', desc: 'Tự động hóa axe-core trong CI/CD, audit thủ công quý, test screen reader mỗi phát hành.' },
  { title: 'Phản hồi người dùng', desc: 'Cung cấp kênh báo cáo lỗi accessibility. Cam kết khắc phục trong 30 ngày (lỗi AA) / 7 ngày (lỗi A).' },
  { title: 'Đào tạo đội ngũ', desc: 'Developer, designer, QA, content editor đều được đào tạo accessibility hàng năm.' },
  { title: 'Tài liệu & Hướng dẫn', desc: 'Accessibility Conformance Report (ACR/VPAT), hướng dẫn sử dụng cho người khuyết tật.' },
  { title: 'Cập nhật pháp luật', desc: 'Tuân thủ Luật Người khuyết tật Việt Nam 2010, Luật Giao dịch điện tử 2023, Đề án 1364/QĐ-TTg.' },
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Khả năng truy cập (Accessibility)</h1>
          <p className="text-muted-foreground mt-1">Cam kết WCAG 2.1 AA | Cập nhật: Tháng 1/2026</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-500" aria-hidden="true" />
              Tuyên bố khả năng truy cập
            </h2>
            <div className="prose prose-muted max-w-none">
              <p>Volvo Cars Việt Nam cam kết đảm bảo trang web <strong>volvocars.vn</strong> có thể truy cập được bởi mọi người, bao gồm người khuyết tật thị giác, thính giác, vận động, nhận thức, và thần kinh. Chúng tôi tuân thủ tiêu chuẩn <strong>WCAG 2.1 Level AA</strong> (Web Content Accessibility Guidelines) và các quy định pháp luật Việt Nam về quyền người khuyết tật.</p>
              <p>Trang web được thiết kế để hoạt động với: trình đọc màn hình (NVDA, JAWS, VoiceOver), điều hướng bàn phím hoàn toàn, phóng to văn bản 200%, chế độ độ tương phản cao, nhiều ngôn ngữ, và các công nghệ hỗ trợ khác.</p>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
              Trạng thái tuân thủ
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                <span className="text-sm text-foreground">WCAG 2.1 Level A</span>
                <CheckCircle className="h-5 w-5 text-green-500" aria-label="Đạt" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                <span className="text-sm text-foreground">WCAG 2.1 Level AA</span>
                <CheckCircle className="h-5 w-5 text-green-500" aria-label="Đạt" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
                <span className="text-sm text-foreground">WCAG 2.1 Level AAA</span>
                <span className="text-sm text-amber-500">Một phần</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                <span className="text-sm text-foreground">Luật Người khuyết tật VN 2010</span>
                <CheckCircle className="h-5 w-5 text-green-500" aria-label="Tuân thủ" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                <span className="text-sm text-foreground">Đề án 1364/QĐ-TTg</span>
                <CheckCircle className="h-5 w-5 text-green-500" aria-label="Tuân thủ" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
              Kiểm tra gần nhất
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Audit tự động (axe-core)</span>
                <span className="text-foreground">Tháng 1/2026 - 0 vi phạm A/AA</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Audit thủ công (QA team)</span>
                <span className="text-foreground">Tháng 1/2026 - Đạt AA</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Test Screen Reader (NVDA, VoiceOver)</span>
                <span className="text-foreground">Tháng 1/2026 - Đạt</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Test bàn phím & Zoom 200%</span>
                <span className="text-foreground">Tháng 1/2026 - Đạt</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Audit tiếp theo</span>
                <span className="text-volvo-blue font-medium">Quý 2/2026</span>
              </div>
            </div>
          </Card>
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Tiêu chuẩn WCAG 2.1 - Chi tiết</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {wcagCriteria.map((level) => (
              <Card key={level.level} className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className={cn('px-3 py-1 rounded-full text-sm font-bold', 
                    level.level === 'A' && 'bg-green-500/10 text-green-500',
                    level.level === 'AA' && 'bg-blue-500/10 text-blue-500',
                    level.level === 'AAA' && 'bg-purple-500/10 text-purple-500'
                  )}>
                    {level.level}
                  </span>
                  <span className="font-semibold text-foreground">{level.title}</span>
                </div>
                <ul className="space-y-2 text-sm">
                  {level.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 
                        level.level === 'A' ? 'var(--color-green-500)' :
                        level.level === 'AA' ? 'var(--color-blue-500)' : 'var(--color-purple-500)'
                      }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Tính năng khả năng truy cập trên volvocars.vn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="p-6">
                <div className="p-3 rounded-xl bg-volvo-blue/10 text-volvo-blue mb-4">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Cách sử dụng trang web với công nghệ hỗ trợ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Điều hướng bàn phím
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Tab / Shift+Tab:</strong> Di chuyển giữa các phần tử có thể tập trung</li>
                <li><strong>Enter / Space:</strong> Kích hoạt liên kết, nút bấm, checkbox</li>
                <li><strong>Mũi tên:</strong> Điều hướng trong menu, slider, tab, date picker</li>
                <li><strong>Esc:</strong> Đóng modal, dropdown, hủy hành động</li>
                <li><strong>Skip Link (Tab đầu tiên):</strong> "Chuyển đến nội dung chính" - bỏ qua header/navigation</li>
                <li><strong>Focus indicator:</strong> Viền rõ ràng, tỷ lệ tương phản ≥ 3:1</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Screen Reader (NVDA/JAWS/VoiceOver)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Heading (H):</strong> Di chuyển giữa tiêu đề H1-H6</li>
                <li><strong>Landmark (D/R):</strong> Nhảy đến main, nav, search, footer</li>
                <li><strong>List (L/I):</strong> Đọc danh sách, mục danh sách</li>
                <li><strong>Link (K):</strong> Di chuyển giữa liên kết</li>
                <li><strong>Form (F/E):</strong> Di chuyển giữa trường form, chỉnh sửa</li>
                <li><strong>Table (T/Ctrl+Alt+Mũi tên):</strong> Đọc bảng dữ liệu</li>
                <li><strong>Live Region:</strong> Thông báo lỗi, thành công, tải dữ liệu được đọc tự động</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Contrast className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Phóng to & Độ tương phản cao
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Zoom trình duyệt (Ctrl/Cmd + +/-):</strong> Phóng to 200% không mất chức năng, không cuộn ngang</li>
                <li><strong>Chế độ độ tương phản cao (OS):</strong> Windows High Contrast, macOS Increase Contrast</li>
                <li><strong>Tùy chỉnh CSS:</strong> Hỗ trợ user stylesheet, font-size tùy chỉnh</li>
                <li><strong>Text spacing:</strong> Khoảng cách dòng ≥ 1.5, đoạn ≥ 2x dòng, chữ ≥ 0.12em, từ ≥ 0.16em</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                Video & Âm thanh
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Phụ đề (Captions):</strong> Có sẵn cho mọi video, bật/tắt bằng nút CC</li>
                <li><strong>Transcript:</strong> Bản ghi chép đầy đủ dưới video hoặc liên kết riêng</li>
                <li><strong>Mô tả âm thanh (Audio Description):</strong> Cho video có nội dung hình ảnh quan trọng</li>
                <li><strong>Điều khiển:</strong> Phát/tạm dừng, tìm kiếm, âm lượng, tốc độ, toàn màn hình - đều truy cập bằng bàn phím</li>
                <li><strong>Không tự động phát:</strong> Video chỉ phát khi người dùng tương tác</li>
              </ul>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Công cụ kiểm tra & Kiểm thử</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testingTools.map((tool, i) => (
              <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <Globe className="h-6 w-6 text-volvo-blue flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-medium text-foreground">{tool.name}</h4>
                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                    <p className="text-sm text-muted-foreground mt-1">{tool.desc}</p>
                    {tool.url && (
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs text-volvo-blue hover:underline inline-flex items-center gap-1 mt-1">
                        Truy cập <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Cam kết của chúng tôi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((commitment, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{commitment.title}</h3>
                <p className="text-muted-foreground">{commitment.desc}</p>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Báo cáo lỗi & Liên hệ</h2>
          <Card className="p-6">
            <p className="text-muted-foreground mb-6">Nếu bạn gặp khó khăn khi truy cập volvocars.vn, hoặc phát hiện rào cản khả năng truy cập, vui lòng báo cáo cho chúng tôi:</p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Email chuyên biệt</h4>
                <a href="mailto:accessibility@volvocars.vn" className="text-volvo-blue hover:underline">accessibility@volvocars.vn</a>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Hotline 24/7</h4>
                <a href="tel:1800555888" className="text-volvo-blue hover:underline">1800 555 888</a>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Form trực tuyến</h4>
                <a href="/contact?type=accessibility" className="text-volvo-blue hover:underline">Báo cáo lỗi truy cập</a>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                Cam kết phản hồi
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Xác nhận nhận báo cáo: <strong>24 giờ</strong></li>
                <li>• Phân loại mức độ nghiêm trọng: <strong>48 giờ</strong></li>
                <li>• Khắc phục lỗi Level A: <strong>7 ngày</strong></li>
                <li>• Khắc phục lỗi Level AA: <strong>30 ngày</strong></li>
                <li>• Cung cấp giải pháp thay thế tạm thời: <strong>Ngay lập tức</strong></li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}