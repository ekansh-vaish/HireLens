const jwt = require("jsonwebtoken");
require("dotenv").config()
function authenticateToken(req, res, next) {
  
    const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' }); 
    }
    req.user = user; 
    next();
  });
 

}

const generateToken = (userData) =>
{
return jwt.sign(userData,process.env.JWT_SECRET)    
}


module.exports = {authenticateToken,generateToken};