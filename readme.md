Đăng ký người dùng (/register)
Đầu tiên, chúng ta sẽ thử nghiệm chức năng đăng ký người dùng.

Phương thức: POST

URL: http://localhost:3000/register

Body: Chọn raw và JSON rồi nhập:

json
Copy code
{
"username": "user1",
"password": "password123"
}
Mô tả:

username: tên người dùng (phải là duy nhất).
password: mật khẩu (sẽ được mã hóa trước khi lưu vào database).
Kết quả mong đợi:

Nhận được phản hồi với thông báo thành công và dữ liệu người dùng đã được lưu vào MongoDB.
2. Đăng nhập người dùng (/login)
   Sau khi đăng ký, hãy thử đăng nhập để lấy token JWT.

Phương thức: POST
URL: http://localhost:3000/login
Body: Chọn raw và JSON rồi nhập:
json
Copy code
{
"username": "user1",
"password": "password123"
}
Kết quả mong đợi:
Nhận được phản hồi chứa token JWT trong cookie hoặc trong phản hồi JSON.
Token này sẽ được sử dụng cho các yêu cầu cần xác thực khác.
Lưu ý: Để dùng token trong các yêu cầu sau, bạn cần copy token từ phần phản hồi và thêm vào Headers của mỗi yêu cầu dưới dạng Authorization: Bearer <JWT_TOKEN>.

3. Tạo vai trò (/roles)
   Chức năng này tạo các vai trò người dùng như admin, editor, user.

Phương thức: POST
URL: http://localhost:3000/roles
Headers:
Authorization: Bearer <JWT_TOKEN>
Body: Chọn raw và JSON rồi nhập:
json
Copy code
{
"name": "admin"
}
Kết quả mong đợi:
Vai trò mới được tạo và lưu vào bảng Roles trong MongoDB.
4. Gán quyền cho vai trò (/roles/:roleId/permissions)
   Gán quyền cụ thể cho vai trò. Ví dụ: gán quyền read, write cho admin.

Phương thức: POST
URL: http://localhost:3000/roles/<roleId>/permissions
Thay <roleId> bằng ID của vai trò bạn đã tạo.
Headers:
Authorization: Bearer <JWT_TOKEN>
Body: Chọn raw và JSON rồi nhập:
json
Copy code
{
"permissions": ["read", "write"]
}
Kết quả mong đợi:
Vai trò được gán quyền thành công và phản hồi bao gồm thông tin của vai trò với các quyền đã gán.
5. Xem danh sách người dùng (/users)
   Chức năng này yêu cầu phải có token hợp lệ để truy cập thông tin người dùng.

Phương thức: GET
URL: http://localhost:3000/users
Headers:
Authorization: Bearer <JWT_TOKEN>
Kết quả mong đợi:
Nhận được danh sách người dùng, nếu người dùng có quyền truy cập.
Lưu ý khi Test với JWT Token
Để đảm bảo tính bảo mật:

Mỗi khi thực hiện yêu cầu có xác thực, bạn cần đặt JWT token vào header Authorization với cú pháp: Bearer <JWT_TOKEN>.
Có thể dùng tính năng Authorization trong Postman và chọn Bearer Token, sau đó dán token vào trường để Postman tự động thêm vào tất cả các yêu cầu.