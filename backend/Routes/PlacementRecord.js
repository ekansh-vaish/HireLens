const {authenticateToken} = require("../Middlewares/JwtAuth");
const router = require("express").Router();
const {validatePlacementData} = require("../Middlewares/DataValidationUsers");
const WrapAsync = require("../Utils/WrapAsync");
const preventDuplicate = require("../Middlewares/preventduplicacy");
const PlacementController = require("../Controllers/PlacementController");
router.post("/addrecords",authenticateToken,validatePlacementData,preventDuplicate,WrapAsync(PlacementController.AddPlacement));

router.get("/getrecords",WrapAsync(PlacementController.GetRecords));

router.get("/collegeinsights/:id",authenticateToken,WrapAsync(PlacementController.PlacementInsights ));


module.exports = router;