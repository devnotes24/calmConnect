const express = require('express');

const router = express.Router();
const productDataCt = require('../Controller/productDataCt');

router.get('/getAllProducts', productDataCt.getAllProducts);
router.get('/getAllProducts/:id', productDataCt.get_product_by_id);
router.post('/createProduct', productDataCt.createProduct);
router.put('/updateProduct/:id', productDataCt.updateProduct);
router.delete('/deleteProduct/:id', productDataCt.deleteProduct);

module.exports = router;

