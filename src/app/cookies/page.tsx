'use client';

import { Card } from '@/components/ui/Card';
import { Shield, Cookie, Database, Eye, Globe, Clock, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const cookieCategories = [
  {
    id: 'necessary',
    name: 'Cookie bắt buộc (Luôn bật)',
    icon: Shield,
    description: 'Cần thiết để trang web hoạt động bình thường. Không thể tắt.',
    cookies: [
      { name: 'session_id', provider: 'Volvo', purpose: 'Quản lý phiên đăng nhập, giỏ hàng', expiry: 'Phiên trình' },
      { name: 'csrf_token', provider: 'Volvo', purpose: 'Bảo vệ chống tấn công CSRF', expiry: 'Phiên trình' },
      { name: 'cookie_consent', provider: 'Volvo', purpose: 'Lưu tùy chọn đồng ý cookie', expiry: '1 năm' },
      { name: 'language', provider: 'Volvo', purpose: 'Nhớ ngôn ngữ đã chọn', expiry: '1 năm' },
      { name: 'region', provider: 'Volvo', purpose: 'Nhớ khu vực/đại lý gần nhất', expiry: '1 năm' },
    ],
    required: true,
  },
  {
    id: 'analytics',
    name: 'Cookie phân tích',
    icon: Database,
    description: 'Giúp chúng tôi hiểu cách bạn sử dụng trang web để cải thiện trải nghiệm.',
    cookies: [
      { name: '_ga', provider: 'Google Analytics', purpose: 'Phân biệt người dùng, theo dõi phiên', expiry: '26 tháng' },
      { name: '_ga_*', provider: 'Google Analytics GA4', purpose: 'Lưu trữ và đếm lượt xem trang', expiry: '26 tháng' },
      { name: '_gid', provider: 'Google Analytics', purpose: 'Phân biệt người dùng trong 24h', expiry: '24 giờ' },
      { name: '_gat', provider: 'Google Analytics', purpose: 'Giới hạn tỷ lệ yêu cầu', expiry: '1 phút' },
      { name: 'clarity_session', provider: 'Microsoft Clarity', purpose: 'Phân tích hành vi, heatmap, session replay', expiry: 'Phiên trình' },
      { name: 'clarity_user', provider: 'Microsoft Clarity', purpose: 'Phân biệt người dùng duy nhất', expiry: '1 năm' },
    ],
    required: false,
  },
  {
    id: 'marketing',
    name: 'Cookie marketing & Quảng cáo',
    icon: Globe,
    description: 'Dùng để hiển thị quảng cáo liên quan, đo lường hiệu quả chiến dịch, retargeting.',
    cookies: [
      { name: '_fbp', provider: 'Meta (Facebook)', purpose: 'Theo dõi chuyển đổi, tối ưu quảng cáo Facebook/Instagram', expiry: '3 tháng' },
      { name: '_fbc', provider: 'Meta (Facebook)', purpose: 'Lưu click ID quảng cáo Facebook', expiry: '3 tháng' },
      { name: 'ttclid', provider: 'TikTok', purpose: 'Theo dõi chuyển đổi TikTok Ads', expiry: '30 ngày' },
      { name: 'gclid', provider: 'Google Ads', purpose: 'Theo dõi click quảng cáo Google Search/Display', expiry: '90 ngày' },
      { name: 'IDE', provider: 'Google DoubleClick', purpose: 'Quảng cáo hiển thị, retargeting', expiry: '13 tháng' },
      { name: 'test_cookie', provider: 'Google DoubleClick', purpose: 'Kiểm tra trình duyệt hỗ trợ cookie', expiry: '15 phút' },
    ],
    required: false,
  },
  {
    id: 'functional',
    name: 'Cookie tùy chỉnh & Chức năng',
    icon: Eye,
    description: 'Lưu tùy chọn cá nhân hóa, video, bản đồ, chat hỗ trợ.',
    cookies: [
      { name: 'youtube_embed', provider: 'YouTube', purpose: 'Nhúng video, nhớ cài đặt phát', expiry: 'Không xác định' },
      { name: 'vimeo_embed', provider: 'Vimeo', purpose: 'Nhúng video, nhớ cài đặt phát', expiry: 'Không xác định' },
      { name: 'maps_api', provider: 'Google Maps', purpose: 'Hiển thị bản đồ đại lý, tìm đường', expiry: 'Không xác định' },
      { name: 'chat_widget', provider: 'Zendesk/Intercom', purpose: 'Hỗ trợ chat trực tuyến 24/7', expiry: 'Phiên trình' },
      { name: 'calculator_state', provider: 'Volvo', purpose: 'Lưu trạng thái công cụ tính toán', expiry: '30 ngày' },
    ],
    required: false,
  },
];

const rights = [
  { title: 'Quyền biết', desc: 'Bạn có quyền được thông báo rõ ràng, minh bạch về cookie nào được sử dụng, mục đích, nhà cung cấp, thời hạn.' },
  { title: 'Quyền đồng ý', desc: 'Cookie không bắt buộc chỉ được đặt sau khi bạn đồng ý rõ ràng (opt-in). Bạn có thể từ chối.' },
  { title: 'Quyền rút lại đồng ý', desc: 'Bạn có thể thay đổi hoặc rút lại sự đồng ý bất kỳ lúc nào qua cài đặt cookie hoặc xóa cookie trên trình duyệt.' },
  { title: 'Quyền truy cập & xóa', desc: 'Bạn có thể yêu cầu xem, xuất, xóa dữ liệu cá nhân được thu thập qua cookie (xem Chính sách bảo mật).' },
  { title: 'Quyền không bị phân biệt đối xử', desc: 'Việc từ chối cookie không bắt buộc không làm giảm chất lượng dịch vụ cốt lõi (mua xe, lái thử, tính toán).' },
];

const browserInstructions = [
  { browser: 'Chrome', steps: 'Cài đặt > Quyền riêng tư và bảo mật > Cookie và dữ liệu trang web > Xem tất cả dữ liệu trang web > Tìm "volvocars.vn" > Xóa' },
  { browser: 'Firefox', steps: 'Tùy chọn > Quyền riêng tư & Bảo mật > Cookie và dữ liệu trang web > Quản lý dữ liệu > Tìm "volvocars.vn" > Xóa được chọn' },
  { browser: 'Safari', steps: 'Tùy chọn > Quyền riêng tư > Quản lý dữ liệu trang web > Tìm "volvocars.vn" > Xóa' },
  { browser: 'Edge', steps: 'Cài đặt > Cookie và quyền trang web > Quản lý và xóa cookie > Tìm "volvocars.vn" > Xóa' },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Chính sách Cookie</h1>
          <p className="text-muted-foreground mt-1">Cập nhật lần cuối: Tháng 1/2026 | Phiên bản: 2.0</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 hidden lg:block">
            <Card className="p-4 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Mục lục</h3>
              <nav className="space-y-2">
                <a href="#what-are-cookies" className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">Cookie là gì?</a>
                <a href="#categories" className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">Phân loại Cookie</a>
                <a href="#manage" className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">Quản lý Cookie</a>
                <a href="#rights" className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">Quyền của bạn</a>
                <a href="#browser" className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">Xóa theo trình duyệt</a>
                <a href="#contact" className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">Liên hệ</a>
              </nav>
            </Card>
          </aside>
          
          <main className="lg:col-span-3 space-y-8">
            <Card id="what-are-cookies" className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Cookie className="h-6 w-6 text-volvo-blue" aria-hidden="true" />
                Cookie là gì?
              </h2>
              <div className="prose prose-muted max-w-none">
                <p>Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn (máy tính, điện thoại, máy tính bảng) khi bạn truy cập trang web. Cookie giúp trang web nhớ các hành động và tùy chọn của bạn (như đăng nhập, ngôn ngữ, kích thước chữ, giỏ hàng) trong một khoảng thời gian nhất định, để bạn không phải nhập lại mỗi khi quay lại hoặc duyệt giữa các trang.</p>
                <p>Cookie có thể là:</p>
                <ul>
                  <li><strong>Cookie phiên (Session cookie):</strong> Tự động xóa khi bạn đóng trình duyệt.</li>
                  <li><strong>Cookie liên tục (Persistent cookie):</strong> Còn lại trên thiết bị cho đến khi hết hạn hoặc bạn xóa thủ công.</li>
                  <li><strong>Cookie thứ nhất (First-party cookie):</strong> Được đặt bởi trang web bạn đang truy cập (volvocars.vn).</li>
                  <li><strong>Cookie thứ ba (Third-party cookie):</strong> Được đặt bởi miền khác (Google, Meta, TikTok, v.v.) thông qua các tập lệnh, pixel, iframe nhúng trên trang web.</li>
                </ul>
              </div>
            </Card>
            
            <Card id="categories" className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Database className="h-6 w-6 text-volvo-blue" aria-hidden="true" />
                Phân loại Cookie trên volvocars.vn
              </h2>
              
              <div className="space-y-6">
                {cookieCategories.map((category) => (
                  <div key={category.id} className="border border-border rounded-xl overflow-hidden">
                    <div className={cn('p-4 flex items-center gap-3', category.required ? 'bg-volvo-blue/5' : 'bg-muted/30')}>
                      <category.icon className={cn('h-6 w-6', category.required ? 'text-volvo-blue' : 'text-muted-foreground')} aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      {category.required && (
                        <span className="ml-auto px-2 py-1 text-xs rounded-full bg-volvo-blue/10 text-volvo-blue font-medium">Bắt buộc</span>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-muted-foreground">
                            <th className="p-2 font-medium">Tên Cookie</th>
                            <th className="p-2 font-medium">Nhà cung cấp</th>
                            <th className="p-2 font-medium">Mục đích</th>
                            <th className="p-2 font-medium">Thời hạn</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.cookies.map((cookie, i) => (
                            <tr key={i} className="border-b border-border/50 last:border-0">
                              <td className="p-2 font-mono text-foreground">{cookie.name}</td>
                              <td className="p-2 text-muted-foreground">{cookie.provider}</td>
                              <td className="p-2 text-muted-foreground">{cookie.purpose}</td>
                              <td className="p-2 text-muted-foreground">{cookie.expiry}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card id="manage" className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-volvo-blue" aria-hidden="true" />
                Quản lý sự đồng ý Cookie
              </h2>
              <div className="prose prose-muted max-w-none">
                <p>Khi lần đầu truy cập volvocars.vn, bạn sẽ thấy banner cookie yêu cầu sự đồng ý. Bạn có thể:</p>
                <ul>
                  <li><strong>Chấp nhận tất cả:</strong> Đồng ý mọi loại cookie (phân tích, marketing, chức năng).</li>
                  <li><strong>Tùy chỉnh:</strong> Chọn từng nhóm cookie muốn cho phép (trừ cookie bắt buộc).</li>
                  <li><strong>Từ chối tất cả (trừ bắt buộc):</strong> Chỉ cho phép cookie bắt buộc.</li>
                </ul>
                <p>Để thay đổi sau này, nhấn vào biểu tượng <strong>Cookie</strong> ở góc dưới bên phải màn hình (hoặc menu cài đặt trên mobile) để mở lại bảng quản lý.</p>
                <p>Lưu ý: Nếu bạn xóa cookie <code>cookie_consent</code>, banner sẽ hiện lại lần truy cập tiếp theo.</p>
              </div>
            </Card>
            
            <Card id="rights" className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                Quyền của bạn liên quan đến Cookie
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {rights.map((right, i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/30">
                    <h4 className="font-medium text-foreground mb-1">{right.title}</h4>
                    <p className="text-sm text-muted-foreground">{right.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card id="browser" className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Download className="h-6 w-6 text-volvo-blue" aria-hidden="true" />
                Xóa/Cập nhật Cookie trên trình duyệt
              </h2>
              <div className="space-y-4">
                {browserInstructions.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/30">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-volvo-blue" aria-hidden="true" />
                      {item.browser}
                    </h4>
                    <p className="text-sm text-muted-foreground font-mono">{item.steps}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  Lưu ý quan trọng
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Xóa cookie có thể đăng xuất bạn khỏi tài khoản, xóa giỏ hàng, đặt lại tùy chọn ngôn ngữ/khu vực.</li>
                  <li>• Chặn tất cả cookie (kể cả bắt buộc) có thể khiến trang web không hoạt động đúng.</li>
                  <li>• Bạn có thể dùng chế độ ẩn danh/riêng tư (Incognito/Private) để duyệt mà không lưu cookie.</li>
                </ul>
              </div>
            </Card>
            
            <Card id="contact" className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-volvo-blue" aria-hidden="true" />
                Liên hệ về Cookie
              </h2>
              <div className="prose prose-muted max-w-none">
                <p>Nếu bạn có câu hỏi, yêu cầu, hoặc khiếu nại về việc sử dụng cookie trên volvocars.vn:</p>
                <ul>
                  <li><strong>Email:</strong> privacy@volvocars.com (chủ đề: Cookie Policy)</li>
                  <li><strong>Hotline:</strong> 1800 555 888 (miễn phí, 24/7)</li>
                  <li><strong>Địa chỉ:</strong> Volvo Car Corporation, Data Protection Office, SE-405 31 Gothenburg, Thụy Điển</li>
                </ul>
                <p>Chúng tôi sẽ phản hồi trong vòng 30 ngày theo quy định pháp luật.</p>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}