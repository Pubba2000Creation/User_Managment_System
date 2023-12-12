
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