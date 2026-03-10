const router = require("express").Router();
const {authenticateToken} = require("../Middlewares/JwtAuth");
const {isAdmin} = require("../Middlewares/IsAdmin");
const {validateCollegeData} = require("../Middlewares/DataValidation");
const CollegeController = require("../Controllers/CollegesController")
const WrapAsync = require("../Utils/WrapAsync");

router.post("/addCollege",authenticateToken,isAdmin,validateCollegeData,WrapAsync(CollegeController.AddCollege));


router.get("/getcolleges",WrapAsync(CollegeController.FetchCollege));


router.get("/fetchcollege/:id",authenticateToken,WrapAsync(CollegeController.FetchCollegeWithId));


router.put("/updateCollege/:id",authenticateToken,isAdmin,WrapAsync(CollegeController.UpdateCollege));

router.delete("/deleteCollege/:id",authenticateToken,isAdmin,WrapAsync(CollegeController.DropCollege));


module.exports = router;