const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
    username : 
    {
    type : String,    
    },
    email :
    {
    type : String    
    },
    password :
    {
    type : String,    
    },
    collegeId :
    {
   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollegePlacement'
    },
    branch :
    {
    type : String,    
    },
    graduationYear  :
    {
    type : String,    
    },
    createdAt :
    {
     type : Date,
   
    },
    role :
{
type : String,
enum : ["client","Admin"],
default : "client",
required : true    
},    
   
    }
)

const UserAuth = mongoose.model("UserAuth",UserSchema);

module.exports = UserAuth;