const custmoer = require('../models/customer');
const mongoose = require('mongoose');


/**
 *  GET /
 * homepage 
 */ 
exports.homepage = async(req,res) =>{

        // Home
    

        const locals ={
            title:'nodeJs',
            description:'Free Nodejs User Managment system'
        }
        res.render('index',locals);
    
}

/**
 *  GET /
 * new custmoer form 
 */

exports.addcustomer = async(req,res) =>{

    // Home


    const locals ={
        title:'Add New Customer - nodejs',
        description:'Free Nodejs User Managment system'
    }
    res.render('customer/add',locals);

}


/**
 *  post /
 * create new custmoer  
 */

exports.postcustomer = async(req,res) =>{

    // Home

    console.log(req.body); 

    const newcustomer = new custmoer({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
    
        tel:req.body.tel,

        details:req.body.details,
        email:req.body.email

    });

    // const locals ={
    //     title:'Add New Customer added!',
    //     description:'Free Nodejs User Managment system'
    // }

    try {

        await custmoer.create(newcustomer)

        res.redirect('/');
   
        
    } catch (error) {
        console.log(error);
    }


 
}

