# web_final_java
# Cấu trúc dự án
![BACKEND](./Backend/) folder chứa các code backend viết bằng Java.
![FRONTEND](./front-end-java-final/) folder chứa các code frontend viết banwfwg React.
## Chạy server backend - Java
### Cấu hình kết nối database
![DATABASE](./Backend/src/main/resources/application.yml)
- Phía trên là đường dẫn đến file cấu hình kết nối với database của server backend, cấu hình kết nối:
    + Cổng kết nối server: 8099
    + Cổng kết nối đến Database: 3360
    + Tên database: final_java_backend
    + username,password: "root",""
    + Máy chủ server mail: smtp.gmail.com
- Sau khi kiểm tra các cấu hình kết nối data base, truy cập đường dẫn dưới đây để truy cập vào File ![App.java](./Backend/src/main/java/com/example/backend/App.java), nhấn chọn Run nếu IDE có hỗ trợ hoặc gõ ```mvn spring-boot:run``` trên Terminal để tiến hành chạy Server.
***
## Chạy server fronted - React
![DBCONNECT CONFIG](./front-end-java-final/src/services/index.js)
- Phía trên là file các cấu hình để liên kết server front-end và back-end.
- Để chạy server front-end:
    + Từ thư mục gốc của Project, trỏ hướng đến thư mục ![FRONTEND](./front-end-java-final/) bằng câu lệnh ```cd front-end-java-final```.
    + Tiến hành tải các module cần thiết cho dự án bằng câu lệnh ```npm install```.
    + Tiến hành chạy server front end bằng câu lệnh ```npm start```.
    + Sau khi thực thi câu lệnh, trình editor sẽ tự động chuyển hướng đến trang web localhost của website hoặc có thể truy cậy qua đường dẫn ![http://localhost:3000]