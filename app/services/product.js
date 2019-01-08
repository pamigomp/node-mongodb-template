'use strict';
const {categoryGateway, productGateway} = require('../gateways/index');
const helpers = require('../helpers/helpers');

module.exports = {
    getAllProducts() {
        return productGateway.getAllProducts().then((res) => {
            return helpers.caseInsensitiveSorting(res, 'title');
        });
    },

    createProduct(newProduct) {
        return productGateway.createProduct(newProduct);
    },

    getProductById(id) {
        return productGateway.getProductById(id);
    },

    updateProductById(id, newProduct) {
        return productGateway.updateProductById(id, newProduct);
    },

    deleteProductById() {
        return productGateway.deleteProductById();
    },

    getAllProductsForCategoryWithId(id) {
        return productGateway.getProductsByCategoryId(id);
    },

    createProductForCategoryWithId(id, newProduct) {
        const res = {};
        return categoryGateway.getCategoryById(id).then((category) => {
            res.category = category;
            if (category) {
                return productGateway.createProduct(newProduct);
            } else {
                return Promise.resolve();
            }
        }).then((product) => {
            res.product = product;
            return res;
        });
    }
};
