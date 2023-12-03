import { TextMain } from "../../components";

function ListItem({ text }) {
    return (
      <li className="text-neutral-950 text-md font-light leading-7 mb-2">
        {text}
      </li>
    );
  }
function PageDescription(){
  const impressiveFeatures = [
    'Đa dạng các thiết bị số có thể mua bằng tiền mặt hoặc trả góp',
    'Một blog với đánh giá và bài viết về công nghệ và thiết bị số mới nhất',
    'Phần bình luận của người dùng và phần hỏi đáp để tương tác cộng đồng',
    'Đại diện cho một "ngôi nhà" công nghệ với tất cả các công nghệ cần thiết',
    'Giao diện dễ sử dụng để mang lại trải nghiệm tuyệt vời cho người dùng',
    'Thiết kế nhất quán và hấp dẫn mắt',
    'Trung tâm kết nối và chia sẻ thông tin cho những người đam mê công nghệ',
    'Hỗ trợ người dùng đưa ra quyết định mua sắm có thông tin',
  ];
  
    
      return (
        <div className="mt-10 max-w-screen-xl mx-auto px-4 text-justify">
          Get Tech là một cửa hàng trực tuyến sáng tạo cung cấp một lựa chọn đa dạng về các thiết bị số, có sẵn để mua bằng cả tiền mặt và tùy chọn trả góp. Hòa mình trong khẩu hiệu "Tham gia cách mạng số hóa ngay hôm nay," trang web không chỉ cung cấp trải nghiệm mua sắm mượt mà mà còn có một phần blog hấp dẫn, đầy đủ đánh giá sâu sắc, bài viết và video về công nghệ tiên tiến và các thiết bị số. Người dùng có thể tương tác tích cực với nội dung qua phần bình luận và một phần hỏi đáp, tạo ra một cộng đồng năng động của những người yêu công nghệ.
          <TextMain className="text-neutral-950 font-light leading-7 mb-6"></TextMain>
          <div className="text-neutral-950 text-xl font-medium mb-4">
          Một số tính năng ấn tượng của Get Tech bao gồm:
          </div>
    
          <ul className="list-disc pl-6">
            {impressiveFeatures.map((feature, index) => (
              <ListItem key={index} text={feature} />
            ))}
          </ul>
        </div>
      );
}
export default PageDescription;