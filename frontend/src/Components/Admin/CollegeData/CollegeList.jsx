import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function CollegeList() {
const [colleges, setColleges] = useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedCollege, setSelectedCollege] = useState(null);

async function fetchColleges() {
try {
const res = await axios.get("http://localhost:8080/collegedetail/getcolleges", {
withCredentials: true
});
setColleges(res.data.CollegesData); 
} catch (err) {
console.error("Error fetching colleges:", err);
}
}

useEffect(() => {
fetchColleges();
}, []);

function handleShow(college) {
setSelectedCollege(college);
setShowModal(true);
}

function handleClose() {
setShowModal(false);
setSelectedCollege(null);
}

async function handleUpdate(e) {
e.preventDefault();
try {
await axios.put(
`http://localhost:8080/collegedetail/updateCollege/${selectedCollege._id}`,
selectedCollege,
{ withCredentials: true }
);
fetchColleges(); // refresh list
handleClose();
} catch (err) {
console.error("Update failed:", err);
}
}

async function DeleteData(id) {
try {
 await axios.delete(`http://localhost:8080/collegedetail/deleteCollege/${id}`, {
withCredentials: true
});
fetchColleges();
} catch (err) {
console.error("Delete failed:", err);
}
}

return (
<div className="container my-5">
<h2 className="text-center mb-4">College List</h2>
<Row className="g-4">
{colleges.map((college, idx) => (
<Col key={idx} md={4}>
<Card className="shadow-sm h-100 border-0">
<Card.Body>
<Card.Title className="fw-bold">{college.name}</Card.Title>
<Card.Subtitle className="mb-2 text-muted">
{college.city}, {college.state}
</Card.Subtitle>
<Badge bg="secondary">
{new Date(college.createdAt).toDateString()}
</Badge>
<div className="mt-3 d-flex justify-content-between">
<Button variant="warning" onClick={() => handleShow(college)}>
Update
</Button>
<Button variant="danger" onClick={() => DeleteData(college._id)}>
Delete
</Button>
</div>
</Card.Body>
</Card>
</Col>
))}
</Row>

{/* Update Modal */}
<Modal show={showModal} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Update College</Modal.Title>
</Modal.Header>
<Modal.Body>
{selectedCollege && (
<Form onSubmit={handleUpdate}>
<Form.Group className="mb-3">
<Form.Label>College Name</Form.Label>
<Form.Control
type="text"
value={selectedCollege.name}
onChange={(e) =>
setSelectedCollege({ ...selectedCollege, name: e.target.value })
}
/>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>City</Form.Label>
<Form.Control
type="text"
value={selectedCollege.city}
onChange={(e) =>
setSelectedCollege({ ...selectedCollege, city: e.target.value })
}
/>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>State</Form.Label>
<Form.Control
type="text"
value={selectedCollege.state}
onChange={(e) =>
setSelectedCollege({ ...selectedCollege, state: e.target.value })
}
/>
</Form.Group>
<Button variant="success" type="submit">
Save Changes
</Button>
</Form>
)}
</Modal.Body>
</Modal>
</div>
);
}

export default CollegeList;
