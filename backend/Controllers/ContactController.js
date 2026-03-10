const ContactData = require("../Model/ContactUs");
const ExpressError = require("../Utils/ExpressError");

module.exports.AddQuery = async(req,res) =>
{
 const {FullName,Email,Subject,Message} = req.body;
 
 const ContactQuery = new ContactData(
    {
    FullName,
    Email,
    Subject,
    Message    
    }
 )

 if(!ContactQuery)
 {
 throw new ExpressError(400,"Not Data saved");  
 }

 await ContactQuery.save();

 res.status(201).json({Message : "Data Saved Successfully",ContactQuery});
}

module.exports.GetContactQuery = async(req,res) =>
{
  const FetchData = await ContactData.find({});
  
  if(!FetchData || FetchData.length == 0)
  {
  throw new ExpressError(400).json({Message :"Data Not found",FetchData}); 
  }
 
  res.status(201).json({Message :"Data fetched successfully",FetchData});
}