const {CollegeSchema,CompanySchema} = require("../Validation/Validation");



function validateCollegeData(req,res,next)
{
 const {error} = CollegeSchema.validate(req.body);
 if(error)
    {
    return res.status(400).json({ error: error.details[0].message });    
    }
    next();  
}

function validateCompanyData(req,res,next)
{
 const {error} = CompanySchema.validate(req.body);
 if(error)
    {
    return res.status(400).json({ error: error.details[0].message });    
    }
    next();  
}



module.exports = {validateCollegeData,validateCompanyData};

