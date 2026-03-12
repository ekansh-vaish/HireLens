const {generateToken} = require("../Middlewares/JwtAuth");
const UserAuth = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
const ExpressError = require("../Utils/ExpressError");

module.exports.Register = async(req,res) =>
{
const {username,email,password,collegeId,branch,graduationYear,role} = req.body;

if(!username || !email || !password)
{
throw new ExpressError("Not Found",404); 
}


const checkUser = await UserAuth.findOne({email});


if(checkUser)
{
throw new ExpressError("User Already Existed",400); 

}

const hashedPassword = await bcrypt.hash(password,4);


const Register = new UserAuth(
    {
    username,
    email,
    password : hashedPassword,
    collegeId,
    branch,
    graduationYear,
    createdAt : Date.now(),
    role,
    }
)
 

await Register.save();

const payload = {
 id : Register.id,
 email : Register.email,
    
}
res.status(201).json({Message : "Successfully",payload})

}


module.exports.Login = async(req,res) =>
{
const {email,password} = req.body;

const LoginUser = await UserAuth.findOne({email});

if(!LoginUser)
{
throw new ExpressError("Account is not Registered",400); 

}


const CheckAuth = await bcrypt.compare(password,LoginUser.password);

if(!CheckAuth)
{
throw new ExpressError("UnAuthorised Access",404); 

}


const payload = 
{
id : LoginUser.id,
username : LoginUser.username,
email : LoginUser.email,
role : LoginUser.role,
collegeId : LoginUser.collegeId
}

const token = generateToken(payload);

res.cookie('token', token, {
maxAge: 24* 60 * 60 * 1000, 
httpOnly: true, 
secure: true, 
sameSite: 'none' 
})

res.status(201).json({Message : "Login Successfully",payload});
}

module.exports.Logout = async(req,res) =>
{
res.clearCookie("token",{
httpOnly : true,
  secure: true,
sameSite : "none"
})  
res.status(200).json({Message : "Logged Out Successfully"})}


module.exports.GetUser = async(req,res) =>
{
const UserInfo = await UserAuth.find({}).populate("collegeId");

if(!UserInfo)
{
throw new ExpressError("No user found",404);  
}

const payload = UserInfo.map(user => (
  {
  username : user.username,
  email : user.email,
  college : user.collegeId
  }
))
 

res.status(201).json({Message :"User Found",payload});

}
