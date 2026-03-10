const isAdmin = (req,res,next) =>
{
    if (!req.user) {
    return res.status(401).json({ Message: "Unauthorized: No user found" });
  }
if(req.user.role != "Admin")
    {
           return res.status(403).json({ message: "Access Denied, Admin only" });
 
    }    
    next();
}

module.exports = {isAdmin};