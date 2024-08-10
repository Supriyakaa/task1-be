const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    console.log({token})
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
  
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.authorizeSeller = (req, res, next) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ error: 'Access denied. Sellers only.' });
  }
  next();
};


