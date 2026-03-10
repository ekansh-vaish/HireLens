import React from 'react'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApplicationNav from './Components/Navbox/ApplicationNav';
import AddCollege from "./Components/Admin/CollegeData/AddCollege";
import CollegeList from './Components/Admin/CollegeData/CollegeList';
import CollegeQuery from './Components/WebsitePages/CollegeDataQuery/CollegeQuery';
import AddRecord from './Components/WebsitePages/AddRecords/AddRecord';
import CollegeRecord from './Components/Admin/CollegeData/CollegeRecord';
import CollegeData from './Components/WebsitePages/CollegesDetail/CollegeData';
import AddCompany from './Components/Admin/CompanyData/AddCompany';
import CompanyDetails from './Components/Admin/CompanyData/CompanyDetails';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Homepage';
import ContactUs from './Components/RecommendPages/ContactUs/ContactUs';
import AboutUs from './Components/RecommendPages/About/About';
import HelpSupport from './Components/RecommendPages/Help&Support/HelpSupport';
import UsersData from './Components/Admin/UserInfo/UsersData';
import ContactData from './Components/Admin/ContactQueries/ContactData';

function App() {
return (
<BrowserRouter>

<div className='d-flex flex-column'>
<div>    
<ApplicationNav/>
</div>
<div >
<Routes>
<Route path="/home" element={<Home/>} />
<Route path="/collegequery" element={<CollegeQuery/>} />
<Route path="/login" element={<Login/>} />
<Route path="/contact" element={<ContactUs/>} />
<Route path="/contactdata" element={<ContactData/>} />
<Route path="/about" element={<AboutUs/>} />
<Route path="/faq" element={<HelpSupport/>} />
<Route path="/register" element={<Register/>} />
<Route path="/addcollege" element={<AddCollege/>} />
<Route path="/users" element={<UsersData/>} />
<Route path="/collegelist" element={<CollegeList/>} />
<Route path="/addrecord" element={<AddRecord/>} />
<Route path="/addcompany" element={<AddCompany/>} />
<Route path="/collegerecord" element={<CollegeRecord/>} />
<Route path="/fetchcollege/:id" element={<CollegeData/>} />
<Route path="/companydata" element={<CompanyDetails/>} />
<Route path="*" element={<div>404 Not Found</div>} />
</Routes>
</div>
<div >
<Footer />
</div>
</div>

</BrowserRouter>
)
}

export default App
