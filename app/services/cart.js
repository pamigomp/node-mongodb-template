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
                newCart.customerId = id;
                return cartGateway.createCart(newCart);
            } else {
                return Promise.resolve();
            }
        }).then((cart) => {
            res.cart = cart;
            return res;
        });
    },

    updateCartForCustomerWithId(id, updatedCart) {
        const res = {};
        return customerGateway.getCustomerById(id).then((customer) => {
            res.customer = customer;
            if (customer) {
                updatedCart.customerId = id;
                return cartGateway.updateCartByCustomerId(id, updatedCart);
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
