'use strict';
const {
    authController, cartController, categoryController, customerController, employeeController, feedbackController, imageController, orderController, positionController, producerController, productController, rateController, shippingController
} = require('../controllers/index');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../../libs/logger');

const apiPrefix = '/api/v1';

const createCustomResponse = (res, status, body) => {
    res.status(status).send({message: body});
};

const respondWithMethodNotAllowed = (req, res) => {
    return createCustomResponse(res, 405, 'Method Not Allowed');
};

const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Access denied');
    }
    next();
};

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
        return res.status(400).send('Invalid ID');
    }
    next();
};

const isAuthenticatedAndAdmin = [passport.authenticate('jwt', {session: false}), isAdmin, validateObjectId];

module.exports = (app) => {
    app.route(`${apiPrefix}/signup`)
        .post(authController.signUp);

    app.route(`${apiPrefix}/signin`)
        .post(authController.signIn);

    app.route(`${apiPrefix}/categories`)
        .get(categoryController.getAllCategories)
        .post(isAuthenticatedAndAdmin, categoryController.createCategory)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/categories/:categoryId`)
        .get(categoryController.getCategory)
        .put(isAuthenticatedAndAdmin, categoryController.updateCategory)
        .delete(isAuthenticatedAndAdmin, categoryController.deleteCategory)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/customers`)
        .get(customerController.getAllCustomers)
        .post(isAuthenticatedAndAdmin, customerController.createCustomer)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/customers/:customerId`)
        .get(customerController.getCustomer)
        .put(customerController.updateCustomer)
        .delete(customerController.deleteCustomer)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/customers/:customerId/orders`)
        .get(orderController.getAllOrdersForCustomerWithId)
        .post(orderController.createOrderForCustomerWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/orders`)
        .get(isAuthenticatedAndAdmin, orderController.getAllOrders)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/orders/:orderId`)
        .get(orderController.getOrder)
        .put(orderController.updateOrder)
        .delete(orderController.deleteOrder)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/customers/:customerId/cart`)
        .get(cartController.getCartForCustomerWithId)
        .post(cartController.createCartForCustomerWithId)
        .put(cartController.updateCartForCustomerWithId)
        .delete(cartController.deleteCartForCustomerWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/employees`)
        .get(employeeController.getAllEmployees)
        .post(employeeController.createEmployee)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/employees/:employeeId`)
        .get(employeeController.getEmployee)
        .put(employeeController.updateEmployee)
        .delete(employeeController.deleteEmployee)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/positions`)
        .get(positionController.getAllPositions)
        .post(positionController.createPosition)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/positions/:positionId`)
        .get(positionController.getPosition)
        .put(positionController.updatePosition)
        .delete(positionController.deletePosition)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/producers`)
        .get(producerController.getAllProducers)
        .post(producerController.createProducer)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/producers/:producerId`)
        .get(producerController.getProducer)
        .put(producerController.updateProducer)
        .delete(producerController.deleteProducer)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/categories/:categoryId/products`)
        .get(productController.getAllProductsForCategoryWithId)
        .post(productController.createProductForCategoryWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/products/:productId`)
        .get(productController.getProduct)
        .put(productController.updateProduct)
        .delete(productController.deleteProduct)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/products/:productId/feedbacks`)
        .get(feedbackController.getAllFeedbacksForProductWithId)
        .post(feedbackController.createFeedbackForProductWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/feedbacks/:feedbackId`)
        .get(feedbackController.getFeedback)
        .put(feedbackController.updateFeedback)
        .delete(feedbackController.deleteFeedback)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/products/:productId/images`)
        .get(imageController.getAllImagesForProductWithId)
        .post(imageController.createImageForProductWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/images/:imageId`)
        .get(imageController.getImage)
        .put(imageController.updateImage)
        .delete(imageController.deleteImage)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/products/:productId/rates`)
        .get(rateController.getAllRatesForProductWithId)
        .post(rateController.createRateForProductWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/rates/:rateId`)
        .get(rateController.getRate)
        .put(rateController.updateRate)
        .delete(rateController.deleteRate)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/shippings`)
        .get(shippingController.getAllShippings)
        .post(shippingController.createShipping)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/shippings/:shippingId`)
        .get(shippingController.getShipping)
        .put(shippingController.updateShipping)
        .delete(shippingController.deleteShipping)
        .all(respondWithMethodNotAllowed);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    // no stacktraces leaked to user unless in development environment
    app.use((err, req, res, next) => {
        logger.error(err.message);
        res.status(err.status || 500).send({
            status: 'error',
            message: err.message,
            error: (process.env.NODE_ENV === 'development') ? err.stack : {}
        });
    });
};
