const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
    FullName : 
    {
    type : String,    
    },
    Email :
    {
    type : String,    
    },
    Subject : 
    {
    type : String,    
    },
    Message  :
    {
    type : String    
    }
    }
)

const ContactData = mongoose.model("ContactData",ContactSchema);

module.exports = ContactData;