const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorizeSeller } = require('../middleware/authMiddleware');

router.post('/', authenticate, authorizeSeller, productController.addProduct);
router.put('/:id', authenticate, authorizeSeller, productController.updateProduct);
router.delete('/:id', authenticate, authorizeSeller, productController.deleteProduct);
router.get('/', productController.getProducts);

module.exports = router;
