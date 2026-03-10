const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
    CompanyName :
    {
    type : String,    
    },
    IndustryType :
    {
    type : String,    
    },    
    createdAt :
    {
    type : Date
    }
    }
)

const CompanyData = mongoose.model("CompanyData",CompanySchema);

module.exports = CompanyData;