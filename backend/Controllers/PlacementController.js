const ExpressError = require("../Utils/ExpressError");
const mongoose = require("mongoose");
const PlacementReport = require("../Model/PlacementReport");

module.exports.AddPlacement = async(req,res) =>
{
const {CompanyName,AdvertisedPackage,ActualPackage,CompanyOffered,Rating,ReviewDescription,collegeId} = req.body;
const userId = req.user.id;

const AddRecord = new PlacementReport(
  {
  CompanyName,
  AdvertisedPackage,
  ActualPackage,
  Rating,
  ReviewDescription,
 CompanyOffered,
  UserId : userId,
  collegeId : collegeId
  }
)

if(!AddRecord)
{
throw new ExpressError("Record Not Added",404); 
}

await AddRecord.save();
res.status(201).json({Message : "Record Added ", AddRecord});

}



module.exports.GetRecords = async(req,res) =>
{
const FetchRecord = await PlacementReport.find({}).populate("collegeId");

if(!FetchRecord)
{
throw new ExpressError("No Record Found",404); 

}

res.status(201).json({Message :"Data Found",FetchRecord})

}

module.exports.PlacementInsights = async (req, res) => {
  
    const collegeId = req.params.id;

    const companyInsights = await PlacementReport.aggregate([
      {
        $match: {
          collegeId: new mongoose.Types.ObjectId(collegeId)
        }
      },
      {
        $group: {
          _id: "$CompanyName",
          roles: { $addToSet: "$CompanyOffered" },
          avgAdvertisedPackage: { $avg: { $toDouble: "$AdvertisedPackage" } },
          avgActualPackage: { $avg: { $toDouble: "$ActualPackage" } },
          totalOffers: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          companyName: "$_id",
          roles: 1,
          avgAdvertisedPackage: { $round: ["$avgAdvertisedPackage", 2] },
          avgActualPackage: { $round: ["$avgActualPackage", 2] },
          totalOffers: 1
        }
      }
    ]);

    const totalPlacements = await PlacementReport.countDocuments({ collegeId });

    res.status(200).json({
      totalPlacements,
      companies: companyInsights
    });

 
}