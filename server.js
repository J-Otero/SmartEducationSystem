/* 06.04.2025 - 20.04.2025
Lecturer: Catriona Nic Lughadha
Student: Jefferson Ferreira
ID: 21223467
Registry Service
*/

// Import required modules
const grpc = require('grpc-web/grpc-js');
const protoLoader = require('grpc-web/protoLoader');
const path = require('path');
const { logger } = require('../shared/logger'); // Shared looger

// Load proto files
const PROTO_PATH = path.join(__dirname, '../proto/registry.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const { education } = grpc.loadPackageDefinition(packageDefinition);

const registry = new Map(); // Service registry

const registryImpl = {
    // Register a service
    RegisterService: (call, callback) => {
        const { serviceName, serviceUrl } = call.request;
        registry.set(serviceName, serviceUrl);
        logger.info(`Registered: ${serviceName} at ${serviceUrl}`);
        callback(null, { success: true });
    },

    // Discover a service
    DiscoverService: (call, callback) => {
        const serviceUrl = registry.get(call.request.serviceName) || '';
        callback(null, { serviceUrl });
    }
};

// Start registry service (port 50054)
const server = new grpc.Server();
server.addService(education.ServiceRegistry.service, registryImpl);
server.bindAsync('0.0.0.0:50054', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    logger.info('Registry Service running on port 50054');
});

