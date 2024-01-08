const express = require("express");
const router = express.Router();
const customercontroller = require('../controllers/customercontroller');

/**
 * Customer Routes
 */

// Homepage
router.get('/', customercontroller.homepage);

// about
router.get('/about', customercontroller.about);

// Add Customer
router.get('/add', customercontroller.addcustomer);
router.post('/add', customercontroller.postcustomer);

// View Customer
router.get('/view/:id', customercontroller.view);


// edit Customer
router.get('/edit/:id', customercontroller.edit);
router.put('/edit/:id', customercontroller.editpost);

// delete Customer
router.delete('/edit/:id', customercontroller.deleteCustomer);

// search funton
router.post('/search', customercontroller.searchUser);

module.exports = router;
