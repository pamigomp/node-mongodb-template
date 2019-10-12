'use strict';
const {categoryGateway, productGateway} = require('../gateways/index');

module.exports = {
    getAllProducts(query) {
        return productGateway.getAllProducts(query);
    },

    createProduct(newProduct) {
        return productGateway.createProduct(newProduct);
    },

    getProductById(id) {
        return productGateway.getProductById(id);
    },

    updateProductById(id, updatedProduct) {
        return productGateway.updateProductById(id, updatedProduct);
    },

    deleteProductById() {
        return productGateway.deleteProductById();
    },

    getAllProductsForCategoryWithId(id, query) {
        return productGateway.getProductsByCategoryId(id, query);
    },

    createProductForCategoryWithId(id, newProduct) {
        const res = {};
        return categoryGateway.getCategoryById(id).then((category) => {
            res.category = category;
            if (category) {
                newProduct.categoryId = id;
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
