import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, InputGroup } from 'react-bootstrap';
import { FaBuilding, FaIndustry, FaPlusCircle } from 'react-icons/fa';

function AddCompany() {
const [addCompany, setAddCompany] = useState({
CompanyName: "",
IndustryType: "",
});
const [loading, setLoading] = useState(false);

function handleChange(e) {
const { name, value } = e.target;
setAddCompany(prev => ({
...prev,
[name]: value
}));
}

async function AddDetails(e) {
e.preventDefault();
setLoading(true);
try {
await axios.post(
"http://localhost:8080/companyquery/addcompany",
addCompany,
{ withCredentials: true }
);
alert("Company added successfully!");
// Clear form
setAddCompany({ CompanyName: "", IndustryType: "" });
} catch (err) {
console.error("Error adding company:", err);
alert("Failed to add company. Please try again.");
} finally {
setLoading(false);
}
}

return (
/* Use min-vh-100 to ensure content area is tall enough, pushing footer down */
<div className="bg-light d-flex align-items-center" style={{ minHeight: '80vh', padding: '50px 0' }}>
<Container className="d-flex justify-content-center">
<Card className="border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '450px', width: '100%' }}>
{/* Header Decoration */}
<div className="bg-primary py-3 text-center">
<FaPlusCircle className="text-white fs-1" />
</div>

<Card.Body className="p-4 p-md-5">
<div className="text-center mb-4">
<h3 className="fw-bold text-dark">Register Company</h3>
<p className="text-muted small">Add a new organization to the HireLens database</p>
</div>

<Form onSubmit={AddDetails}>
<Form.Group className="mb-4">
<Form.Label className="small fw-bold text-secondary">Company Name</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0">
<FaBuilding className="text-muted" />
</InputGroup.Text>
<Form.Control
className="border-start-0 ps-0 shadow-none"
type="text"
name="CompanyName"
placeholder="e.g. Google, Microsoft..."
value={addCompany.CompanyName}
onChange={handleChange}
required
/>
</InputGroup>
</Form.Group>

<Form.Group className="mb-4">
<Form.Label className="small fw-bold text-secondary">Industry Sector</Form.Label>
<InputGroup>
<InputGroup.Text className="bg-white border-end-0">
<FaIndustry className="text-muted" />
</InputGroup.Text>
<Form.Control
className="border-start-0 ps-0 shadow-none"
type="text"
name="IndustryType"
placeholder="e.g. Fintech, Edtech..."
value={addCompany.IndustryType}
onChange={handleChange}
required
/>
</InputGroup>
</Form.Group>

<div className="d-grid gap-2 mt-5">
<Button 
variant="primary" 
type="submit" 
className="py-2 fw-bold rounded-pill shadow-sm"
disabled={loading}
>
{loading ? 'Processing...' : 'Add Company to Database'}
</Button>
</div>
</Form>
</Card.Body>
</Card>
</Container>
</div>
);
}

export default AddCompany;