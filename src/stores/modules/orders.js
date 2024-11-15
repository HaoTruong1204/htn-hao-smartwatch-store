// src/store/modules/orders.js
export default {
    state: {
      orders: [],
    },
    mutations: {
      setOrders(state, orders) {
        state.orders = orders;
      },
    },
    actions: {
      fetchOrders({ commit }) {
        // Giả lập lấy đơn hàng từ API
        const orders = [
          { id: 1, total: 2500000, status: 'Đang xử lý' },
          { id: 2, total: 500000, status: 'Đã giao' },
        ];
        commit('setOrders', orders);
      },
    },
    getters: {
      allOrders: (state) => state.orders,
      getOrderById: (state) => (id) => state.orders.find((order) => order.id === id),
    },
  };
  