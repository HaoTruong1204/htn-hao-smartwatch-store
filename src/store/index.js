// src/store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import cart from './modules/cart';
import products from './modules/products';
import orders from './modules/orders';
import admin from './modules/admin';

export default createStore({
    modules: {
        auth,
        cart,
        products,
        orders,
        admin,
    },
});
