// authMiddleware.js
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  // Check for Authorization header first (for mobile)
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
  } else if (req.cookies.accessToken) {
    token = req.cookies.accessToken; // Fallback for web (cookies)
  }

  if (!token) {
    console.log('AuthMiddleware: No token found in Authorization header or cookies.');
    return res.status(401).json({ message: 'No access token provided' });
  }

  try {
    console.log('AuthMiddleware: Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log('AuthMiddleware: Token verified. User:', req.user.username);
    next();
  } catch (error) {
    console.error('AuthMiddleware: Token verification failed:', error.message);
    // Specifically log if it's a token expiry error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired' });
    }
    return res.status(401).json({ message: 'Invalid or malformed access token' });
  }
}; 