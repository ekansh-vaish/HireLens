
const router = require("express").Router();
const {validateUserData} = require("../Middlewares/DataValidationUsers");

const WrapAsync = require("../Utils/WrapAsync");
const AuthController = require("../Controllers/AuthControllers");
router.post("/register",validateUserData,WrapAsync(AuthController.Register))



router.post("/login",WrapAsync(AuthController.Login))


router.post("/logout",WrapAsync(AuthController.Logout))

router.get("/users",WrapAsync(AuthController.GetUser));

module.exports = router;