'use strict';
const {
    authController, cartController, categoryController, customerController, employeeController, feedbackController, imageController, orderController, positionController, producerController, productController, pushNotificationController, rateController, shippingController
} = require('../controllers/index');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../../libs/logger');
const cacheMiddleware = require('../utils/cache')();

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
    app.route(`${apiPrefix}/signup/customer/local`)
        .post(authController.signUpCustomerLocal)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/signin/customer/local`)
        .post(authController.signInCustomerLocal)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/signin/user/facebook`)
        .get(authController.signInCustomerFacebook)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/signup/employee/local`)
        .post(authController.signUpEmployeeLocal)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/signin/employee/local`)
        .post(authController.signInEmployeeLocal)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/subscribe`)
        .post(pushNotificationController.createSubscription)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/notify`)
        .post(isAuthenticatedAndAdmin, pushNotificationController.sendNotifications);

    app.route(`${apiPrefix}/categories`)
        .get(cacheMiddleware, categoryController.getAllCategories)
        .post(isAuthenticatedAndAdmin, categoryController.createCategory)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/categories/:categoryId`)
        .get(categoryController.getCategory)
        .put(isAuthenticatedAndAdmin, categoryController.updateCategory)
        .delete(isAuthenticatedAndAdmin, categoryController.deleteCategory)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/customers`)
        .get(isAuthenticatedAndAdmin, customerController.getAllCustomers)
        .post(customerController.createCustomer)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/customers/:customerId`)
        .get(customerController.getCustomer)
        .put(customerController.updateCustomer)
        .delete(isAuthenticatedAndAdmin, customerController.deleteCustomer)
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
        .put(isAuthenticatedAndAdmin, orderController.updateOrder)
        .delete(isAuthenticatedAndAdmin, orderController.deleteOrder)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/customers/:customerId/cart`)
        .get(cartController.getCartForCustomerWithId)
        .post(cartController.createCartForCustomerWithId)
        .put(cartController.updateCartForCustomerWithId)
        .delete(isAuthenticatedAndAdmin, cartController.deleteCartForCustomerWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/employees`)
        .get(isAuthenticatedAndAdmin, employeeController.getAllEmployees)
        .post(isAuthenticatedAndAdmin, employeeController.createEmployee)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/employees/:employeeId`)
        .get(isAuthenticatedAndAdmin, employeeController.getEmployee)
        .put(isAuthenticatedAndAdmin, employeeController.updateEmployee)
        .delete(isAuthenticatedAndAdmin, employeeController.deleteEmployee)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/positions`)
        .get(cacheMiddleware, isAuthenticatedAndAdmin, positionController.getAllPositions)
        .post(isAuthenticatedAndAdmin, positionController.createPosition)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/positions/:positionId`)
        .get(isAuthenticatedAndAdmin, positionController.getPosition)
        .put(isAuthenticatedAndAdmin, positionController.updatePosition)
        .delete(isAuthenticatedAndAdmin, positionController.deletePosition)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/producers`)
        .get(cacheMiddleware, producerController.getAllProducers)
        .post(isAuthenticatedAndAdmin, producerController.createProducer)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/producers/:producerId`)
        .get(producerController.getProducer)
        .put(isAuthenticatedAndAdmin, producerController.updateProducer)
        .delete(isAuthenticatedAndAdmin, producerController.deleteProducer)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/categories/:categoryId/products`)
        .get(productController.getAllProductsForCategoryWithId)
        .post(isAuthenticatedAndAdmin, productController.createProductForCategoryWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/products/:productId`)
        .get(productController.getProduct)
        .put(isAuthenticatedAndAdmin, productController.updateProduct)
        .delete(isAuthenticatedAndAdmin, productController.deleteProduct)
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
        .post(isAuthenticatedAndAdmin, imageController.createImageForProductWithId)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/images/:imageId`)
        .get(imageController.getImage)
        .put(isAuthenticatedAndAdmin, imageController.updateImage)
        .delete(isAuthenticatedAndAdmin, imageController.deleteImage)
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
        .get(cacheMiddleware, shippingController.getAllShippings)
        .post(isAuthenticatedAndAdmin, shippingController.createShipping)
        .all(respondWithMethodNotAllowed);

    app.route(`${apiPrefix}/shippings/:shippingId`)
        .get(shippingController.getShipping)
        .put(isAuthenticatedAndAdmin, shippingController.updateShipping)
        .delete(isAuthenticatedAndAdmin, shippingController.deleteShipping)
        .all(respondWithMethodNotAllowed);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    // no stacktraces leaked to user unless in development environment
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        logger.error(err.message);
        res.status(err.status || 500).send({
            status: 'error',
            message: err.message,
            error: (process.env.NODE_ENV === 'development') ? err.stack : {}
        });
    });
};
