const express = require("express");
const router = express.Router();
const customercontroller = require('../controllers/customercontroller');

/**
 * Customer Routes
 */

// Homepage
router.get('/', customercontroller.homepage);

// Add Customer
router.get('/add', customercontroller.addcustomer);
router.post('/add', customercontroller.postcustomer);

// View Customer
router.get('/view/:id', customercontroller.view);

module.exports = router;
