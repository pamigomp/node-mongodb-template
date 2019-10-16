'use strict';
const productModel = require('../models/product');

const getProducts = (by = {}, query = {}) => {
    const searchQuery = prepareSearchQuery(by, query);
    const paginationOptions = preparePaginationOptions(query);
    return productModel.paginate(searchQuery, paginationOptions).then((result) => {
        return {
            collection: result.docs,
            total: result.total,
            size: result.limit,
            pages: result.pages,
            page: result.page
        };
    });
};

const deleteProduct = (query) => {
    return productModel.findOneAndRemove(query);
};

const preparePriceQuery = (query) => {
    let result = null;

    if (query && query.minPrice) {
        result = {};
        result['$gte'] = query.minPrice;
    }
    if (query && query.maxPrice) {
        result = result || {};
        result['$lte'] = query.maxPrice;
    }

    return result;
};

const prepareSearchQuery = (by, query) => {
    const searchQuery = by;
    const priceQuery = preparePriceQuery(query);

    if (priceQuery) {
        searchQuery.salePriceGross = priceQuery;
    }
    if (query && query.search) {
        const queryRegExp = new RegExp(query.search, 'i');
        searchQuery.$or = [
            {title: queryRegExp},
            {description: queryRegExp},
            {category: queryRegExp},
            {producer: queryRegExp}
        ];
    }

    return searchQuery;
};

const preparePaginationOptions = (query) => {
    return {
        sort: {[query.sortBy || 'createdAt']: query && query.sortDir || '1'},
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 10,
        select: query.select ? query.select.split(',') : [],
        lean: true
    };
};

module.exports = {
    getAllProducts(query) {
        return getProducts({}, query);
    },

    createProduct(newProduct) {
        return productModel.create(newProduct);
    },

    getProductById(id) {
        return productModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateProductById(id, updatedProduct) {
        return productModel.findByIdAndUpdate(id, updatedProduct, {new: true});
    },

    deleteProductById(id) {
        return productModel.findByIdAndRemove(id);
    },

    getProductsByCategoryId(id, query) {
        const by = {categoryId: id};
        return getProducts(by, query);
    },

    getProductsByProductId(id, query) {
        const by = {productId: id};
        return getProducts(by, query);
    },

    deleteProductByCategoryId(id) {
        const query = {categoryId: id};
        return deleteProduct(query);
    },

    deleteProductByProductId(id) {
        const query = {productId: id};
        return deleteProduct(query);
    }
};
