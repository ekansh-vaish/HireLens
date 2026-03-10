const mongoose = require("mongoose");
const CollegeSchema = new mongoose.Schema(
    {
    name : 
    {
    type : String,    
    },
    city :
    {
    type : String,    
    },
    state : 
    {
    type : String,    
    },
    createdAt :
    {
    type : Date  
    }    
    }
)

const CollegePlacement = mongoose.model("CollegePlacement",CollegeSchema);

module.exports = CollegePlacement;