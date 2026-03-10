import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form, Container, Badge, Card, Spinner, InputGroup, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaBuilding, FaIndustry, FaSave, FaSearch } from 'react-icons/fa';
import axios from "axios";

function CompanyDetails() {
const [companies, setCompanies] = useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedCompany, setSelectedCompany] = useState(null);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");

async function fetchCompanies() {
try {
setLoading(true);
const res = await axios.get("http://localhost:8080/companyquery/fetchdata", { withCredentials: true });
setCompanies(res.data.FetchData || []);
} catch (err) { console.error(err); } finally { setLoading(false); }
}

useEffect(() => { fetchCompanies(); }, []);

const handleEdit = (company) => {
setSelectedCompany({ ...company });
setShowModal(true);
};

async function handleUpdate() {
try {
await axios.put(`http://localhost:8080/companyquery/editcompany/${selectedCompany._id}`, selectedCompany, { withCredentials: true });
setShowModal(false);
fetchCompanies();
} catch (err) { alert("Update failed"); }
}

async function handleDelete(id) {
if (window.confirm("Delete this company?")) {
try {
await axios.delete(`http://localhost:8080/companyquery/deletecompanydata/${id}`, { withCredentials: true });
fetchCompanies();
} catch (err) { console.error(err); }
}
}

const filteredCompanies = companies.filter(company => 
company.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
company.IndustryType.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
<div className="pb-5" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
<Container className="py-4">

{/* Header */}
<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
<div>
<h2 className="fw-bold text-dark mb-1 d-flex align-items-center">
<FaBuilding className="text-primary me-2" /> Directory
</h2>
<p className="text-muted small mb-0">Manage placement partners</p>
</div>
<Badge bg="primary" className="px-3 py-2 rounded-pill">Total: {companies.length}</Badge>
</div>

{/* Search */}
<Card className="border-0 shadow-sm rounded-4 mb-4">
<Card.Body className="p-2">
<InputGroup className="border-0">
<InputGroup.Text className="bg-transparent border-0 ps-3"><FaSearch className="text-muted" /></InputGroup.Text>
<Form.Control 
placeholder="Search company..." 
className="border-0 shadow-none py-2"
onChange={(e) => setSearchTerm(e.target.value)}
/>
</InputGroup>
</Card.Body>
</Card>

{loading ? (
<div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
) : (
<>
{/* DESKTOP VIEW: Table (Hidden on Mobile) */}
<div className="d-none d-md-block">
<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
<Table hover className="align-middle mb-0">
<thead className="bg-light text-secondary small fw-bold">
<tr>
<th className="ps-4 py-3">COMPANY</th>
<th className="py-3">INDUSTRY</th>
<th className="py-3 text-end pe-4">ACTIONS</th>
</tr>
</thead>
<tbody>
{filteredCompanies.map(company => (
<tr key={company._id}>
<td className="ps-4">
<div className="d-flex align-items-center">
<div className="company-icon-sm me-3">{company.CompanyName.charAt(0)}</div>
<span className="fw-bold">{company.CompanyName}</span>
</div>
</td>
<td><Badge className="badge-soft-primary">{company.IndustryType}</Badge></td>
<td className="text-end pe-4">
<Button variant="light" size="sm" className="me-2 text-primary border" onClick={() => handleEdit(company)}><FaEdit /></Button>
<Button variant="light" size="sm" className="text-danger border" onClick={() => handleDelete(company._id)}><FaTrashAlt /></Button>
</td>
</tr>
))}
</tbody>
</Table>
</Card>
</div>

{/* MOBILE VIEW: Card List (Hidden on Desktop) */}
<div className="d-md-none">
<Row className="g-3">
{filteredCompanies.map(company => (
<Col xs={12} key={company._id}>
<Card className="border-0 shadow-sm rounded-4 p-3">
<div className="d-flex justify-content-between align-items-start mb-3">
<div className="d-flex align-items-center">
<div className="company-icon-sm me-3">{company.CompanyName.charAt(0)}</div>
<div>
<h6 className="fw-bold mb-0">{company.CompanyName}</h6>
<small className="text-muted">{company.IndustryType}</small>
</div>
</div>
<Badge bg="light" text="dark" className="border">ID: {company._id.substring(0,5)}</Badge>
</div>
<div className="d-flex gap-2 mt-2">
<Button variant="primary" className="w-100 rounded-3 py-2" onClick={() => handleEdit(company)}>
<FaEdit className="me-1" /> Edit
</Button>
<Button variant="outline-danger" className="w-auto px-3 rounded-3" onClick={() => handleDelete(company._id)}>
<FaTrashAlt />
</Button>
</div>
</Card>
</Col>
))}
</Row>
</div>
</>
)}
</Container>

{/* Edit Modal */}
<Modal show={showModal} onHide={() => setShowModal(false)} centered className="p-3">
<Modal.Header closeButton className="border-0">
<Modal.Title className="fw-bold">Edit Company</Modal.Title>
</Modal.Header>
<Modal.Body>
{selectedCompany && (
<Form>
<Form.Group className="mb-3">
<Form.Label className="small fw-bold">Company Name</Form.Label>
<Form.Control 
type="text" 
className="bg-light border-0 py-2"
value={selectedCompany.CompanyName} 
onChange={(e) => setSelectedCompany({ ...selectedCompany, CompanyName: e.target.value })} 
/>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label className="small fw-bold">Industry Type</Form.Label>
<Form.Control 
type="text" 
className="bg-light border-0 py-2"
value={selectedCompany.IndustryType} 
onChange={(e) => setSelectedCompany({ ...selectedCompany, IndustryType: e.target.value })} 
/>
</Form.Group>
</Form>
)}
</Modal.Body>
<Modal.Footer className="border-0">
<Button variant="primary" className="w-100 rounded-pill py-2" onClick={handleUpdate}>Save Changes</Button>
</Modal.Footer>
</Modal>

<style>{`
.company-icon-sm {
width: 38px; height: 38px;
background: linear-gradient(135deg, #0d6efd, #0dcaf0);
color: white; border-radius: 10px;
display: flex; align-items: center; justify-content: center;
font-weight: bold; font-size: 1rem;
}
.badge-soft-success {
background-color: #fef0e0; color: #0369a1; border: 1px solid #bae6fd;
}
.card { transition: transform 0.2s; }
.card:active { transform: scale(0.98); }
`}</style>
</div>
);
}

export default CompanyDetails;