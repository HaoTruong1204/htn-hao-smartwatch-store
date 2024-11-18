// Import các module cần thiết
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình middleware
app.use(cors()); // Cho phép Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse request body dạng JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse request body dạng URL-encoded

// Dữ liệu mẫu
let items = [
  {
    id: 1,
    name: "Đồng Hồ Thông Minh Xiaomi Mi Watch S1",
    description: "Đồng hồ thông minh với màn hình AMOLED, theo dõi sức khỏe toàn diện và thông báo thông minh.",
    price: 2000000,
    image: "/images/watches/xiaomi-mi-watch-s1.png",
    status: "Còn hàng",
  },
  {
    id: 2,
    name: "Phụ Kiện Đồng Hồ Apple Watch Band Silicone",
    description: "Dây silicone mềm mại, đa dạng màu sắc cho Apple Watch Series 6 và Series 7.",
    price: 500000,
    image: "/images/accessories/apple-watch-band-silicone.png",
    status: "Còn hàng",
  },
];

// Endpoint lấy danh sách sản phẩm
app.get('/item', (req, res) => {
  res.status(200).json(items);
});

// Endpoint lấy thông tin chi tiết sản phẩm theo ID
app.get('/item/:id', (req, res) => {
  const item = items.find((item) => item.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm!' });
  }
  res.status(200).json(item);
});

// Endpoint thêm một sản phẩm mới
app.post('/item', (req, res) => {
  const newItem = {
    id: items.length + 1, // Tự động tạo ID mới
    ...req.body,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Endpoint cập nhật thông tin sản phẩm theo ID
app.put('/item/:id', (req, res) => {
  const index = items.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm!' });
  }
  items[index] = { ...items[index], ...req.body }; // Gộp thông tin mới vào sản phẩm cũ
  res.status(200).json(items[index]);
});

// Endpoint xóa một sản phẩm theo ID
app.delete('/item/:id', (req, res) => {
  const index = items.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm!' });
  }
  const deletedItem = items.splice(index, 1);
  res.status(200).json(deletedItem);
});

// Lắng nghe trên một cổng
const PORT = 3000; // Bạn có thể thay đổi port tại đây
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
