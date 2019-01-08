'use strict';
const {cartGateway, customerGateway} = require('../gateways/index');

module.exports = {
    getCartForCustomerWithId(id) {
        return cartGateway.getCartsByCustomerId(id);
    },

    createCartForCustomerWithId(id, newCart) {
        const res = {};
        return customerGateway.getCustomerById(id).then((customer) => {
            res.customer = customer;
            if (customer) {
                return cartGateway.createCart(newCart);
            } else {
                return Promise.resolve();
            }
        }).then((cart) => {
            res.cart = cart;
            return res;
        });
    },

    updateCartForCustomerWithId(id, newCart) {
        const res = {};
        return customerGateway.getCustomerById(id).then((customer) => {
            res.customer = customer;
            if (customer) {
                return cartGateway.updateCartByCustomerId(id, newCart);
            } else {
                return Promise.resolve();
            }
        }).then((cart) => {
            res.cart = cart;
            return res;
        });
    },

    deleteCartForCustomerWithId(id) {
        const res = {};
        return customerGateway.getCustomerById(id).then((customer) => {
            res.customer = customer;
            if (customer) {
                return cartGateway.deleteCartByCustomerId(id);
            } else {
                return Promise.resolve();
            }
        }).then((cart) => {
            res.cart = cart;
            return res;
        });
    }
};
