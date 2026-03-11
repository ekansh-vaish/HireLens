import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Card, Spinner, Button, Modal } from 'react-bootstrap';
import { FaEnvelopeOpen, FaUser, FaCalendarAlt, FaCommentAlt, FaInbox, FaReply } from 'react-icons/fa';
import axios from 'axios';

function ContactData() {
const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [selectedMsg, setSelectedMsg] = useState(null);

useEffect(() => {
const fetchMessages = async () => {
try {
const res = await axios.get("https://hirelens-9o7y.onrender.com/contactquery/getdata", { withCredentials: true });
setMessages(res.data.FetchData || res.data || []);

} catch (err) {
console.error("Error fetching contact data:", err);
} finally {
setLoading(false);
}
};
fetchMessages();
}, []);

const openMessage = (msg) => {
setSelectedMsg(msg);
setShowModal(true);
};

return (
<Container className="py-4">
<div className="mb-4">
<h2 className="fw-bold text-dark d-flex align-items-center">
<FaInbox className="me-2 text-primary" /> Contact Inquiries
</h2>
<p className="text-muted">You have {messages.length} total messages from users.</p>
</div>

<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
{loading ? (
<div className="text-center py-5">
<Spinner animation="border" variant="primary" />
<p className="mt-2 text-muted">Fetching your messages...</p>
</div>
) : (
<div className="table-responsive">
<Table hover className="align-middle mb-0">
<thead className="bg-light">
<tr>
<th className="ps-4 py-3 text-secondary small fw-bold">SENDER</th>
<th className="py-3 text-secondary small fw-bold">SUBJECT</th>
<th className="py-3 text-secondary small fw-bold">MESSAGE PREVIEW</th>
<th className="py-3 text-secondary small fw-bold text-center">ACTION</th>
</tr>
</thead>
<tbody>
{messages.length > 0 ? (
messages.map((msg) => (
<tr key={msg._id}>
<td className="ps-4">
<div className="d-flex align-items-center">
<div className="icon-avatar me-2"><FaUser size={12}/></div>
<div>
    <div className="fw-bold text-dark small">{msg.FullName}</div>
    <div className="text-muted" style={{ fontSize: '11px' }}>{msg.Email}</div>
</div>
</div>
</td>
<td>
<Badge bg="info" className="fw-medium text-dark bg-opacity-10" style={{ fontSize: '11px' }}>
{msg.Subject}
</Badge>
</td>
<td>
<p className="mb-0 text-muted small text-truncate" style={{ maxWidth: '250px' }}>
{msg.Message}
</p>
</td>
<td className="text-center">
<Button 
variant="outline-primary" 
size="sm"
className="rounded-pill px-3 fw-bold"
style={{ fontSize: '11px' }}
onClick={() => openMessage(msg)}
>
View
</Button>
</td>
</tr>
))
) : (
<tr>
<td colSpan="4" className="text-center py-5 text-muted">
<FaEnvelopeOpen size={40} className="mb-3 opacity-25" /><br/>
No inquiries yet.
</td>
</tr>
)}
</tbody>
</Table>
</div>
)}
</Card>

{/* Modal for full details */}
<Modal show={showModal} onHide={() => setShowModal(false)} centered>
<Modal.Header closeButton className="border-0 pb-0">
<Modal.Title className="fw-bold text-primary">Inquiry Details</Modal.Title>
</Modal.Header>
<Modal.Body className="pt-4">
{selectedMsg && (
<div className="px-2">
<div className="mb-3">
<label className="text-muted small fw-bold text-uppercase d-block">Sender Name</label>
<span className="h6">{selectedMsg.FullName}</span>
</div>
<div className="mb-3">
<label className="text-muted small fw-bold text-uppercase d-block">Email Address</label>
<span className="h6 text-primary">{selectedMsg.Email}</span>
</div>
<div className="mb-3">
<label className="text-muted small fw-bold text-uppercase d-block">Subject</label>
<span className="h6">{selectedMsg.Subject}</span>
</div>
<hr className="opacity-25" />
<div className="mb-2">
<label className="text-muted small fw-bold text-uppercase d-flex align-items-center">
<FaCommentAlt className="me-2 text-primary" /> User Message
</label>
<div className="bg-light p-3 rounded-3 mt-2 border shadow-sm" style={{ whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
"{selectedMsg.Message}"
</div>
</div>
</div>
)}
</Modal.Body>
<Modal.Footer className="border-0">
<Button variant="light" className="rounded-pill px-4" onClick={() => setShowModal(false)}>
Close
</Button>
<Button 
variant="primary" 
className="rounded-pill px-4 shadow-sm" 
href={`mailto:${selectedMsg?.Email}?subject=Re: ${selectedMsg?.Subject}`}
>
<FaReply className="me-2" /> Reply to User
</Button>
</Modal.Footer>
</Modal>

<style>{`
.icon-avatar {
width: 32px;
height: 32px;
background: #e0f2fe;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
color: #0ea5e9;
}
.table thead th {
border: none;
}
.table tbody tr:hover {
background-color: #f8fafc !important;
transition: 0.3s;
}
`}</style>
</Container>
);
}

export default ContactData;