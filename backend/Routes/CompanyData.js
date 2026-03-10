const router = require("express").Router();
const {authenticateToken} = require("../Middlewares/JwtAuth");
const {isAdmin} = require("../Middlewares/IsAdmin");
const {validateCompanyData} = require("../Middlewares/DataValidation");
const WrapAsync = require("../Utils/WrapAsync");
const CompanyController = require("../Controllers/CompanyController");
router.post("/addcompany",authenticateToken,isAdmin,validateCompanyData,WrapAsync(CompanyController.AddCompany));

router.get("/fetchdata",authenticateToken,WrapAsync(CompanyController.GetData));

router.put("/editcompany/:id",authenticateToken,isAdmin,WrapAsync(CompanyController.UpdateData));


router.delete("/deletecompanydata/:id",authenticateToken,isAdmin,WrapAsync(CompanyController.DropData));

module.exports = router;