'use strict';
const cartModel = require('../models/cart');

const getCarts = (query) => {
    return cartModel.find(query).lean();
};

const updateCart = (query, newCart) => {
    return cartModel.findOneAndUpdate(query, newCart, {new: true});
};

const deleteCart = (query) => {
    return cartModel.findOneAndRemove(query);
};

module.exports = {
    getAllCarts() {
        const query = {};
        return getCarts(query);
    },

    createCart(newCart) {
        return cartModel.create(newCart);
    },

    getCartById(id) {
        return cartModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateCartById(id, updatedCart) {
        return cartModel.findByIdAndUpdate(id, updatedCart, {new: true});
    },

    deleteCartById(id) {
        return cartModel.findByIdAndRemove(id);
    },

    getCartsByProductId(id) {
        const query = {productId: id};
        return getCarts(query);
    },

    getCartsByCustomerId(id) {
        const query = {customerId: id};
        return getCarts(query);
    },

    updateCartByProductId(id, updatedCart) {
        const query = {productId: id};
        return updateCart(query, updatedCart);
    },

    updateCartByCustomerId(id, updatedCart) {
        const query = {customerId: id};
        return updateCart(query, updatedCart);
    },

    deleteCartByProductId(id) {
        const query = {productId: id};
        return deleteCart(query);
    },

    deleteCartByCustomerId(id) {
        const query = {customerId: id};
        return deleteCart(query);
    }
};
