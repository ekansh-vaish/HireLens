const express = require("express");
const app = express();
const mongoose = require("mongoose");
const AuthRoute = require("./Routes/AuthRoutes");
const CollegeDetailRoute = require("./Routes/CollegesDetail");
const PlacementRecordRoute = require("./Routes/PlacementRecord");
const CompanyRecordRoute = require("./Routes/CompanyData");
const ContactUsRoute = require("./Routes/ContactUs");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
require("dotenv").config()
>>>>>>> a4702be81fb8ec31d127b0e27cd3e61d6d7ddf13
const MongoDbAtlas = process.env.MONGODB_ATLAS;

const session = require("express-session");

const MongoStore = require("connect-mongo").default;
require("dotenv").config()

async function main() {
await mongoose.connect(MongoDbAtlas)    
}


main().then(() =>
{
console.log("successfully connected");

}).catch((err) =>
{
console.log(err);
})

app.use(cors({
  origin: ["https://hire-lens-iwm3.vercel.app/home","hire-lens-iwm3-mhxqbrs7a-ekansh-vaishs-projects.vercel.app"],
  credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE'], 

}));


const store  =  MongoStore.create({
mongoUrl : MongoDbAtlas,
crypto :
{
secret : process.env.secret,
},
touchAfter : 24 * 3600,     

})

store.on("error",() =>
{
console.log("Error in Mongo Session");

})
const sessionOptions =
{
store  : store,
secret : process.env.secret,
resave : false,
saveUninitialized : true,
cookie :
{
expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
maxAge : 7 * 24 * 60 * 60 *1000,
httpOnly : true    
}      
}




app.use(session(sessionOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/Auth",AuthRoute);
app.use("/collegedetail",CollegeDetailRoute);
app.use("/placementrecord",PlacementRecordRoute);
app.use("/companyquery",CompanyRecordRoute);
app.use("/contactquery",ContactUsRoute);


app.listen(8080,() =>
{
console.log("Port is listening to 8080");
})


