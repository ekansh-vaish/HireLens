import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa'; // Install: npm install react-icons

function CollegePlacementList() {
const [colleges, setColleges] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();

async function fetchColleges() {
setLoading(true);
try {
const res = await axios.get("https://hirelens-9o7y.onrender.com/collegedetail/getcolleges", {
withCredentials: true
});
setColleges(res.data.CollegesData || []);
} catch (err) {
console.error("Error fetching colleges:", err);
if(err)
{
navigate("/login")    
}
} finally {
setLoading(false);
}
}

useEffect(() => {
fetchColleges();
}, []);

// Filter colleges based on search
const filteredColleges = colleges.filter(college =>
college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
college.city.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
<div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "2rem" }}>
<Container className="py-5">

{/* HEADER SECTION */}
<div className="text-center mb-5">
<h1 className="fw-bold text-dark">Explore <span className='text-primary'>Colleges</span></h1>
<p className="text-muted fs-5">Check the real placement records and company insights.</p>
</div>

{/* SEARCH BAR */}
<Row className="justify-content-center mb-5">
<Col md={6}>
<InputGroup className="shadow-sm">
<InputGroup.Text className="bg-white border-end-0">
<FaSearch className="text-muted" />
</InputGroup.Text>
<Form.Control
type="text"
placeholder="Search by college name or city..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className="border-start-0 ps-0"
style={{height: '50px'}}
/>
</InputGroup>
</Col>
</Row>

{/* COLLEGE GRID */}
{loading ? (
<div className="text-center p-5">
<div className="spinner-border text-primary" role="status"></div>
<p className='mt-2'>Loading Colleges...</p>
</div>
) : (
<Row xs={1} md={2} lg={3} className="g-4">
{filteredColleges.map((college) => (
<Col key={college._id}>
<Card 
className="h-100 shadow-sm border-0 rounded-4 transition-hover"
style={{ transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
onMouseOver={(e) => {
e.currentTarget.style.transform = 'translateY(-5px)';
e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
}}
onMouseOut={(e) => {
e.currentTarget.style.transform = 'translateY(0)';
e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
}}
>
<Card.Body className="d-flex flex-column p-4">
<div className="d-flex align-items-center mb-3">
{/* Placeholder Logo */}
<div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', marginRight: '15px', border: '1px solid #eee'}}>
<FaBuilding size={24} className="text-primary"/>
</div>
<Card.Title className="fw-bold mb-0 text-dark" style={{fontSize: '1.1rem'}}>
{college.name}
</Card.Title>
</div>

<div className="mt-auto">
<p className="text-muted mb-2 d-flex align-items-center">
<FaMapMarkerAlt className="me-2 text-danger" />
{college.city}, {college.state}
</p>

<Button 
variant="outline-primary"
className="w-100 rounded-pill mt-3 fw-semibold"
onClick={() => navigate(`/fetchcollege/${college._id}`)}
>
View Real Placements
</Button>
</div>
</Card.Body>
</Card>
</Col>
))}
</Row>
)}

{/* NO RESULTS MESSAGE */}
{!loading && filteredColleges.length === 0 && (
<div className='text-center text-muted p-5'>
<FaBuilding size={50} className='mb-3'/>
<h5>No colleges found matching your search.</h5>
</div>
)}

</Container>
</div>
);
}

export default CollegePlacementList;