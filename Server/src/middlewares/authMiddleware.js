import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: 'No access token' });
  }

  try {
    // This checks if the token is real and not fake!
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Puts user info in the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired access token' });
  }
};