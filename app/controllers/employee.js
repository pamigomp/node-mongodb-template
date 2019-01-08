'use strict';
const {employeeService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getAllEmployees(req, res, next) {
        return employeeService.getAllEmployees().then((employees) => {
            res.status(200).send(employees);
        }).catch(next);
    },

    createEmployee(req, res, next) {
        return employeeService.createEmployee(req.body).then((employee) => {
            const msg = `Employee with ID: ${employee._id} was successfully created`;
            logger.info(msg);
            res.status(201).send({message: msg});
        }).catch(next);
    },

    getEmployee(req, res, next) {
        return employeeService.getEmployeeById(req.params.employeeId).then((employee) => {
            if (!employee) {
                const msg = `Cannot find employee with ID ${req.params.employeeId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(employee);
            }
        }).catch(next);
    },

    updateEmployee(req, res, next) {
        return employeeService.updateEmployeeById(req.params.employeeId, req.body).then((employee) => {
            if (!employee) {
                const msg = `Cannot find employee with ID ${req.params.employeeId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Employee with ID: ${employee._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteEmployee(req, res, next) {
        return employeeService.deleteEmployeeById(req.params.employeeId).then((employee) => {
            if (!employee) {
                const msg = `Cannot find employee with ID ${req.params.employeeId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Employee with ID: ${employee._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
