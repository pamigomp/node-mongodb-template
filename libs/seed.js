'use strict';
const logger = require('./logger');

const cartsData = require('../app/models/seeds/carts');
const categoriesData = require('../app/models/seeds/categories');
const customersData = require('../app/models/seeds/customers');
const employeesData = require('../app/models/seeds/employees');
const feedbacksData = require('../app/models/seeds/feedbacks');
const imagesData = require('../app/models/seeds/images');
const ordersData = require('../app/models/seeds/orders');
const positionsData = require('../app/models/seeds/positions');
const producersData = require('../app/models/seeds/producers');
const productsData = require('../app/models/seeds/products');
const ratesData = require('../app/models/seeds/rates');
const shippingsData = require('../app/models/seeds/shippings');
const usersData = require('../app/models/seeds/users');

const CartModel = require('../app/models/cart');
const CategoryModel = require('../app/models/category');
const CustomerModel = require('../app/models/customer');
const EmployeeModel = require('../app/models/employee');
const FeedbackModel = require('../app/models/feedback');
const ImageModel = require('../app/models/image');
const OrderModel = require('../app/models/order');
const PositionModel = require('../app/models/position');
const ProducerModel = require('../app/models/producer');
const ProductModel = require('../app/models/product');
const RateModel = require('../app/models/rate');
const ShippingModel = require('../app/models/shipping');
const UserModel = require('../app/models/user');

const initializeCartsCollection = () => {
    return CartModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(cartsData.map((cart) => {
                return CartModel(cart).save().then((savedObj) => {
                    logger.info(`Successfully created cart with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeCategoriesCollection = () => {
    return CategoryModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(categoriesData.map((category) => {
                return CategoryModel(category).save().then((savedObj) => {
                    logger.info(`Successfully created category with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeCustomersCollection = () => {
    return CustomerModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(customersData.map((customer) => {
                return CustomerModel(customer).save().then((savedObj) => {
                    logger.info(`Successfully created customer with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeEmployeesCollection = () => {
    return EmployeeModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(employeesData.map((employee) => {
                return EmployeeModel(employee).save().then((savedObj) => {
                    logger.info(`Successfully created employee with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeFeedbacksCollection = () => {
    return FeedbackModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(feedbacksData.map((feedback) => {
                return FeedbackModel(feedback).save().then((savedObj) => {
                    logger.info(`Successfully created feedback with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeImagesCollection = () => {
    return ImageModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(imagesData.map((image) => {
                return ImageModel(image).save().then((savedObj) => {
                    logger.info(`Successfully created image with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeOrdersCollection = () => {
    return OrderModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(ordersData.map((order) => {
                return OrderModel(order).save().then((savedObj) => {
                    logger.info(`Successfully created order with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializePositionsCollection = () => {
    return PositionModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(positionsData.map((position) => {
                return PositionModel(position).save().then((savedObj) => {
                    logger.info(`Successfully created position with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeProducersCollection = () => {
    return ProducerModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(producersData.map((producer) => {
                return ProducerModel(producer).save().then((savedObj) => {
                    logger.info(`Successfully created producer with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeProductsCollection = () => {
    return ProductModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(productsData.map((product) => {
                return ProductModel(product).save().then((savedObj) => {
                    logger.info(`Successfully created product with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeRatesCollection = () => {
    return RateModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(ratesData.map((rate) => {
                return RateModel(rate).save().then((savedObj) => {
                    logger.info(`Successfully created rate with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeShippingsCollection = () => {
    return ShippingModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(shippingsData.map((shipping) => {
                return ShippingModel(shipping).save().then((savedObj) => {
                    logger.info(`Successfully created shipping with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

const initializeUsersCollection = () => {
    return UserModel.findOne().then((data) => {
        if (!data) {
            return Promise.all(usersData.map((user) => {
                return UserModel(user).save().then((savedObj) => {
                    logger.info(`Successfully created user with _id ${savedObj._id}`);
                });
            }));
        }
    }).catch((err) => {
        logger.error(err);
    });
};

module.exports = () => {
    return initializeCartsCollection()
        .then(initializeCategoriesCollection())
        .then(initializeCustomersCollection())
        .then(initializeEmployeesCollection())
        .then(initializeFeedbacksCollection())
        .then(initializeImagesCollection())
        .then(initializeOrdersCollection())
        .then(initializePositionsCollection())
        .then(initializeProductsCollection())
        .then(initializeProducersCollection())
        .then(initializeRatesCollection())
        .then(initializeShippingsCollection())
        .then(initializeUsersCollection());
};
