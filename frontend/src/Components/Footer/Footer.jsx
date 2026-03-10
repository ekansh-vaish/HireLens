import React from "react";
import { Link } from "react-router-dom";
import { 
FaLinkedinIn, FaTwitter, FaInstagram, FaGithub, 
FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaRocket, FaEye 
} from "react-icons/fa";

const Footer = () => {
return (
<footer className="footer-section pt-5 mt-5">
<div className="container">
<div className="row gy-5">

{/* 1. BRAND & MISSION */}
<div className="col-lg-4 col-md-12">
<div className="footer-brand-box">
<h3 className="fw-bold text-white mb-3">
Hire<span className="text-primary-custom">Lens</span>
</h3>
<p className="text-light-muted mb-4">
Our mission is to bridge the gap between academic hard work and corporate reality. 
We provide students with the "lens" to see real salary data and placement trends.
</p>
<div className="social-links d-flex gap-3">
<a href="https://www.linkedin.com/in/ekansh-vaish-594832295/" className="social-icon"><FaLinkedinIn /></a>
<a href="#" className="social-icon"><FaTwitter /></a>
<a href="#" className="social-icon"><FaInstagram /></a>
<a href="https://github.com/ekansh-vaish" className="social-icon"><FaGithub /></a>
</div>
</div>
</div>

{/* 2. VISION SECTION */}
<div className="col-lg-2 col-md-4 col-6">
<h6 className="footer-heading">Our Vision</h6>
<div className="vision-item mb-3">
<FaEye className="text-primary-custom mb-2" size={20} />
<p className="small text-light-muted">To be the world's most trusted student-first career data platform.</p>
</div>
<div className="vision-item">
<FaRocket className="text-primary-custom mb-2" size={20} />
<p className="small text-light-muted">Helping 1M+ students navigate their first job with confidence.</p>
</div>
</div>

{/* 3. QUICK LINKS */}
<div className="col-lg-2 col-md-4 col-6">
<h6 className="footer-heading">Navigation</h6>
<ul className="list-unstyled footer-links">
<li><Link to="/home">Home</Link></li>
<li><Link to="/collegequery">Colleges</Link></li>
<li><Link to="/about">About Us</Link></li>
<li><Link to="/contact">Contact Us</Link></li>
<li><Link to="/faq">Help & Support</Link></li>
</ul>
</div>

{/* 4. CONTACT US SECTION */}
<div className="col-lg-4 col-md-4">
<h6 className="footer-heading">Contact Us</h6>
<ul className="list-unstyled contact-info">
<li className="d-flex align-items-start gap-3 mb-3">
<div className="contact-icon-box"><FaEnvelope /></div>
<div>
<span className="d-block text-white small fw-bold">Email Us</span>
<a href="mailto:support@hirelens.com" className="text-light-muted text-decoration-none small">support@hirelens.com</a>
</div>
</li>
<li className="d-flex align-items-start gap-3 mb-3">
<div className="contact-icon-box"><FaPhoneAlt /></div>
<div>
<span className="d-block text-white small fw-bold">Call Us</span>
<a href="tel:+6395208277" className="text-light-muted text-decoration-none small">+91 6395208277</a>
</div>
</li>
<li className="d-flex align-items-start gap-3">
<div className="contact-icon-box"><FaMapMarkerAlt /></div>
<div>
<span className="d-block text-white small fw-bold">Location</span>
<span className="text-light-muted small">Academic Block, North Campus, New Delhi</span>
</div>
</li>
</ul>
</div>

</div>

{/* BOTTOM BAR */}
<div className="footer-bottom mt-5 py-4 border-top border-secondary border-opacity-25">
<div className="row align-items-center">
<div className="col-md-6 text-center text-md-start">
<p className="small text-light-muted mb-0">
© {new Date().getFullYear()} HireLens. Developed with passion for students.
</p>
</div>
<div className="col-md-6 text-center text-md-end">
<div className="small text-light-muted">
<Link to="/privacy" className="me-3 text-decoration-none text-light-muted">Privacy Policy</Link>
<Link to="/terms" className="text-decoration-none text-light-muted">Terms of Use</Link>
</div>
</div>
</div>
</div>
</div>

<style>{`
.footer-section {
background-color: #0f172a; /* Deep Slate Blue */
color: #f8fafc;
font-family: 'Inter', sans-serif;
}
.text-primary-custom {
color: #38bdf8; /* Sky Blue */
}
.text-light-muted {
color: #94a3b8;
}
.footer-heading {
color: #ffffff;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 1px;
font-size: 0.9rem;
margin-bottom: 1.5rem;
}
.footer-links li {
margin-bottom: 0.8rem;
}
.footer-links a {
color: #94a3b8;
text-decoration: none;
transition: all 0.3s ease;
}
.footer-links a:hover {
color: #38bdf8;
padding-left: 8px;
}
.social-icon {
width: 38px;
height: 38px;
background: rgba(255, 255, 255, 0.05);
display: flex;
align-items: center;
justify-content: center;
border-radius: 8px;
color: #94a3b8;
text-decoration: none;
transition: 0.3s;
}
.social-icon:hover {
background: #38bdf8;
color: #0f172a;
transform: translateY(-3px);
}
.contact-icon-box {
background: rgba(56, 189, 248, 0.1);
color: #38bdf8;
padding: 8px;
border-radius: 6px;
display: flex;
align-items: center;
justify-content: center;
}
.vision-item p {
line-height: 1.4;
}
`}</style>
</footer>
);
};

export default Footer;