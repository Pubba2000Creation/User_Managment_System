const customer = require('../models/customer');

const mongoose = require('mongoose');


/**
 *  GET /
 * homepage 
 */ 

// //////////////////////// set num 1 : add boostrap pagination to the web page //////////////////////////////////
exports.homepage = async(req,res) =>{

    const messages = await req.flash('info');
        // Home
          const locals ={
            title:'nodeJs',
            description:'MERN stack User Managment system'
        }

        let perPage =10;
        let page = req.query.page || 1;


        try {
            
            const customers = await customer.aggregate([{ $sort: { updateAt: -1 } }])
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();

                const count = await customer.countDocuments();

            
             res.render('index', {
                    locals,
                    customers,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    messages,
                });

        } catch (error) {
            console.log(error);
           }

  
}














// //////////////////////// set num 2 : without boostrap pagination to the web page //////////////////////////////////



// exports.homepage = async(req,res) =>{

//     const messages = await req.flash('info');
//         // Home
//           const locals ={
//             title:'nodeJs',
//             description:'Free Nodejs User Managment system'
//         }
//         try {
//             const customers = await custmoer.find({}).limit(22);
//             res.render('index',{ locals, messages, customers});
//         } catch (error) {
//             console.log(error);
//            }

  
// }

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

    const newcustomer = new customer({
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

        await customer.create(newcustomer);
        await req.flash('info','New Customer has been added.');

        res.redirect('/');
   
        
    } catch (error) {
        console.log(error);
    }


 
}


/**
 *  GET /
 * customer data
 */

exports.view = async (req, res) => {
  try {
    const foundcustomer = await customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      foundcustomer,
    });
  } catch (error) {
    console.log(error);
  }
};