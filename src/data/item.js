// src/data/item.js

// Dữ liệu mẫu cho các sản phẩm
export const items = [

    // Trang 1
    {
      id: 1,
      name: 'Đồng Hồ Thông Minh Xiaomi Mi Watch S1',
      description: 'Đồng hồ thông minh với màn hình AMOLED, theo dõi sức khỏe toàn diện và thông báo thông minh.',
      price: 2_000_000, // 2,000,000đ
      category: 'Đồng hồ thông minh',
      stock: 15,
      image: 'https://example.com/images/product1.jpg',
      productCode: 'XMWS1-2024',
      status: 'Còn hàng',
      additionalInfo: 'Hàng chính hãng, bảo hành 12 tháng.'
    },
    {
      id: 2,
      name: 'Phụ Kiện Đồng Hồ Apple Watch Band Silicone',
      description: 'Dây silicone mềm mại, đa dạng màu sắc cho Apple Watch Series 6 và Series 7.',
      price: 500_000, // 500,000đ
      category: 'Phụ kiện',
      stock: 30,
      image: 'https://example.com/images/product2.jpg',
      productCode: 'AWBS-001',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu cao cấp, dễ dàng thay đổi dây đồng hồ.'
    },
    {
      id: 3,
      name: 'Đồng Hồ Thông Minh Samsung Galaxy Watch 6',
      description: 'Đồng hồ thông minh với màn hình AMOLED, theo dõi nhịp tim và sức khỏe toàn diện.',
      price: 3_500_000, // 3,500,000đ
      category: 'Đồng hồ thông minh',
      stock: 10,
      image: 'https://example.com/images/product3.jpg',
      productCode: 'SGW6-2024',
      status: 'Còn hàng',
      additionalInfo: 'Hỗ trợ kết nối LTE, bảo hành 24 tháng.'
    },
    {
      id: 4,
      name: 'Phụ Kiện Dây Da Chính Hãng Cho Đồng Hồ Rolex',
      description: 'Dây da cao cấp, thiết kế tinh tế phù hợp với đồng hồ Rolex.',
      price: 700_000, // 700,000đ
      category: 'Phụ kiện',
      stock: 25,
      image: 'https://example.com/images/product4.jpg',
      productCode: 'PARD-ROLEX',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu da thật, màu sắc đa dạng.'
    },
    {
      id: 5,
      name: 'Đồng Hồ Rolex Oyster Perpetual Day-Date 36mm Vàng Everose 18 ct',
      description: 'Hàng chính hãng mới 100% fullbox.',
      price: 1_010_000_000, // 1,010,000,000đ
      category: 'Đồng hồ cao cấp',
      stock: 5,
      image: 'https://example.com/images/product5.jpg',
      productCode: 'ROYPD36-V18',
      status: 'Còn hàng',
      additionalInfo: 'Bao gồm hộp, giấy tờ đầy đủ. Bảo hành chính hãng 5 năm.'
    },
    {
      id: 6,
      name: 'Đồng Hồ Thông Minh Huawei Watch GT 3',
      description: 'Đồng hồ thông minh với pin lâu dài, theo dõi sức khỏe và thể dục.',
      price: 7_500_000, // 7,500,000đ
      category: 'Đồng hồ thông minh',
      stock: 20,
      image: 'https://example.com/images/product6.jpg',
      productCode: 'HWGT3-2024',
      status: 'Còn hàng',
      additionalInfo: 'Thiết kế thanh lịch, bảo hành 12 tháng.'
    },
    {
      id: 7,
      name: 'Phụ Kiện Dây Da Chính Hãng Cho Đồng Hồ Apple Watch',
      description: 'Dây da cao cấp, thiết kế tinh tế phù hợp với Apple Watch.',
      price: 1_200_000, // 1,200,000đ
      category: 'Phụ kiện',
      stock: 40,
      image: 'https://example.com/images/product7.jpg',
      productCode: 'PARD-AW',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu da thật, màu sắc đa dạng.'
    },
    {
      id: 8,
      name: 'Đồng Hồ Thể Thao Garmin Fenix 7',
      description: 'Đồng hồ thể thao với GPS tích hợp, theo dõi hoạt động chi tiết và nhiều tính năng cho vận động viên.',
      price: 8_500_000, // 8,500,000đ
      category: 'Đồng hồ thể thao',
      stock: 8,
      image: 'https://example.com/images/product8.jpg',
      productCode: 'GF7-2024',
      status: 'Còn hàng',
      additionalInfo: 'Chống nước 100m, bảo hành 24 tháng.'
    },
    {
      id: 9,
      name: 'Phụ Kiện Dây Silicon Cho Đồng Hồ Thông Minh',
      description: 'Dây silicon linh hoạt, thoải mái khi sử dụng trong mọi hoạt động.',
      price: 300_000, // 300,000đ
      category: 'Phụ kiện',
      stock: 50,
      image: 'https://example.com/images/product9.jpg',
      productCode: 'PKDS-001',
      status: 'Còn hàng',
      additionalInfo: 'Dễ dàng thay đổi, nhiều màu sắc lựa chọn.'
    },
    {
      id: 10,
      name: 'Đồng Hồ Casio G-Shock GA-100',
      description: 'Đồng hồ bền bỉ với khả năng chống sốc và nước, thích hợp cho các hoạt động ngoài trời.',
      price: 1_500_000, // 1,500,000đ
      category: 'Đồng hồ thể thao',
      stock: 12,
      image: 'https://example.com/images/product10.jpg',
      productCode: 'GSHOCK-GA100',
      status: 'Còn hàng',
      additionalInfo: 'Thiết kế nam tính, bảo hành 12 tháng.'
    },
  
    // Trang 2
    {
      id: 11,
      name: 'Đồng Hồ Thông Minh Apple Watch Series 9',
      description: 'Đồng hồ thông minh với nhiều tính năng tiên tiến và thiết kế tinh tế.',
      price: 12_000_000, // 12,000,000đ
      category: 'Đồng hồ thông minh',
      stock: 18,
      image: 'https://example.com/images/product11.jpg',
      productCode: 'AWS9-2024',
      status: 'Còn hàng',
      additionalInfo: 'Màn hình Retina luôn bật, chống nước 50m.'
    },
    {
      id: 12,
      name: 'Phụ Kiện Sạc Không Dây Cho Đồng Hồ Thông Minh',
      description: 'Cáp sạc không dây tiện lợi và nhanh chóng, phù hợp với nhiều loại đồng hồ thông minh.',
      price: 600_000, // 600,000đ
      category: 'Phụ kiện',
      stock: 35,
      image: 'https://example.com/images/product12.jpg',
      productCode: 'PCSCDW-001',
      status: 'Còn hàng',
      additionalInfo: 'Hỗ trợ sạc nhanh, thiết kế nhỏ gọn.'
    },
    {
      id: 13,
      name: 'Đồng Hồ Seiko Presage Cocktail Time',
      description: 'Đồng hồ cơ tự động với thiết kế sang trọng và tinh tế, thích hợp cho các dịp đặc biệt.',
      price: 4_500_000, // 4,500,000đ
      category: 'Đồng hồ cao cấp',
      stock: 7,
      image: 'https://example.com/images/product13.jpg',
      productCode: 'SEPKCT-001',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu thép không gỉ, bảo hành 24 tháng.'
    },
    {
      id: 14,
      name: 'Phụ Kiện Bảo Vệ Kính Cho Đồng Hồ',
      description: 'Kính cường lực chống trầy xước, bảo vệ đồng hồ của bạn khỏi va đập và hư hỏng.',
      price: 400_000, // 400,000đ
      category: 'Phụ kiện',
      stock: 28,
      image: 'https://example.com/images/product14.jpg',
      productCode: 'PKBVKH-001',
      status: 'Còn hàng',
      additionalInfo: 'Dễ dàng lắp đặt, không ảnh hưởng đến thẩm mỹ đồng hồ.'
    },
    {
      id: 15,
      name: 'Đồng Hồ Tissot T-Touch Expert Solar',
      description: 'Đồng hồ năng lượng mặt trời với nhiều tính năng đa dạng, bao gồm cảm biến nhiệt độ và độ cao.',
      price: 3_000_000, // 3,000,000đ
      category: 'Đồng hồ cao cấp',
      stock: 9,
      image: 'https://example.com/images/product15.jpg',
      productCode: 'TTTES-001',
      status: 'Còn hàng',
      additionalInfo: 'Chống nước 100m, bảo hành 24 tháng.'
    },
    {
      id: 16,
      name: 'Phụ Kiện Đeo Tay Cho Đồng Hồ Thông Minh',
      description: 'Phụ kiện đeo tay đa dạng màu sắc, phù hợp với nhiều loại đồng hồ thông minh.',
      price: 350_000, // 350,000đ
      category: 'Phụ kiện',
      stock: 45,
      image: 'https://example.com/images/product16.jpg',
      productCode: 'PKDTTW-001',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu cao cấp, dễ dàng thay đổi.'
    },
    {
      id: 17,
      name: 'Đồng Hồ Omega Seamaster Diver 300M',
      description: 'Đồng hồ thể thao cao cấp, chống nước sâu và thiết kế thanh lịch.',
      price: 15_000_000, // 15,000,000đ
      category: 'Đồng hồ cao cấp',
      stock: 4,
      image: 'https://example.com/images/product17.jpg',
      productCode: 'OMEGASD300M',
      status: 'Còn hàng',
      additionalInfo: 'Bảo hành chính hãng 5 năm, kèm hộp và giấy tờ đầy đủ.'
    },
    {
      id: 18,
      name: 'Phụ Kiện Đồng Hồ Vòng Tay Thể Thao',
      description: 'Vòng tay thể thao chắc chắn, phù hợp với đồng hồ thể thao và các hoạt động ngoài trời.',
      price: 800_000, // 800,000đ
      category: 'Phụ kiện',
      stock: 22,
      image: 'https://example.com/images/product18.jpg',
      productCode: 'PKVTTT-001',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu cao su bền bỉ, thiết kế linh hoạt.'
    },
    {
      id: 19,
      name: 'Đồng Hồ Timex Weekender',
      description: 'Đồng hồ đơn giản, dễ dàng phối hợp với nhiều trang phục hàng ngày.',
      price: 900_000, // 900,000đ
      category: 'Đồng hồ thời trang',
      stock: 16,
      image: 'https://example.com/images/product19.jpg',
      productCode: 'TIMEXWD-001',
      status: 'Còn hàng',
      additionalInfo: 'Thiết kế linh hoạt, thay dây dễ dàng.'
    },
    {
      id: 20,
      name: 'Phụ Kiện Bộ Chuyển Đổi Dây Đồng Hồ',
      description: 'Bộ chuyển đổi giúp thay đổi dây đồng hồ dễ dàng, phù hợp với nhiều loại dây khác nhau.',
      price: 500_000, // 500,000đ
      category: 'Phụ kiện',
      stock: 33,
      image: 'https://example.com/images/product20.jpg',
      productCode: 'PKBCD-001',
      status: 'Còn hàng',
      additionalInfo: 'Bộ gồm nhiều loại kẹp và dụng cụ hỗ trợ.'
    },
  
    // Trang 3
    {
      id: 21,
      name: 'Đồng Hồ Breitling Navitimer',
      description: 'Đồng hồ hàng không cao cấp với nhiều tính năng điều hướng và thiết kế sang trọng.',
      price: 20_000_000, // 20,000,000đ
      category: 'Đồng hồ cao cấp',
      stock: 3,
      image: 'https://example.com/images/product21.jpg',
      productCode: 'BREITNAV-001',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu titanium, bảo hành 5 năm.'
    },
    {
      id: 22,
      name: 'Phụ Kiện Đồng Hồ Kính Sapphire',
      description: 'Kính sapphire chống trầy xước, bảo vệ đồng hồ hiệu quả và giữ cho đồng hồ luôn sáng bóng.',
      price: 1_000_000, // 1,000,000đ
      category: 'Phụ kiện',
      stock: 19,
      image: 'https://example.com/images/product22.jpg',
      productCode: 'PKKS-001',
      status: 'Còn hàng',
      additionalInfo: 'Dễ dàng lắp đặt, không gây ảnh hưởng đến thiết kế đồng hồ.'
    },
    {
      id: 23,
      name: 'Đồng Hồ Fossil Gen 6',
      description: 'Đồng hồ thông minh với hiệu năng mạnh mẽ, tính năng theo dõi sức khỏe và thiết kế thời thượng.',
      price: 5_500_000, // 5,500,000đ
      category: 'Đồng hồ thông minh',
      stock: 14,
      image: 'https://example.com/images/product23.jpg',
      productCode: 'FOSSGEN6-001',
      status: 'Còn hàng',
      additionalInfo: 'Hỗ trợ Google Wear OS, bảo hành 12 tháng.'
    },
    {
      id: 24,
      name: 'Phụ Kiện Đế Sạc Cho Đồng Hồ Thông Minh',
      description: 'Đế sạc tiện lợi, hỗ trợ sạc nhanh cho đồng hồ thông minh của bạn.',
      price: 700_000, // 700,000đ
      category: 'Phụ kiện',
      stock: 27,
      image: 'https://example.com/images/product24.jpg',
      productCode: 'PKDSC-001',
      status: 'Còn hàng',
      additionalInfo: 'Thiết kế nhỏ gọn, dễ dàng mang theo khi di chuyển.'
    },
    {
      id: 25,
      name: 'Đồng Hồ TAG Heuer Carrera',
      description: 'Đồng hồ thể thao cao cấp với thiết kế đậm chất thể thao và chất liệu bền bỉ.',
      price: 13_000_000, // 13,000,000đ
      category: 'Đồng hồ cao cấp',
      stock: 6,
      image: 'https://example.com/images/product25.jpg',
      productCode: 'TAGCARRERA',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu thép không gỉ, bảo hành 5 năm.'
    },
    {
      id: 26,
      name: 'Phụ Kiện Hộp Đựng Đồng Hồ Cao Cấp',
      description: 'Hộp đựng đồng hồ bằng da cao cấp, bảo vệ đồng hồ an toàn và giữ gìn vẻ đẹp.',
      price: 2_000_000, // 2,000,000đ
      category: 'Phụ kiện',
      stock: 10,
      image: 'https://example.com/images/product26.jpg',
      productCode: 'PKHDCC-001',
      status: 'Còn hàng',
      additionalInfo: 'Thiết kế sang trọng, nhiều ngăn để đựng đồng hồ và phụ kiện.'
    },
    {
      id: 27,
      name: 'Đồng Hồ Citizen Eco-Drive Promaster',
      description: 'Đồng hồ năng lượng mặt trời với thiết kế thể thao và bền bỉ, thích hợp cho các hoạt động ngoài trời.',
      price: 4_000_000, // 4,000,000đ
      category: 'Đồng hồ thể thao',
      stock: 11,
      image: 'https://example.com/images/product27.jpg',
      productCode: 'CITIZENEP-001',
      status: 'Còn hàng',
      additionalInfo: 'Chống nước 200m, bảo hành 24 tháng.'
    },
    {
      id: 28,
      name: 'Phụ Kiện Dây Kim Loại Cho Đồng Hồ Cao Cấp',
      description: 'Dây kim loại sang trọng, bền đẹp cho các dòng đồng hồ cao cấp.',
      price: 1_500_000, // 1,500,000đ
      category: 'Phụ kiện',
      stock: 21,
      image: 'https://example.com/images/product28.jpg',
      productCode: 'PKDKL-001',
      status: 'Còn hàng',
      additionalInfo: 'Thiết kế tinh tế, dễ dàng thay đổi.'
    },
    {
      id: 29,
      name: 'Đồng Hồ Patek Philippe Nautilus',
      description: 'Đồng hồ cao cấp với thiết kế độc đáo và tinh xảo, biểu tượng của sự sang trọng.',
      price: 30_000_000, // 30,000,000đ
      category: 'Đồng hồ cao cấp',
      stock: 2,
      image: 'https://example.com/images/product29.jpg',
      productCode: 'PATNAUT-001',
      status: 'Còn hàng',
      additionalInfo: 'Chất liệu vàng hồng 18 ct, bảo hành chính hãng 5 năm.'
    },
    {
      id: 30,
      name: 'Phụ Kiện Bộ Bảo Dưỡng Đồng Hồ',
      description: 'Bộ dụng cụ chuyên dụng để bảo dưỡng và vệ sinh đồng hồ, giúp đồng hồ luôn hoạt động tốt.',
      price: 2_500_000, // 2,500,000đ
      category: 'Phụ kiện',
      stock: 12,
      image: 'https://example.com/images/product30.jpg',
      productCode: 'PKBDD-001',
      status: 'Còn hàng',
      additionalInfo: 'Bao gồm các công cụ chính xác, hướng dẫn sử dụng chi tiết.'
    },
  ];
  
// Hàm lấy sản phẩm theo ID
export function getItemById(id) {
  return items.find(item => item.id === id) || null; // Trả về sản phẩm hoặc null nếu không tìm thấy
}

// Hàm lọc sản phẩm theo danh mục
export function getItemsByCategory(category) {
  return items.filter(item => item.category === category); // Lọc sản phẩm theo danh mục
}

// Hàm kiểm tra số lượng tồn kho của sản phẩm
export function checkStock(id, quantity) {
  const item = getItemById(id);
  return item && item.stock >= quantity; // Trả về true nếu đủ số lượng tồn kho
}

// Hàm giảm số lượng tồn kho của sản phẩm sau khi bán
export function reduceStock(id, quantity) {
  const item = getItemById(id);
  if (item && item.stock >= quantity) {
    item.stock -= quantity;
    return true; // Giảm số lượng thành công
  }
  return false; // Không đủ số lượng tồn kho để giảm
}