'use strict';
const cluster = require('cluster');
const os = require('os');
const logger = require('./libs/logger');

const CPUS = os.cpus();

if (cluster.isMaster) {
    logger.info(`Master cluster setting up ${CPUS.length} workers...`);

    CPUS.forEach(() => {
        return cluster.fork();
    });
    cluster.on('online', (worker) => {
        logger.info(`Cluster ${worker.process.pid}is online`);
    });
    cluster.on('listening', (worker) => {
        logger.info(`Cluster ${worker.process.pid} connected`);
    });
    cluster.on('disconnect', (worker) => {
        logger.warn(`Cluster ${worker.process.pid} disconnected`);
    });
    cluster.on('exit', (worker) => {
        logger.warn(`Cluster ${worker.process.pid} is dead`);
        logger.info('Starting a new cluster...');
        return cluster.fork();
    });
} else {
    require('./server');
}
