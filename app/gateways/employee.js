'use strict';
const employeeModel = require('../models/employee');

module.exports = {
    getAllEmployees() {
        return employeeModel.find().sort('lastName').select(['-password', '-createdAt', '-updatedAt', '-__v']).lean();
    },

    createEmployee(newEmployee) {
        return employeeModel.create(newEmployee);
    },

    getEmployeeById(id) {
        return employeeModel.findById(id).select(['-password', '-createdAt', '-updatedAt', '-__v']);
    },

    updateEmployeeById(id, updatedEmployee) {
        return employeeModel.findByIdAndUpdate(id, updatedEmployee, {new: true});
    },

    deleteEmployeeById(id) {
        return employeeModel.findByIdAndRemove(id);
    }
};
