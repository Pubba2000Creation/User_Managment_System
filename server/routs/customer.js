const express = require("express")
const router = express.Router();
const customercontroller = require('../controllers/customercontroller');

/**
 *  customer routes
 */

router.get('/',customercontroller.homepage);
router.get('/add',customercontroller.addcustomer);




module.exports =  router;