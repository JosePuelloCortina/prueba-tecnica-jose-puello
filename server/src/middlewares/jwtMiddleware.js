const authService = require('../utils/authService');

async function jwtAuth(req, res, next) {
  try {
    const token = await authService.getTokenJWT();
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: JWT authentication error' });
  }
}

module.exports = jwtAuth;
