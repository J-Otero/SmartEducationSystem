/* 06.04.2025 - 20.04.2025
Lecturer: Catriona Nic Lughadha
Student: Jefferson Ferreira
ID: 21223467
Logging
*/

const winston = require('winston');

// Configure Logger

const logger = winston.createLogger({
    level: 'info', // Log level (info, warn, error)
    format: winston.format.combine (
        winston.format.timestamp(), // Add timestamp
        winston.format.json() // JSON format
    ),
    transports: [
        new winston.transports.Console() // Log to console
    ]
});

module.exports = logger;
