const ExpressError = require("../Utils/ExpressError");
const CompanyData = require("../Model/CompanyData");


module.exports.AddCompany = async(req,res) =>
{
const {CompanyName,IndustryType} = req.body;

const CompanyQuery = new CompanyData(
  {
  CompanyName,
  IndustryType,
  createdAt : Date.now() 
  }
)

if(!CompanyQuery)
{
throw new ExpressError("Not Submit Error found",404); 

}

await CompanyQuery.save();

res.json({Message :"Data Saved Successfully",CompanyQuery});

}

module.exports.GetData = async(req,res) =>
{
const FetchData = await CompanyData.find({});

if(!FetchData || FetchData.length < 0)
{
throw new ExpressError("No Data Found",404); 

}

res.json({Message :"Data Found Successfully",FetchData});
};


module.exports.UpdateData = async(req,res) =>
{
const EditData = await CompanyData.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});

if(!EditData)
{
throw new ExpressError("Updation Failed Error",500); 

}

res.json({Message :"Updated Successfully",EditData});
}

module.exports.DropData = async(req,res) =>
{
const DestroyData = await CompanyData.findByIdAndDelete(req.params.id);

if(!DestroyData)
{
throw new ExpressError("Deletion Failed",500); 
}

res.json({Message :"Deleted Succesfully",DestroyData});
}