// src/store/modules/orders.js
export default {
  state: {
    // Khởi tạo trạng thái đơn hàng từ localStorage nếu có, nếu không thì là mảng trống
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  },
  mutations: {
    // Thiết lập danh sách đơn hàng
    SET_ORDERS(state, orders) {
      state.orders = orders;
      // Lưu vào localStorage
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    // Thêm đơn hàng mới
    ADD_ORDER(state, order) {
      state.orders.push(order);
      // Lưu vào localStorage
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
  actions: {
    // Giả lập lấy đơn hàng từ API
    async fetchOrders({ commit }) {
      try {
        // Giả lập một API call
        const response = [
          { id: 1, total: 2500000, status: "Đang xử lý", createdAt: "2024-11-01" },
          { id: 2, total: 500000, status: "Đã giao", createdAt: "2024-11-10" },
        ];
        // Cập nhật trạng thái đơn hàng
        commit("SET_ORDERS", response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    },
    // Thêm đơn hàng mới
    addOrder({ commit }, order) {
      // Tạo ID giả lập cho đơn hàng
      const newOrder = {
        ...order,
        id: Date.now(), // Sử dụng timestamp làm ID giả lập
        createdAt: new Date().toISOString(), // Ngày tạo đơn
      };
      commit("ADD_ORDER", newOrder);
    },
  },
  getters: {
    // Lấy toàn bộ đơn hàng
    allOrders: (state) => state.orders,
    // Tìm đơn hàng theo ID
    getOrderById: (state) => (id) => state.orders.find((order) => order.id === id),
    // Lấy tổng số đơn hàng
    totalOrders: (state) => state.orders.length,
    // Lọc đơn hàng theo trạng thái
    getOrdersByStatus: (state) => (status) =>
      state.orders.filter((order) => order.status === status),
  },
};
