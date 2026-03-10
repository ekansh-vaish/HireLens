const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  branch: Joi.string().required(),
  graduationYear: Joi.string().pattern(/^[0-9]{4}$/).required(),
  collegeId: Joi.string().required() 
});


const PlacementSchema = Joi.object({
  CompanyName: Joi.string().min(3).max(50).required(),
  CompanyOffered: Joi.string().min(2).max(50).required(),
  AdvertisedPackage: Joi.number().required(),
  ActualPackage: Joi.number().required(),
  Rating: Joi.number().min(1).max(5).required(),
  ReviewDescription: Joi.string().min(5).required(),
  collegeId: Joi.string().required()
});

module.exports = { userSchema, PlacementSchema };
