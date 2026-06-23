# 👟 Nike Shoes Store - Cửa Hàng Giày Nike Trực Tuyến

Dự án **Nike Shoes Store** là một ứng dụng web thương mại điện tử hoàn chỉnh (Fullstack) chuyên kinh doanh giày thể thao Nike. Hệ thống được xây dựng bằng kiến trúc Client-Server hiện đại, hỗ trợ thanh toán trực tuyến, trò chuyện thời gian thực (real-time chat) và quản lý admin toàn diện.

---

##  Kiến Trúc Hệ Thống

Dự án bao gồm 3 thành phần chính:
1. **Frontend (Client):** Ứng dụng Single Page Application (SPA) viết bằng **React.js** (chạy trên port `3000` hoặc production port qua Nginx).
2. **Backend (Server):** RESTful API server được viết bằng **Node.js & Express** tích hợp **Socket.io** cho kết nối thời gian thực (chạy trên port `5000`).
3. **Database:** Cơ sở dữ liệu quan hệ **MySQL** lưu trữ toàn bộ dữ liệu người dùng, sản phẩm, đơn hàng và các cuộc hội thoại.

---

##  Các Tính Năng Nổi Bật

###  Cho Khách Hàng (Client Interface)
* **Xem & Lọc sản phẩm:** Phân loại sản phẩm thông minh (Men, Women, Bestsellers, Sale...).
* **Tìm kiếm & Gợi ý (Fuzzy Search & Suggestion):** Tìm kiếm sản phẩm thông minh thời gian thực kèm hiển thị hình ảnh và giá sản phẩm ngay trên thanh tìm kiếm.
* **Giỏ hàng & Danh sách yêu thích (Cart & Wishlist):** Quản lý giỏ hàng trực quan, lưu sản phẩm yêu thích và chuyển đổi linh hoạt từ Wishlist sang Cart.
* **Đăng ký & Đăng nhập:** Hệ thống xác thực bằng **JWT (JSON Web Token)**, hỗ trợ upload ảnh đại diện và lưu địa chỉ giao hàng chi tiết.
* **Xác thực & Lấy lại mật khẩu:** Gửi mã OTP xác nhận qua Email (sử dụng **Nodemailer**).
* **Đánh giá sản phẩm:** Đánh giá số sao và bình luận chi tiết cho từng sản phẩm.
* **Thanh toán trực tuyến:** Tích hợp cổng thanh toán **PayPal Sandbox** (tạo đơn hàng và capture đơn hàng).
* **Trò chuyện trực tiếp (Live Chat Box):** Hỗ trợ khách hàng gửi tin nhắn thời gian thực trực tiếp đến admin thông qua **Socket.io**.

###  Cho Quản Trị Viên (Admin Dashboard)
* **Bảng điều khiển trực quan (Dashboard):** Xem thống kê doanh thu, số lượng đơn hàng, số người dùng đăng ký dưới dạng biểu đồ sinh động (sử dụng thư viện **Nivo Charts** - Bar, Line, Pie).
* **Quản lý sản phẩm:** Thêm mới (hỗ trợ tải lên hình ảnh qua **Multer**), chỉnh sửa thông tin, giá cả, danh mục, và xóa sản phẩm.
* **Quản lý đơn hàng:** Theo dõi và cập nhật trạng thái đơn hàng (Chờ xử lý, Đang giao, Đã hoàn thành).
* **Quản lý người dùng:** Danh sách thành viên, cập nhật quyền hạn (Customer / Admin) và tính năng khóa tài khoản (Ban/Unban) tức thì.
* **Hỗ trợ trực tuyến (Customer Care Chat):** Hệ thống chat đa kênh thời gian thực cho phép admin nhắn tin trả lời khách hàng ngay lập tức.
* **Quản lý Khuyến mãi (Voucher/Discount):** Tạo mã giảm giá, thiết lập hạn sử dụng và theo dõi hiệu lực.

---

##  Công Nghệ Sử Dụng

### Frontend (Client)
* **Core:** React 18, React Router Dom v6
* **State Management:** Redux Toolkit & React Redux
* **UI & Styling:** Material UI (MUI), TailwindCSS, Bootstrap 5, MDB React UI Kit, Sass/SCSS
* **Charts:** Nivo Charts (`@nivo/bar`, `@nivo/line`, `@nivo/pie`)
* **Realtime:** Socket.io-client
* **Khác:** Axios, Formik, Yup, Lucide React, React Toastify, FullCalendar

### Backend (Server)
* **Core:** Node.js, Express.js
* **Database Client:** MySQL2 (Connection Pool)
* **Authentication:** JWT, Bcryptjs
* **Realtime Server:** Socket.io
* **File Upload:** Multer (Lưu trữ ảnh sản phẩm và người dùng tại thư mục `/uploads`)
* **Email Service:** Nodemailer
* **Khác:** Node-cron (lập lịch công việc tự động), Axios

---

## ⚙️ Cấu Hình Môi Trường (.env)

Bạn cần tạo các file `.env` tương ứng cho cả Client và Server để cấu hình dự án.

### 1. Cấu hình Backend (`/server/.env`)
Tạo file `.env` trong thư mục `server/` và điền đầy đủ các thông tin:

```env
# Server Config
PORT=5000
CORS_ORIGIN=http://localhost:3000

# Database Config (MySQL)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=Nike

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Nodemailer Configuration (Gửi email khôi phục mật khẩu)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=your_gmail_address@gmail.com
SMTP_PASSWORD=your_app_password_here

# PayPal Configuration (Tích hợp thanh toán)
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
```

### 2. Cấu hình Frontend (`/client/.env`)
Tạo file `.env` trong thư mục `client/` để chỉ định API Endpoint:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Hướng Dẫn Cài Đặt và Khởi Chạy

### Bước 1: Setup Database MySQL
1. Khởi động MySQL trên máy của bạn.
2. Tạo một database mới tên là `Nike` (hoặc tên tùy cấu hình).
3. Import cấu trúc bảng (schema) của dự án từ file SQL (nếu có).

### Bước 2: Chạy Backend (Server)
1. Di chuyển vào thư mục server:
   ```bash
   cd server
   ```
2. Cài đặt các thư viện dependencies:
   ```bash
   npm install
   ```
3. Tạo file `.env` như mô tả ở phần trên.
4. Chạy server ở chế độ phát triển (sử dụng nodemon):
   ```bash
   npm start
   ```

### Bước 3: Chạy Frontend (Client)
1. Mở một terminal mới và di chuyển vào thư mục client:
   ```bash
   cd client
   ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Tạo file `.env` chứa `REACT_APP_API_URL`.
4. Khởi chạy ứng dụng React:
   ```bash
   npm start
   ```
5. Trình duyệt sẽ tự động mở trang [http://localhost:3000](http://localhost:3000).

