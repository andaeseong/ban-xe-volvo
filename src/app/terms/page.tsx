'use client';

import { Card } from '@/components/ui/Card';
import { Shield, FileText, Clock, CheckCircle, AlertTriangle, User, CreditCard, Car, Shield as ShieldIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  {
    id: 'acceptance',
    title: '1. Chấp nhận điều khoản',
    content: `Bằng cách truy cập và sử dụng trang web volvocars.vn ("Trang web"), bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản sử dụng này ("Điều khoản"). Nếu bạn không đồng ý với bất kỳ phần nào của Điều khoản, vui lòng không sử dụng Trang web. Chúng tôi có thể cập nhật Điều khoản này bất kỳ lúc nào; việc tiếp tục sử dụng Trang web sau khi đăng tải thay đổi即视为接受新条款。`
  },
  {
    id: 'services',
    title: '2. Dịch vụ và tính năng',
    content: `Trang web cung cấp các dịch vụ sau: (a) Thông tin sản phẩm xe Volvo (thông số, giá, hình ảnh, video); (b) Công cụ tính toán trả góp, định cấu hình xe; (c) Đăng ký lái thử, yêu cầu báo giá, tư vấn; (d) Giỏ hàng, danh sách yêu thích, quản lý hồ sơ; (e) Tìm đại lý授权, đặt lịch dịch vụ; (f) Tin tức, bài viết, video về Volvo. Một số dịch vụ có thể yêu cầu đăng ký tài khoản hoặc cung cấp thông tin cá nhân (xem Chính sách bảo mật).`
  },
  {
    id: 'account',
    title: '3. Tài khoản người dùng',
    content: `Khi đăng ký tài khoản, bạn cam kết: (a) cung cấp thông tin chính xác, đầy đủ, cập nhật; (b) không giả mạo người khác; (c) bảo mật mật khẩu và chịu trách nhiệm mọi hoạt động dưới tài khoản; (d) thông báo ngay khi phát hiện vi phạm bảo mật. Chúng tôi có quyền khóa, xóa tài khoản vi phạm Điều khoản hoặc pháp luật.`
  },
  {
    id: 'ip',
    title: '4. Sở hữu trí tuệ',
    content: `Tất cả nội dung trên Trang web (văn bản, hình ảnh, video, logo, thiết kế, mã nguồn, cơ sở dữ liệu) là tài sản của Volvo Car Corporation hoặc được cấp phép, được bảo vệ bởi luật bản quyền, thương hiệu, và các luật sở hữu trí tuệ áp dụng. Bạn không được sao chép, phân phát, sửa đổi, tạo tác phẩm phái sinh, reverse engineer, hoặc khai thác thương mại bất kỳ phần nào trừ khi có sự cho phép bằng văn bản từ Volvo.`
  },
  {
    id: 'user-conduct',
    title: '5. Hành vi người dùng & Nội dung cấm',
    content: `Bạn đồng ý KHÔNG: (a) sử dụng Trang web cho mục đích bất hợp pháp, gian lận, gây hại; (b) can thiệp, làm gián đoạn máy chủ, mạng lưới, bảo mật; (c) thu thập dữ liệu tự động (scraping) không được phép; (d) tải lên virus, malware, mã độc; (e) đăng tải nội dung vi phạm bản quyền, khiêu dâm, bạo lực, ghét cay đắng, spam; (f) giả mạo nhân viên Volvo, đại lý, hoặc bên thứ ba; (g) can thiệp vào công cụ tính toán, form, API.`
  },
  {
    id: 'calculator',
    title: '6. Công cụ tính toán & Thông tin giá',
    content: `Công cụ tính toán trả góp, định cấu hình xe cung cấp thông tin tham khảo ước lượng. Kết quả không phải là cam kết tài chính, không thay thế hợp đồng chính thức. Giá xe, lãi suất, khuyến mãi có thể thay đổi bất cứ lúc nào không báo trước. Giá hiển thị đã bao gồm VAT (nếu có ghi chú) nhưng chưa bao gồm phí đăng ký, phí trước bạ, bảo hiểm, phí giao xe (trừ khi ghi rõ). Vui lòng liên hệ đại lý授权 để có báo giá chính xác, cam kết.`
  },
  {
    id: 'test-drive',
    title: '7. Đăng ký lái thử',
    content: `Đăng ký lái thử là yêu cầu tư vấn, không phải hợp đồng mua bán. Đại lý授权 sẽ liên hệ xác nhận lịch, địa điểm, điều kiện. Người lái thử phải: (a) có bằng lái xe hợp pháp, còn hạn; (b) trên 18 tuổi; (c) tuân thủ quy tắc an toàn của đại lý; (d) chịu trách nhiệm vi phạm pháp luật khi lái thử. Volvo và đại lý不承担 trách nhiệm tai nạn do lỗi của người lái thử.`
  },
  {
    id: 'links',
    title: '8. Liên kết bên thứ ba',
    content: `Trang web có thể chứa liên kết đến website của đại lý授权, ngân hàng, bảo hiểm, đối tác, mạng xã hội. Volvo không kiểm soát, không chịu trách nhiệm về nội dung, chính sách bảo mật, thực tiễn của các trang web bên thứ ba. Việc truy cập liên kết là rủi ro của bạn.`
  },
  {
    id: 'disclaimer',
    title: '9. Miễn trừ trách nhiệm',
    content: `TRANG WEB ĐƯỢC CUNG CẤP "NGUYÊN TRẠNG" VÀ "THEO SỴ CÓ". VOLVO KHÔNG CAM KẾT: (a) Trang web luôn khả dụng, không gián đoạn, không lỗi; (b) Thông tin chính xác, đầy đủ, cập nhật, phù hợp mục đích; (c) Không có virus, mã độc; (d) Kết quả tính toán, báo giá chính xác tuyệt đối. TRONG HẠN CHO PHÉP CỦA PHÁP LUẬT, VOLVO KHÔNG CHỊU TRÁCH NHIỆM VỀ THIỆT HẠI TRỰC TIẾP, GIÁN TIẾP, NGẪU NHIÊN, KẾT QUẢ, PHẠT (BAO GỒM MẤT LỢI NHUẬN, DỮ LIỆU, SỬ DỤNG) PHÁT SINH TỪ VIỆC SỬ DỤNG HOẶC KHÔNG THỂ SỬ DỤNG TRANG WEB.`
  },
  {
    id: 'liability',
    title: '10. Giới hạn trách nhiệm',
    content: `TRÁCH NHIỆM TỔNG HỢP CỦA VOLVO ĐỐI VỚI BẤN KẾT NỐI VỚI ĐIỀU KHOẢN NÀY KHÔNG VƯỢT QUÁ SỐ TIỀN BẠN ĐÃ TRẢ CHO VOLVO (NẾU CÓ) HOẶC 1.000.000 VNĐ (GÍA TRỊ LỚN HƠN). GIỚI HẠN NÀY ÁP DỤNG DÙ TRÁCH NHIỆM PHÁT SINH TỪ HỢP ĐỒNG, TORT (BAO GỒM SỰ BẤT CẨN), TRÁCH NHIỆM NGHIÊM NGẶT, HOẶC BẤT KỲ CƠ SỞ PHÁP LÝ NÀO KHÁC.`
  },
  {
    id: 'indemnity',
    title: '11. Bồi thường',
    content: `Bạn đồng ý bảo vệ, bồi thường, và miễn trừ trách nhiệm cho Volvo Car Corporation, công ty liên kết, đại lý授权, nhân viên, quản trị viên, đại diện khỏi mọi yêu cầu, thiệt hại, chi phí (bao gồm phí luật sư) phát sinh từ: (a) vi phạm Điều khoản này; (b) vi phạm quyền sở hữu trí tuệ, quyền riêng tư của bên thứ ba; (c) sử dụng trái phép Trang web; (d) nội dung bạn đăng tải.`
  },
  {
    id: 'termination',
    title: '12. Chấm dứt',
    content: `Chúng tôi có quyền tạm ngưng, chấm dứt quyền truy cập Trang web của bạn bất kỳ lúc nào, không cần báo trước, nếu vi phạm Điều khoản, pháp luật, hoặc gây hại cho Volvo, người dùng khác. Các điều khoản 4, 5, 8, 9, 10, 11, 12, 13, 14 vẫn có hiệu lực sau khi chấm dứt.`
  },
  {
    id: 'governing-law',
    title: '13. Pháp luật áp dụng & Giải quyết tranh chấp',
    content: `Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp nảy sinh từ hoặc liên quan đến Điều khoản/Trang web sẽ được giải quyết bởi Tòa án nhân dân có thẩm quyền tại Việt Nam, trừ khi pháp luật yêu cầu khác.`
  },
  {
    id: 'general',
    title: '14. Điều khoản chung',
    content: `(a) Toàn bộ thỏa thuận: Điều khoản này (kèm Chính sách bảo mật, Chính sách Cookie) cấu thành toàn bộ thỏa thuận giữa bạn và Volvo về việc sử dụng Trang web. (b) Không 포기 quyền: Việc Volvo không thực thi một quyền không构成 포기 quyền đó. (c) Tách biệt: Nếu một điều khoản bị tuyên bố vô hiệu, các điều khoản còn lại vẫn có hiệu lực. (d) Chuyển nhượng: Volvo có quyền chuyển nhượng quyền/nghĩa vụ; bạn không được chuyển nhượng. (e) Ngôn ngữ: Phiên bản tiếng Việt là chính thức; bản dịch ngôn ngữ khác chỉ mang tính tham khảo.`
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Điều khoản sử dụng</h1>
          <p className="text-muted-foreground mt-1">Cập nhật lần cuối: Tháng 1/2026 | Có hiệu lực từ: 01/01/2026</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 hidden lg:block">
            <Card className="p-4 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Mục lục</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="block text-sm text-muted-foreground hover:text-volvo-blue transition-colors py-1">
                    {section.title}
                  </a>
                ))}
              </nav>
            </Card>
          </aside>
          
          <main className="lg:col-span-3 space-y-8">
            {sections.map((section) => (
              <Card key={section.id} id={section.id} className="p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">{section.title}</h2>
                <div className="prose prose-muted max-w-none whitespace-pre-wrap">{section.content}</div>
              </Card>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}