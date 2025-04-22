/* 06.04.2025 - 20.04.2025
Lecturer: Catriona Nic Lughadha
Student: Jefferson Ferreira
ID: 21223467
Authentication
*/

const jwt = require ('jsonwebtoken');
const SECRET_KEY = ' your_very_secret_key_123'; // Replace with a real key

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expires: '1h' });
};

// Verify JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null; // Invalid token
    }
};

module.exports = { generateToken, verifyToken };
