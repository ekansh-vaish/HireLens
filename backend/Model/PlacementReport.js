const mongoose = require("mongoose");

const PlacementRecord = new mongoose.Schema(
{
UserId :
{
type: mongoose.Schema.Types.ObjectId,
ref: 'UserAuth',
}, 
collegeId :
{
type : mongoose.Schema.Types.ObjectId,
ref : "CollegePlacement"
}, 
CompanyName : 
{
type : String,    
},
CompanyOffered :
{
type : String,
},
AdvertisedPackage :
{
type : String,    
},    
ActualPackage : 
{
type : String,    
},
Rating :
{
type : String,    
},
ReviewDescription :
{
type : String,    
},
createdAt :
{
type : String,    
}
}
)
const PlacementReport = mongoose.model("PlacementReport",PlacementRecord);

module.exports = PlacementReport;