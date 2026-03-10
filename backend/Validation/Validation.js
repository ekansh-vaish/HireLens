const Joi = require("joi");



const CollegeSchema = Joi.object(
    {
    name : Joi.string().min(3).required(),
    city : Joi.string().required(),
    state : Joi.string().required()    
    }
)

const CompanySchema = Joi.object(
    {
     CompanyName : Joi.string().min(3).required(),
     IndustryType : Joi.string().required(),
    }
)


module.exports ={CollegeSchema,CompanySchema};