import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col, Container, InputGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaBuilding, FaMoneyBillWave, FaStar, FaPenNib, FaBriefcase, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AddRecord() {
const userRecord = JSON.parse(localStorage.getItem("UserDetail"));
const navigate  = useNavigate();
const [recordData, setRecordData] = useState({
CompanyName: "",
AdvertisedPackage: "",
CompanyOffered: "",
ActualPackage: "",
Rating: "",
ReviewDescription: "",
collegeId: userRecord?.payload?.collegeId || "",
});

const [fetchedData, setFetchedData] = useState([]);
const [loading, setLoading] = useState(false);

function handleChange(e) {
const { name, value } = e.target;
setRecordData(prev => ({
...prev,
[name]: value
}));
}

async function handleSubmit(e) {
e.preventDefault();
setLoading(true);
try {
 await axios.post(
"https://hirelens-9o7y.onrender.com/placementrecord/addrecords",
recordData,
{ withCredentials: true }
);
alert("🔥 Record added to the Reality Database!");
setRecordData({
CompanyName: "",
AdvertisedPackage: "",
ActualPackage: "",
Rating: "",
ReviewDescription: "",
collegeId: userRecord?.payload?.collegeId || "",
CompanyOffered: ""
});
window.location.reload();

} catch (err) {
console.error("Error adding record:", err);
alert("Failed to add record. Please check your connection.");
navigate("/addrecord")
} finally {
setLoading(false);
}
}

async function FetchData() {
try {
const getData = await axios.get(`https://hirelens-9o7y.onrender.com/companyquery/fetchdata`, {
withCredentials: true,
});
setFetchedData(getData.data.FetchData || []);
} catch (error) {
console.log(error);
alert("User not logged in!");
navigate("/login");
}
}

useEffect(() => {
FetchData();
}, []);

return (
<div style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }} className="py-5">
<Container>
<Row className="justify-content-center">
<Col lg={8}>
<Card className="shadow-lg border-0 rounded-4 overflow-hidden">
<div className="bg-primary p-4 text-white text-center">
<h2 className="fw-bold mb-0">Contribute to Reality Check</h2>
<small className="opacity-75">Your data helps others see the true placement picture.</small>
</div>

<Card.Body className="p-4 p-md-5 bg-white">
<Alert variant="info" className="border-0 rounded-3 d-flex align-items-center">
<FaInfoCircle className="me-2" /> 
Stay honest! This data will be used to generate the "Reality Gap" analytics.
</Alert>

<Form onSubmit={handleSubmit}>
<Row className="g-4">
{/* Company Selection */}
<Col md={12}>
<Form.Group>
<Form.Label className="fw-semibold"><FaBuilding className="me-2 text-primary" />Company Name</Form.Label>
<Form.Select
name="CompanyName"
className="form-control-lg fs-6"
value={recordData.CompanyName}
onChange={handleChange}
required
>
<option value="">Select a registered company</option>
{fetchedData.map((company, index) => (
<option key={index} value={company.CompanyName}>
{company.CompanyName}
</option>
))}
</Form.Select>
</Form.Group>
</Col>

{/* Packages Section */}
<Col md={6}>
<Form.Group>
<Form.Label className="fw-semibold"><FaMoneyBillWave className="me-2 text-success" />Advertised (LPA)</Form.Label>
<InputGroup>
<Form.Control
type="number"
step="0.1"
name="AdvertisedPackage"
value={recordData.AdvertisedPackage}
onChange={handleChange}
placeholder="e.g. 12.5"
required
/>
<InputGroup.Text>LPA</InputGroup.Text>
</InputGroup>
</Form.Group>
</Col>

<Col md={6}>
<Form.Group>
<Form.Label className="fw-semibold"><FaMoneyBillWave className="me-2 text-danger" />Actual (LPA)</Form.Label>
<InputGroup>
<Form.Control
type="number"
step="0.1"
name="ActualPackage"
value={recordData.ActualPackage}
onChange={handleChange}
placeholder="e.g. 4.2"
required
/>
<InputGroup.Text>LPA</InputGroup.Text>
</InputGroup>
</Form.Group>
</Col>

{/* Role and Rating */}
<Col md={6}>
<Form.Group>
<Form.Label className="fw-semibold"><FaBriefcase className="me-2 text-warning" />Role Type</Form.Label>
<Form.Select
name="CompanyOffered"
value={recordData.CompanyOffered}
onChange={handleChange}
required
>
<option value="">Select Domain</option>
<option>Tech</option>
<option>Sales</option>
<option>Marketing</option>
<option>Management</option>
<option>TeleCommunication</option>
<option>Voice Processing</option>
</Form.Select>
</Form.Group>
</Col>

<Col md={6}>
<Form.Group>
<Form.Label className="fw-semibold"><FaStar className="me-2 text-warning" />Rating (1-5)</Form.Label>
<Form.Control
type="number"
min="1"
max="5"
name="Rating"
value={recordData.Rating}
onChange={handleChange}
placeholder="How was the experience?"
/>
</Form.Group>
</Col>

{/* Description */}
<Col md={12}>
<Form.Group>
<Form.Label className="fw-semibold"><FaPenNib className="me-2 text-secondary" />Review / Reality Description</Form.Label>
<Form.Control
as="textarea"
rows={4}
name="ReviewDescription"
value={recordData.ReviewDescription}
onChange={handleChange}
placeholder="Explain the hidden terms, bond, or variable pay details..."
className="rounded-3"
/>
</Form.Group>
</Col>
</Row>

<div className="text-center mt-5">
<Button 
variant="primary" 
type="submit" 
className="px-5 py-2 fw-bold rounded-pill shadow-sm"
disabled={loading}
>
{loading ? 'Submitting...' : 'Submit Placement Record'}
</Button>
</div>
</Form>
</Card.Body>
</Card>
</Col>
</Row>
</Container>
</div>
);
}

export default AddRecord;