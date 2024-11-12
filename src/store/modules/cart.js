// src/store/modules/cart.js
export default {
    state: {
        items: [],
    },
    mutations: {
        ADD_TO_CART(state, product) {
            state.items.push(product);
        },
        REMOVE_FROM_CART(state, productId) {
            state.items = state.items.filter(item => item.id !== productId);
        },
    },
    actions: {
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
    },
    getters: {
        cartItems: state => state.items,
    },
};
