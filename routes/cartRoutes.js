const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');


router.post('/add', authenticate, cartController.addToCart);

router.delete('/:cartItemId', authenticate, cartController.removeFromCart);


router.get('/', authenticate, cartController.getCartItems);

module.exports = router;
