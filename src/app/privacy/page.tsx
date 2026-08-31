'use client';

import { Card } from '@/components/ui/Card';
import { Shield, User, Mail, Database, Lock, Globe, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  {
    id: 'controller',
    title: '1. Bộ kiểm soát dữ liệu',
    content: `
      <p>Volvo Car Corporation (tổ chức pháp lý Thụy Điển, đăng ký tại Gothenburg, Thụy Điển) là bộ kiểm soát dữ liệu cho việc xử lý dữ liệu cá nhân của bạn khi bạn truy cập trang web này, sử dụng dịch vụ của chúng tôi, hoặc tương tác với đại lý授权 Volvo tại Việt Nam.</p>
      <p>Chúng tôi có thể liên hệ qua: privacy@volvocars.com hoặc địa chỉ: Volvo Car Corporation, SE-405 31 Gothenburg, Thụy Điển.</p>
    `
  },
  {
    id: 'data-collected',
    title: '2. Dữ liệu chúng tôi thu thập',
    content: `
      <h4>Dữ liệu bạn cung cấp trực tiếp:</h4>
      <ul>
        <li>Thông tin nhận diện: họ tên, email, số điện thoại, địa chỉ</li>
        <li>Thông tin xe: sở thích mẫu xe, lịch sử mua xe, số khung, biển số</li>
        <li>Thông tin tài chính: thu nhập, thông tin vay, lịch sử tín dụng (khi申请 trả góp)</li>
        <li>Thông tin giao dịch: đơn đặt hàng, hợp đồng, hóa đơn, bảo hành</li>
      </ul>
      <h4>Dữ liệu thu thập tự động:</h4>
      <ul>
        <li>Dữ liệu kỹ thuật: địa chỉ IP, loại trình duyệt, hệ điều hành, thiết bị</li>
        <li>Dữ liệu sử dụng: trang truy cập, thời gian, click, cuộn, tìm kiếm</li>
        <li>Cookie và công nghệ tương tự: xem mục 5</li>
        <li>Dữ liệu vị trí: khi bạn cho phép (tìm đại lý gần nhất)</li>
      </ul>
      <h4>Dữ liệu từ bên thứ ba:</h4>
      <ul>
        <li>Đại lý授权: thông tin dịch vụ, bảo dưỡng, sửa chữa</li>
        <li>Cơ quan tín dụng: báo cáo tín dụng (khi申请 tài chính)</li>
        <li>Đối tác marketing: dữ liệu quảng cáo, retargeting (chỉ khi đồng ý)</li>
      </ul>
    `
  },
  {
    id: 'purpose',
    title: '3. Mục đích xử lý & Cơ sở pháp lý',
    content: `
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-2 font-medium">Mục đích</th>
            <th className="text-left p-2 font-medium">Cơ sở pháp lý</th>
            <th className="text-left p-2 font-medium">Loại dữ liệu</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/50">
            <td className="p-2">Thực hiện hợp đồng mua xe, dịch vụ</td>
            <td className="p-2">Thực hiện hợp đồng (GDPR Art. 6.1.b)</td>
            <td className="p-2">Nhận diện, liên hệ, xe, tài chính</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2">Đăng ký lái thử, tư vấn</td>
            <td className="p-2">Đồng ý (GDPR Art. 6.1.a)</td>
            <td className="p-2">Liên hệ, sở thích, vị trí</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2">Marketing, bản tin, ưu đãi</td>
            <td className="p-2">Đồng ý (GDPR Art. 6.1.a)</td>
            <td className="p-2">Liên hệ, sở thích, hành vi</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2">Cải thiện website, phân tích</td>
            <td className="p-2">Lợi ích hợp pháp (GDPR Art. 6.1.f)</td>
            <td className="p-2">Kỹ thuật, sử dụng, cookie</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2">Tuân thủ pháp luật, kế toán</td>
            <td className="p-2">Nghĩa vụ pháp lý (GDPR Art. 6.1.c)</td>
            <td className="p-2">Giao dịch, hợp đồng, tài chính</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2">An ninh, chống gian lận</td>
            <td className="p-2">Lợi ích hợp pháp (GDPR Art. 6.1.f)</td>
            <td className="p-2">Kỹ thuật, IP, hành vi</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    id: 'sharing',
    title: '4. Chia sẻ dữ liệu',
    content: `
      <p>Chúng tôi chỉ chia sẻ dữ liệu cá nhân khi cần thiết và có cơ sở pháp lý:</p>
      <ul>
        <li><strong>Đại lý授权 Volvo tại Việt Nam:</strong> để thực hiện bán hàng, dịch vụ, bảo dưỡng, bảo hành</li>
        <li><strong>Nhà cung cấp dịch vụ:</strong> hosting, analytics, email, CRM, thanh toán, giao hàng (chỉ xử lý theo hướng dẫn của chúng tôi)</li>
        <li><strong>Cơ quan nhà nước:</strong> khi bị yêu cầu bởi pháp luật, tòa án, cơ quan điều tra</li>
        <li><strong>Đối tác tài chính:</strong> ngân hàng, công ty tài chính, bảo hiểm (khi bạn申请 trả góp/bảo hiểm)</li>
        <li><strong>Đối tác marketing:</strong> Google, Meta, TikTok (chỉ khi bạn đồng ý cookie marketing)</li>
        <li><strong>Chuyển nhượng kinh doanh:</strong> trong trường hợp hợp nhất, mua bán, tái cấu trúc (sẽ thông báo trước)</li>
      </ul>
      <p>Chúng tôi <strong>không bán</strong> dữ liệu cá nhân của bạn cho bên thứ ba.</p>
    `
  },
  {
    id: 'cookies',
    title: '5. Cookie & Công nghệ theo dõi',
    content: `
      <p>Trang web sử dụng cookie và công nghệ tương tự. Xem chi tiết tại <a href="/cookies" className="text-volvo-blue hover:underline">Chính sách Cookie</a>.</p>
      <h4>Phân loại:</h4>
      <ul>
        <li><strong>Cookie bắt buộc:</strong> Hoạt động trang web, bảo mật, giỏ hàng, phiên đăng nhập (luôn bật)</li>
        <li><strong>Cookie phân tích:</strong> Google Analytics, Microsoft Clarity - hiểu cách bạn sử dụng trang web</li>
        <li><strong>Cookie marketing:</strong> Google Ads, Meta Pixel, TikTok Pixel - hiển thị quảng cáo liên quan</li>
        <li><strong>Cookie tùy chỉnh:</strong> Nhớ ngôn ngữ, khu vực, sở thích hiển thị</li>
      </ul>
      <p>Bạn có thể quản lý sự đồng ý cookie bất kỳ lúc nào qua biểu tượng cookie ở góc màn hình.</p>
    `
  },
  {
    id: 'rights',
    title: '6. Quyền của bạn (GDPR & Luật Bảo vệ dữ liệu Việt Nam)',
    content: `
      <p>Bạn có các quyền sau đối với dữ liệu cá nhân của mình:</p>
      <ul>
        <li><strong>Quyền truy cập:</strong> Yêu cầu bản sao dữ liệu chúng tôi nắm giữ về bạn</li>
        <li><strong>Quyền chỉnh sửa:</strong> Yêu cầu sửa dữ liệu không chính xác hoặc không đầy đủ</li>
        <li><strong>Quyền xóa ("Quên được"):</strong> Yêu cầu xóa dữ liệu khi không còn cần thiết cho mục đích thu thập</li>
        <li><strong>Quyền hạn chế xử lý:</strong> Yêu cầu tạm dừng xử lý trong một số trường hợp</li>
        <li><strong>Quyền chuyển dữ liệu:</strong> Nhận dữ liệu ở định dạng có cấu trúc, phổ biến, đọc được bởi máy</li>
        <li><strong>Quyền phản đối:</strong> Phản đối xử lý dựa trên lợi ích hợp pháp (bao gồm marketing trực tiếp)</li>
        <li><strong>Quyền rút lại đồng ý:</strong> Rút lại đồng ý bất kỳ lúc nào cho các xử lý dựa trên đồng ý</li>
        <li><strong>Quyền khiếu nại:</strong> Khiếu nại tại Cơ quan bảo vệ dữ liệu (Việt Nam: Bộ Công Thương / Bộ An ninh)</li>
      </ul>
      <p>Để thực hiện quyền, liên hệ: privacy@volvocars.com hoặc đường dây nóng 1800 555 888. Chúng tôi sẽ phản hồi trong 30 ngày (có thể gia hạn 60 ngày cho yêu cầu phức tạp).</p>
    `
  },
  {
    id: 'retention',
    title: '7. Thời gian lưu giữ',
    content: `
      <ul>
        <li><strong>Dữ liệu hợp đồng/giao dịch:</strong> 10 năm sau khi kết thúc hợp đồng (theo luật kế toán, thuế)</li>
        <li><strong>Dữ liệu bảo hành/dịch vụ:</strong> 10 năm sau bảo hành cuối cùng (theo luật bảo vệ người tiêu dùng)</li>
        <li><strong>Dữ liệu marketing:</strong> Cho đến khi bạn rút đồng ý hoặc 3 năm không tương tác</li>
        <li><strong>Dữ liệu phân tích/cookie:</strong> Tối đa 26 tháng (Google Analytics), 13 tháng (Marketing)</li>
        <li><strong>Dữ liệu ứng tuyển:</strong> 12 tháng sau khi quá trình tuyển dụng kết thúc</li>
        <li><strong>Dữ liệu CCTV/an ninh:</strong> 30 ngày (trừ khi cần cho điều tra)</li>
      </ul>
      <p>Dữ liệu được ẩn danh/hủy nhận dạng có thể được lưu giữ vô thời hạn cho mục đích thống kê, nghiên cứu.</p>
    `
  },
  {
    id: 'security',
    title: '8. Bảo mật dữ liệu',
    content: `
      <p>Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân:</p>
      <ul>
        <li>Mã hóa TLS 1.2+ cho dữ liệu truyền tải, AES-256 cho dữ liệu lưu trữ</li>
        <li>Kiểm soát truy cập theo nguyên tắc "ít đặc quyền nhất", xác thực đa yếu tố (MFA)</li>
        <li>Giám sát an ninh 24/7, kiểm tra xâm nhập định kỳ, chương trình bug bounty</li>
        <li>Đánh giá tác động bảo vệ dữ liệu (DPIA) cho xử lý rủi ro cao</li>
        <li>Huấn luyện nhân viên về bảo mật, quy trình xử lý sự cố vi phạm dữ liệu</li>
        <li>Chỉ làm việc với nhà cung cấp cam kết bảo mật tương đương (DPA, SCC)</li>
      </ul>
      <p>Trong trường hợp vi phạm dữ liệu cá nhân có rủi ro cao cho quyền và tự do của bạn, chúng tôi sẽ thông báo cho cơ quan giám sát và bạn trong 72 giờ theo quy định.</p>
    `
  },
  {
    id: 'international',
    title: '9. Chuyển dữ liệu quốc tế',
    content: `
      <p>Dữ liệu có thể được xử lý tại:</p>
      <ul>
        <li><strong>Thụy Điển (EU):</strong> Máy chủ chính, trung tâm dữ liệu Volvo (bảo vệ GDPR đầy đủ)</li>
        <li><strong>Việt Nam:</strong> Đại lý授权, máy chủ CDN, backup (tuân thủ Luật An ninh mạng, Đề án 06)</li>
        <li><strong>Singapore/Hồng Kông:</strong> Một số dịch vụ cloud, CDN khu vực APAC</li>
        <li><strong>Mỹ:</strong> Google Analytics, Meta, Microsoft (có Standard Contractual Clauses - SCC)</li>
      </ul>
      <p>Mọi chuyển dữ liệu ra khỏi EU/Việt Nam đều có bảo vệ thích hợp: quyết định đầy đủ (Adequacy), SCC, BCR, hoặc sự đồng ý rõ ràng của bạn.</p>
    `
  },
  {
    id: 'children',
    title: '10. Dữ liệu trẻ em',
    content: `
      <p>Dịch vụ của chúng tôi không dành cho trẻ em dưới 16 tuổi. Chúng tôi không cố ý thu thập dữ liệu cá nhân từ trẻ em. Nếu bạn là cha/mẹ/người giám hộ và phát hiện con bạn đã cung cấp dữ liệu cho chúng tôi, vui lòng liên hệ privacy@volvocars.com để chúng tôi xóa ngay lập tức.</p>
    `
  },
  {
    id: 'changes',
    title: '11. Thay đổi chính sách',
    content: `
      <p>Chúng tôi có thể cập nhật chính sách này để phản ánh thay đổi pháp luật, công nghệ, hoặc quy trình kinh doanh. Phiên bản mới sẽ được đăng tải tại trang này với ngày "Cập nhật lần cuối". Đối với thay đổi quan trọng, chúng tôi sẽ thông báo qua email hoặc thông báo nổi bật trên trang web.</p>
      <p>Vui lòng xem lại chính sách này định kỳ.</p>
    `
  },
  {
    id: 'contact',
    title: '12. Liên hệ',
    content: `
      <p>Nếu bạn có câu hỏi, yêu cầu, hoặc khiếu nại về bảo vệ dữ liệu cá nhân:</p>
      <ul>
        <li><strong>Email:</strong> privacy@volvocars.com</li>
        <li><strong>Địa chỉ:</strong> Volvo Car Corporation, Data Protection Office, SE-405 31 Gothenburg, Thụy Điển</li>
        <li><strong>Hotline Việt Nam:</strong> 1800 555 888 (miễn phí, 24/7)</li>
        <li><strong>Data Protection Officer (DPO):</strong> dpo@volvocars.com</li>
      </ul>
      <p>Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và tuân thủ đầy đủ các quy định pháp luật áp dụng.</p>
    `
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Chính sách bảo mật</h1>
          <p className="text-muted-foreground mt-1">Cập nhật lần cuối: Tháng 1/2026 | Áp dụng từ: 01/01/2026</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 hidden lg:block">
            <Card className="p-4 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Mục lục</h3>
              <nav className="space-y-2">
                {sections.map((section, i) => (
                  <a key={section.id} href={`#${section.id}`} className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">
                    {section.title}
                  </a>
                ))}
              </nav>
            </Card>
          </aside>
          
          <main className="lg:col-span-3 space-y-8">
            {sections.map((section, i) => (
              <Card key={section.id} id={section.id} className="p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">{section.title}</h2>
                <div className="prose prose-muted max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
              </Card>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}