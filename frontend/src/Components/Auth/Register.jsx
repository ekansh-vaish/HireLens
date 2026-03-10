import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaGraduationCap, FaCodeBranch, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
const navigate = useNavigate();
const [registerData, setRegisterData] = useState({
username: "",
email: "",
password: "",
branch: "",
graduationYear: "",
collegeId: ""
});

const [colleges, setColleges] = useState([]);
const [loading, setLoading] = useState(false);
const [fetchingColleges, setFetchingColleges] = useState(true);

useEffect(() => {
async function fetchColleges() {
try {
const res = await axios.get("http://localhost:8080/collegedetail/getcolleges", {
withCredentials: true
});
setColleges(res.data.CollegesData || []);
} catch (err) {
console.error("Error fetching colleges:", err);
} finally {
setFetchingColleges(false);
}
}
fetchColleges();
}, []);

function ChangeInp(e) {
const { name, value } = e.target;

if (name === "collegeSearch") {
const selectedCollege = colleges.find(c => c.name === value);
setRegisterData(prev => ({
...prev,
collegeId: selectedCollege ? selectedCollege._id : ""
}));
} else {
setRegisterData(prev => ({ ...prev, [name]: value }));
}
}

async function RegisterUser(e) {
e.preventDefault();
if (!registerData.collegeId) {
alert("Please select a valid college from the search list.");
return;
}

setLoading(true);
try {
await axios.post(
"http://localhost:8080/Auth/register",
registerData,
{ withCredentials: true }
);
alert("Account created successfully!");
navigate("/login");
} catch (err) {
console.error("Registration failed:", err);
alert("Error registering user. Please check your details.");
} finally {
setLoading(false);
}
}

return (
<div className="register-wrapper d-flex align-items-center py-5" style={{ minHeight: '100vh', background: '#f1f5f9' }}>
<Container>
<Row className="justify-content-center">
<Col lg={8} xl={7}>
<Card className="border-0 shadow-lg rounded-4 overflow-hidden">
<Row className="g-0">
<Col md={4} className="bg-primary text-white d-none d-md-flex align-items-center justify-content-center p-4 text-center">
<div>
<FaUserPlus size={60} className="mb-3 opacity-75" />
<h3 className="fw-bold">Join HireLens</h3>
<p className="small opacity-75">Build transparency in campus placements.</p>
</div>
</Col>

<Col md={8} className="bg-white p-4 p-lg-5">
<h2 className="fw-bold text-dark mb-1">Create Account</h2>
<p className="text-muted small mb-4">Search for your college and enter details.</p>

<Form onSubmit={RegisterUser}>
<Row>
{/* Username */}
<Col md={12} className="mb-3">
<Form.Label className="small fw-bold text-secondary">Username</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0 text-muted"><FaUser /></InputGroup.Text>
<Form.Control className="border-start-0 ps-0 shadow-none" name="username" placeholder="johndoe123" value={registerData.username} onChange={ChangeInp} required />
</InputGroup>
</Col>

{/* Email */}
<Col md={12} className="mb-3">
<Form.Label className="small fw-bold text-secondary">Email</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0 text-muted"><FaEnvelope /></InputGroup.Text>
<Form.Control className="border-start-0 ps-0 shadow-none" type="email" name="email" placeholder="john@example.com" value={registerData.email} onChange={ChangeInp} required />
</InputGroup>
</Col>

{/* Password */}
<Col md={12} className="mb-3">
<Form.Label className="small fw-bold text-secondary">Password</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0 text-muted"><FaLock /></InputGroup.Text>
<Form.Control className="border-start-0 ps-0 shadow-none" type="password" name="password" placeholder="••••••••" value={registerData.password} onChange={ChangeInp} minLength={8} required />
</InputGroup>
</Col>

{/* Searchable College Input */}
<Col md={12} className="mb-3">
<Form.Label className="small fw-bold text-secondary">Search College</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0 text-muted"><FaUniversity /></InputGroup.Text>
<Form.Control 
className="border-start-0 ps-0 shadow-none"
list="collegeList" 
name="collegeSearch" 
placeholder={fetchingColleges ? "Loading..." : "Type to search your college..."} 
onChange={ChangeInp}
required 
/>
<datalist id="collegeList">
{colleges.map(college => (
<option key={college._id} value={college.name} />
))}
</datalist>
</InputGroup>
<Form.Text className="text-muted" style={{fontSize: '10px'}}>
*Select from the suggested list
</Form.Text>
</Col>

{/* Branch */}
<Col md={6} className="mb-3">
<Form.Label className="small fw-bold text-secondary">Branch</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0 text-muted"><FaCodeBranch /></InputGroup.Text>
<Form.Control className="border-start-0 ps-0 shadow-none" name="branch" placeholder="CSE, ECE..." value={registerData.branch} onChange={ChangeInp} required />
</InputGroup>
</Col>

{/* Graduation Year */}
<Col md={6} className="mb-3">
<Form.Label className="small fw-bold text-secondary">Grad Year</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0 text-muted"><FaGraduationCap /></InputGroup.Text>
<Form.Control className="border-start-0 ps-0 shadow-none" type="number" name="graduationYear" placeholder="2025" value={registerData.graduationYear} onChange={ChangeInp} required />
</InputGroup>
</Col>
</Row>

<div className="d-grid gap-2 mt-4">
<Button variant="primary" type="submit" className="py-2 fw-bold rounded-pill" disabled={loading}>
{loading ? <Spinner animation="border" size="sm" /> : "Complete Registration"}
</Button>
</div>
</Form>
</Col>
</Row>
</Card>
</Col>
</Row>
</Container>
</div>
);
}

export default Register;