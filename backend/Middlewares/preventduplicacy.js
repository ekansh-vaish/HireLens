const PlacementReport = require("../Model/PlacementReport");
const ExpressError = require("../Utils/ExpressError");

async function preventDuplicate(req, res, next) {
    try {
        // 1. User ID nikaalo (Route ke saath match hona chahiye)
        // Agar aapke authenticateToken middleware ne user object attach kiya hai
        const userId = req.user.id || req.user._id; 

        if (!userId) {
            return next(new ExpressError(401, "User identification failed. Please login again."));
        }

        // 2. Database mein exact UserId field search karo
        const existingReport = await PlacementReport.findOne({ UserId: userId });

        // 3. Agar report milti hai, toh error throw karo
        if (existingReport) {
            // Hum return next(...) use karte hain taaki aage ka code execute na ho
            return next(new ExpressError(403, "Action Denied: You have already submitted a placement record. One user can only submit once."));
        }

        // 4. Sab sahi hai, toh aage badhne do
        next();
    } catch (error) {
        // DB error ya koi aur crash handle karne ke liye
        next(new ExpressError(500, "Middleware Error: " + error.message));
    }
}

module.exports = preventDuplicate;