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
 * about 
 */

exports.about = async(req,res) =>{
        // Home
          const locals ={
            title:'About',
            description:'Nodejs User Managment system'
        }
        try {
             
            res.render('about',{ locals});
        } catch (error) {
            console.log(error);
           }

  
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

/**
 *  edit /
 * customer data
 */

exports.edit = async (req, res) => {
  try {
    const foundcustomer = await customer.findOne({ _id: req.params.id });

    const locals = {
      title: "edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", {
      locals,
      foundcustomer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *  
 *  update customer data
 */

exports.editpost = async (req, res) => {
  try {
    console.log('Customer ID:', req.params.id); // Log the customer ID for debugging

    const updatedCustomer = await customer.findByIdAndUpdate(
      req.params.id,  // Use req.params.id instead of req.params._id
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        details: req.body.details,
        email: req.body.email,
        updateAt:Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      console.log('Customer not found'); // Log if customer is not found
      return res.status(404).send('Customer not found');
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


/* 

Delete user code starat here


*/


exports.deleteCustomer = async (req, res) => {
  try {
    // Use deleteOne to delete a customer by their ID
    const deleteCustomer = await customer.deleteOne({ _id: req.params.id });
    
    // Redirect to the homepage after deletion
    res.redirect("/");
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.log(error);
  }
};

// this for the search of tte user in the system
exports.searchUser = async (req, res) => {
  const locals = {
    title: "Search Customer",
    description: "NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;

    // Remove special characters from the search term
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    // Use regex for case-insensitive search
    const searchcustomer = await customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });

    res.render("search", {
      searchcustomer,
      locals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
