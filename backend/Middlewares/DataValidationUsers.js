const {userSchema,PlacementSchema} = require("../Validation/ValidationPrefrences");

function validateUserData(req,res,next)
{
 const {error} = userSchema.validate(req.body);
 console.log(req.body);
 
 if(error)
    {
    return res.status(400).json({ error: error.details[0].message });    
    }
    next();  
}

function validatePlacementData(req,res,next)
{
 const {error} = PlacementSchema.validate(req.body);
 if(error)
    {
    return res.status(400).json({ error: error.details[0].message });    
    }
    next();  
}

module.exports = {validateUserData,validatePlacementData}