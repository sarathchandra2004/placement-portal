import jwt from 'jsonwebtoken';

const JWT_SECRET = "sarathPlacementSecret123!";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Handle both old and new tokens
    req.userId = decoded.userId || decoded.id;
    if (!req.userId) {
      return res.status(401).json({ msg: 'Invalid token payload' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
