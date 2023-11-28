import React, { useState } from "react";
import { TextMain } from "../../components";
import { TextReveal } from "../../components/Animate";

function TableOfContent({ onCategorySelect }) {
  return (
    <div className="mt-5 w-[184px] h-[180px] flex-col justify-start items-start gap-6 inline-flex ml-20">
      <TextMain className={'text-neutral-950 font-bold text-xl'}>Mục lục</TextMain>
      <div className="self-stretch h-[132px] flex-col justify-start items-start gap-3 flex">
        <NavItem onClick={() => onCategorySelect("general")}>Chung</NavItem>
        <NavItem onClick={() => onCategorySelect("trusts-safety")}>Chính sách mua hàng</NavItem>
        <NavItem onClick={() => onCategorySelect("services")}>Dịch vụ</NavItem>
        <NavItem onClick={() => onCategorySelect("billing")}>Thanh toán</NavItem>
      </div>
    </div>
  );
}

function NavItem({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer text-base font-light font-['Inter'] leading-normal hover:text-primary"
    >
      {children}
    </div>
  );
}

function Question({ questionsAndAnswers }) {
  return (
    <div className="w-[808px] px-4 flex-col justify-start items-start gap-4 inline-flex">
      {questionsAndAnswers.map((qa, index) => (
        <div key={index}>
            <TextMain className={"font-bold text-xl justify-between items-center inline-flex text-primary py-6"}>
              {<TextReveal text={qa.question}></TextReveal>}
            </TextMain>
            <TextMain className={"text-black"}>
              {qa.answer}
            </TextMain>
            <div className="border-b border-zinc-400 py-2">
            </div>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const categoryData = {
    "general": [
      {
        question: "Tôi có thể mua sản phẩm từ Get Tech bằng cách thanh toán trả góp không?",
        answer: "Có, Tech Heim cung cấp tùy chọn mua sản phẩm bằng cả tiền mặt và thanh toán trả góp. Điều này cho phép bạn chọn phương thức thanh toán phù hợp với nhu cầu và ngân sách của bạn."
      },
      {
        question: "Có chính sách đổi trả cho sản phẩm không?",
        answer: "Có, chúng tôi có một chính sách đổi trả linh hoạt. Nếu bạn không hài lòng với sản phẩm, bạn có thể trả lại nó trong vòng 30 ngày để được hoàn tiền hoặc đổi sản phẩm khác."
      },
      {
        question: "Làm cách nào để tương tác với nội dung trên Get Tech Magazine?",
        answer: "Bạn có thể tương tác tích cực với nội dung trên tạp chí bằng cách để lại bình luận và tham gia vào phần hỏi đáp. Hãy thoải mái chia sẻ ý kiến, đặt câu hỏi và tương tác với cộng đồng người hâm mộ công nghệ."
      },
      {
        question: "Get Tech có cung cấp bảo hành cho sản phẩm không?",
        answer: "Có, Tech Heim cung cấp bảo hành cho tất cả các sản phẩm đủ điều kiện. Chi tiết bảo hành cụ thể có thể thay đổi tùy thuộc vào nhà sản xuất và danh mục sản phẩm. Vui lòng tham khảo mô tả sản phẩm hoặc liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi để biết thêm thông tin."
      },
      {
        question: "Làm thế nào để nhận sự hỗ trợ với việc mua sắm hoặc bất kỳ yêu cầu nào khác?",
        answer: "Nếu bạn cần sự hỗ trợ với việc mua sắm hoặc có bất kỳ câu hỏi nào khác, đội ngũ hỗ trợ khách hàng cam kết của chúng tôi sẵn sàng giúp đỡ. Bạn có thể liên hệ với chúng tôi qua trang liên hệ trên trang web, và chúng tôi sẽ vui lòng hỗ trợ bạn ngay lập tức."
      },
    ],
    "trusts-safety": [
      {
        question: "Có những biện pháp nào để ngăn chặn gian lận và lừa đảo không?",
        answer: "Chúng tôi có một đội ngũ chuyên nghiệp theo dõi các giao dịch để phát hiện hoạt động đáng ngờ và sử dụng các công cụ phát hiện gian lận để bảo vệ người dùng của chúng tôi. Trong trường hợp có vấn đề, chúng tôi có quy trình giải quyết tranh chấp."
      },
      {
        question: "Làm thế nào để xác minh tính xác thực của các sản phẩm được bán trên nền tảng của chúng tôi?",
        answer: "Chúng tôi hợp tác chặt chẽ với các người bán được xác minh và áp dụng các biện pháp kiểm soát chất lượng nghiêm ngặt để đảm bảo rằng các sản phẩm được liệt kê trên nền tảng của chúng tôi là chính hãng và đáp ứng tiêu chuẩn chất lượng của chúng tôi."
      },
      {
        question: "Có thể báo cáo về mối quan ngại về an toàn hoặc nội dung không phù hợp không?",
        answer: "Có, chúng tôi có hệ thống báo cáo. Nếu bạn gặp nội dung không an toàn hoặc không phù hợp, vui lòng báo cáo cho đội ngũ hỗ trợ của chúng tôi, và chúng tôi sẽ thực hiện các biện pháp thích hợp."
      },
      {
        question: "Chúng tôi xử lý dữ liệu và quyền riêng tư như thế nào?",
        answer: "Chúng tôi tuân thủ chặt chẽ các chính sách quyền riêng tư và tuân thủ các quy định về bảo vệ dữ liệu. Dữ liệu của bạn được lưu trữ an toàn, và chúng tôi không chia sẻ nó với bên thứ ba mà không có sự đồng ý của bạn."
      },
      {
        question: "Việc thực hiện giao dịch với người dùng khác trên nền tảng của chúng tôi có an toàn không?",
        answer: "Chúng tôi cung cấp các tùy chọn thanh toán an toàn, và chúng tôi khuyến khích việc sử dụng chúng cho tất cả các giao dịch. Nếu bạn gặp vấn đề nào, đội ngũ hỗ trợ của chúng tôi sẽ ở đây để hỗ trợ bạn."
      },
    ],
    "services": [
      {
        question: "Thời gian xử lý thông thường cho dịch vụ sửa chữa sản phẩm là bao lâu?",
        answer: "Thời gian xử lý cho dịch vụ sửa chữa sản phẩm phụ thuộc vào loại sửa chữa và sự có sẵn của linh kiện. Đội ngũ dịch vụ của chúng tôi sẽ cung cấp cho bạn một khung thời gian ước lượng."
      },
      {
        question: "Chúng tôi có cung cấp dịch vụ tận nơi hay tôi phải gửi sản phẩm của mình để sửa chữa?",
        answer: "Chúng tôi cung cấp cả dịch vụ sửa chữa tận nơi và tại cửa hàng, phụ thuộc vào địa điểm của bạn và loại sửa chữa cần thiết."
      },
      {
        question: "Tôi có thể tùy chỉnh một sản phẩm theo yêu cầu của mình không?",
        answer: "Có, chúng tôi cung cấp dịch vụ tùy chỉnh sản phẩm. Hãy liên hệ với đội ngũ tùy chỉnh của chúng tôi để thảo luận về yêu cầu và lựa chọn của bạn."
      },
      {
        question: "Có bảo hành cho các dịch vụ được cung cấp không?",
        answer: "Chúng tôi cung cấp bảo hành cho các dịch vụ của chúng tôi. Thời gian bảo hành có thể thay đổi tùy thuộc vào loại dịch vụ, và chi tiết có thể được tìm thấy trong hợp đồng dịch vụ."
      },
      {
        question: "Làm thế nào để theo dõi tình trạng yêu cầu dịch vụ của tôi?",
        answer: "Bạn có thể theo dõi tình trạng yêu cầu dịch vụ của mình bằng cách đăng nhập vào tài khoản của bạn trên nền tảng của chúng tôi hoặc liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi."
      },
    ],
    "billing": [
      {
        question: "Tôi có thể thiết lập thanh toán định kỳ cho đăng ký của mình không?",
        answer: "Có, chúng tôi cung cấp tùy chọn thiết lập thanh toán định kỳ cho đăng ký, giúp bạn dễ dàng quản lý hóa đơn của mình."
      },
      {
        question: "Nếu có vấn đề với bảng cước thanh toán của tôi, điều gì sẽ xảy ra?",
        answer: "Nếu bạn có câu hỏi hoặc lo ngại về bảng cước thanh toán của mình, vui lòng liên hệ với bộ phận thanh toán của chúng tôi, và chúng tôi sẽ hỗ trợ bạn giải quyết mọi không nhất quán."
      },
      {
        question: "Chúng tôi có cung cấp giảm giá hoặc khuyến mãi cho một số phương thức thanh toán không?",
        answer: "Có, chúng tôi có thể cung cấp giảm giá hoặc khuyến mãi cho một số phương thức thanh toán cụ thể. Kiểm tra trang khuyến mãi của chúng tôi hoặc liên hệ với đội ngũ hỗ trợ để biết chi tiết."
      },
      {
        question: "Có phí trễ hạn cho thanh toán quá hạn không?",
        answer: "Chúng tôi có một khoảng thời gian ân hạn cho thanh toán, nhưng nếu thanh toán trễ, có thể áp dụng phí trễ hạn. Vui lòng đảm bảo thanh toán đúng hạn."
      },
      {
        question: "Tôi có thể xem và tải lịch sử thanh toán và biên nhận của mình không?",
        answer: "Có, bạn có thể truy cập lịch sử thanh toán và tải xuống biên nhận thông qua tài khoản của bạn trên nền tảng của chúng tôi. Điều này giúp bạn dễ dàng theo dõi các giao dịch tài chính của mình."
      },
    ],
    // Các danh mục khác được giữ nguyên.
  };
  
  const questionsAndAnswers = categoryData[selectedCategory] || [];
  return (
    <>
      <div className="flex justify-center">
        <TableOfContent onCategorySelect={setSelectedCategory} />
        <div className="flex flex-col">
          <Question questionsAndAnswers={questionsAndAnswers} />
        </div>
      </div>
    </>
  );
}

export default FAQ;
