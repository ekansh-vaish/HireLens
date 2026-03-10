const ExpressError = require("../Utils/ExpressError");
const CollegePlacement = require("../Model/CollegeCollection");

module.exports.AddCollege = async(req,res) =>
{
const {name,city,state} = req.body;

const CollegeData = new CollegePlacement(
  {
  name,
  city,
  state,
  createdAt : Date.now()
  }
)

if(!CollegeData)
{
throw new ExpressError("No Service Available",502); 
  
}

await CollegeData.save();

res.status(201).json({Message:"College Data Saved Successfully",CollegeData});

}

module.exports.FetchCollege = async(req,res) =>
{
const CollegesData = await CollegePlacement.find({}).populate().sort();

if(!CollegesData || CollegesData.length === 0)
{
throw new ExpressError("Colleges Not Found",404); 

}

res.json({Message :"Fetched data",CollegesData})  
}

module.exports.FetchCollegeWithId = async(req,res) =>
{
const Record = await CollegePlacement.findById(req.params.id);

if(!Record || Record.length === 0) 
{
throw new ExpressError("Data Not Found",404); 

}

res.json({Message :"Data Found",Record});  

}

module.exports.UpdateCollege = async(req,res) =>
{
const UpdateDetail = await CollegePlacement.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});

if(!UpdateDetail)
{
throw new ExpressError("Update Failed ",404); 

}

res.json({Message :"Update Successfully",UpdateDetail});
}


module.exports.DropCollege = async(req,res) =>
{
const DropCollege = await CollegePlacement.findByIdAndDelete(req.params.id);

if(!DropCollege)
{
throw new ExpressError("Deletion Failed",404); 

}

res.json({Message :"Deleted Successfully",DropCollege});

}