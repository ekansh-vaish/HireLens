
const WrapAsync = require("../Utils/WrapAsync");
const router = require("express").Router();
const {authenticateToken} = require("../Middlewares/JwtAuth");
const ContactController = require("../Controllers/ContactController");

router.post("/addreport",authenticateToken,WrapAsync(ContactController.AddQuery));

router.get("/getdata",authenticateToken,WrapAsync(ContactController.GetContactQuery));

module.exports = router;