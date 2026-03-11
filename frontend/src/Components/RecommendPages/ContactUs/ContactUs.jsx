import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaHeadset } from 'react-icons/fa';
import axios from 'axios';

const ContactUs = () => {
const [formData, setFormData] = useState({
FullName: '',
Email: '',
Subject: '',
Message: ''
});

const [status, setStatus] = useState({ loading: false, success: null, error: null });

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setStatus({ loading: true, success: null, error: null });

try {
// Bhai yahan apni API ka URL daal dena
const response = await axios.post('https://hirelens-9o7y.onrender.com/contactquery/addreport', formData,
    {
    withCredentials : true    
    }
);

if (response.status === 200) {
setStatus({ loading: false, success: "Message sent successfully! We'll get back to you soon.", error: null });
setFormData({ name: '', email: '', subject: '', message: '' }); // Form clear
}
} catch (err) {
setStatus({ 
loading: false, 
success: null, 
error: err.response?.data?.Message || "Something went wrong. Please try again later." 
});
}
};

return (
<div className="contact-page py-5" style={{ background: '#f8fafc', minHeight: '90vh' }}>
<Container>
{/* Header Section */}
<div className="text-center mb-5">
<h1 className="fw-bold text-dark">Get In <span style={{ color: '#38bdf8' }}>Touch</span></h1>
<p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
Have questions about placement data or need help with your college profile? 
Our team is here to help you.
</p>
</div>

<Row className="g-4">
{/* 1. Contact Info Cards */}
<Col lg={4}>
<div className="d-flex flex-column gap-3">
<Card className="border-0 shadow-sm p-3 rounded-4">
<div className="d-flex align-items-center gap-3">
<div className="icon-box"><FaEnvelope /></div>
<div>
<h6 className="mb-0 fw-bold">Email Support</h6>
<small className="text-muted">support@hirelens.com</small>
</div>
</div>
</Card>

<Card className="border-0 shadow-sm p-3 rounded-4">
<div className="d-flex align-items-center gap-3">
<div className="icon-box"><FaPhoneAlt /></div>
<div>
<h6 className="mb-0 fw-bold">Call Us</h6>
<small className="text-muted">+91 98765 43210</small>
</div>
</div>
</Card>

<Card className="border-0 shadow-sm p-3 rounded-4">
<div className="d-flex align-items-center gap-3">
<div className="icon-box"><FaMapMarkerAlt /></div>
<div>
<h6 className="mb-0 fw-bold">Office</h6>
<small className="text-muted">North Campus, New Delhi, India</small>
</div>
</div>
</Card>

{/* Decorative Support Box */}
<Card className="border-0 shadow-sm p-4 rounded-4 bg-primary text-white mt-2">
<FaHeadset size={40} className="mb-3 opacity-75" />
<h5>24/7 Priority Support</h5>
<p className="small mb-0 opacity-75">Our dedicated team is always ready to assist students and recruiters alike.</p>
</Card>
</div>
</Col>

{/* 2. Contact Form */}
<Col lg={8}>
<Card className="border-0 shadow-lg rounded-4 p-4 p-lg-5">
<h4 className="fw-bold mb-4">Send us a Message</h4>

{status.success && <div className="alert alert-success">{status.success}</div>}
{status.error && <div className="alert alert-danger">{status.error}</div>}

<Form onSubmit={handleSubmit}>
<Row>
<Col md={6} className="mb-3">
<Form.Label className="small fw-bold">Full Name</Form.Label>
<Form.Control 
name="FullName" 
placeholder="John Doe" 
value={formData.FullName} 
onChange={handleChange} 
required 
className="py-2 bg-light border-0"
/>
</Col>
<Col md={6} className="mb-3">
<Form.Label className="small fw-bold">Email Address</Form.Label>
<Form.Control 
type="email" 
name="Email" 
placeholder="john@example.com" 
value={formData.Email} 
onChange={handleChange} 
required 
className="py-2 bg-light border-0"
/>
</Col>
<Col md={12} className="mb-3">
<Form.Label className="small fw-bold">Subject</Form.Label>
<Form.Control 
name="Subject" 
placeholder="What is this about?" 
value={formData.Subject} 
onChange={handleChange} 
required 
className="py-2 bg-light border-0"
/>
</Col>
<Col md={12} className="mb-4">
<Form.Label className="small fw-bold">Message</Form.Label>
<Form.Control 
as="textarea" 
name="Message" 
rows={5} 
placeholder="Your detailed message..." 
value={formData.Message} 
onChange={handleChange} 
required 
className="bg-light border-0"
/>
</Col>
</Row>
<Button 
variant="primary" 
type="submit" 
className="px-5 py-2 rounded-pill fw-bold" 
disabled={status.loading}
>
{status.loading ? (
<><Spinner size="sm" className="me-2" /> Sending...</>
) : (
<><FaPaperPlane className="me-2" /> Send Message</>
)}
</Button>
</Form>
</Card>
</Col>
</Row>
</Container>

<style>{`
.icon-box {
width: 45px;
height: 45px;
background: rgba(56, 189, 248, 0.1);
color: #38bdf8;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
font-size: 1.2rem;
}
.form-control:focus {
background-color: #fff !important;
box-shadow: 0 0 0 0.25rem rgba(56, 189, 248, 0.1);
border: 1px solid #38bdf8 !important;
}
.contact-page h1 {
letter-spacing: -1px;
}
`}</style>
</div>
);
};

export default ContactUs;