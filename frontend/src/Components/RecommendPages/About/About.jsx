import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaRocket, FaUsers, FaChartLine, FaShieldAlt, FaQuoteLeft, FaGraduationCap } from 'react-icons/fa';
import Photo from "../../../assets/ekanhsh pic - Copy.jpg";
const AboutUs = () => {
return (
<div className="about-wrapper">

{/* 1. HERO SECTION - Pehla Impression */}
<section className="about-hero d-flex align-items-center text-white">
<div className="hero-overlay"></div>
<Container className="position-relative text-center">
<h1 className="display-3 fw-bold mb-3">Empowering the Next <span className="text-info-custom">Generation</span></h1>
<p className="lead fs-4 opacity-75 mx-auto" style={{ maxWidth: '800px' }}>
HireLens is not just a platform; it's a movement to bring transparency, 
fairness, and data-driven clarity to campus placements.
</p>
</Container>
</section>

{/* 2. THE PROBLEM & OUR STORY */}
<section className="py-5 bg-white">
<Container className="py-5">
<Row className="align-items-center g-5">
<Col lg={6}>
<img 
src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
alt="Our Team" 
className="img-fluid rounded-4 shadow-lg"
/>
</Col>
<Col lg={6}>
<h6 className="text-primary fw-bold text-uppercase mb-3">Our Story</h6>
<h2 className="fw-bold mb-4">How HireLens Started?</h2>
<p className="text-muted">
As former students, we saw the confusion during placement seasons. Everyone had questions: 
"What is the actual package?", "Which companies visit which branch?", "Is this college really good?"
</p>
<p className="text-muted">
We realized that data was scattered and often misleading. That's why we built <b>HireLens</b>—a 
single source of truth for placement insights, verified by the community.
</p>
<div className="d-flex gap-4 mt-4">
<div className="text-center">
<h3 className="fw-bold text-dark mb-0">500+</h3>
<small className="text-muted">Colleges</small>
</div>
<div className="vr"></div>
<div className="text-center">
<h3 className="fw-bold text-dark mb-0">50k+</h3>
<small className="text-muted">Students</small>
</div>
<div className="vr"></div>
<div className="text-center">
<h3 className="fw-bold text-dark mb-0">200+</h3>
<small className="text-muted">Companies</small>
</div>
</div>
</Col>
</Row>
</Container>
</section>

{/* 3. CORE VALUES - Interactive Grid */}
<section className="py-5" style={{ background: '#f1f5f9' }}>
<Container className="py-5 text-center">
<h2 className="fw-bold mb-5">Why Students <span className="text-primary">Trust Us</span></h2>
<Row className="g-4">
{[
{ icon: <FaShieldAlt />, title: "Verified Data", desc: "Every salary figure and company detail is cross-checked for accuracy." },
{ icon: <FaChartLine />, title: "Trend Analysis", desc: "Compare placement growth year-over-year with advanced charts." },
{ icon: <FaUsers />, title: "Community Driven", desc: "Built by students, for students. Real reviews from real peers." },
{ icon: <FaRocket />, title: "Career Growth", desc: "Beyond data, we provide insights that help you choose the right career path." }
].map((val, idx) => (
<Col md={6} lg={3} key={idx}>
<Card className="h-100 border-0 shadow-sm p-4 hover-card transition-all">
<div className="value-icon mb-3 mx-auto">{val.icon}</div>
<h5 className="fw-bold">{val.title}</h5>
<p className="text-muted small mb-0">{val.desc}</p>
</Card>
</Col>
))}
</Row>
</Container>
</section>

{/* 4. MISSION & VISION - Big Impact Sections */}
<section className="py-5 bg-dark text-white overflow-hidden">
<Container className="py-5">
<Row className="g-5 align-items-center">
<Col lg={6} className="order-2 order-lg-1">
<div className="p-4 border-start border-primary border-4 bg-secondary bg-opacity-10 rounded-end">
<FaQuoteLeft size={30} className="text-primary mb-3 opacity-50" />
<h3 className="fw-bold">Our Mission</h3>
<p className="lead mb-4">
"To democratize career data so that every student, regardless of their background, 
has access to the information they need to succeed in the corporate world."
</p>
<Button variant="outline-primary" className="rounded-pill px-4">Learn More</Button>
</div>
</Col>
<Col lg={6} className="order-1 order-lg-2">
<img 
src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
alt="Mission" 
className="img-fluid rounded-4 shadow-lg transform-zoom"
/>
</Col>
</Row>
</Container>
</section>

{/* 5. MEET THE VISIONARIES - Team (Placeholder) */}
<section className="py-5 bg-white">
<Container className="py-5 text-center">
<h2 className="fw-bold mb-2">Our Team</h2>
<p className="text-muted mb-5">The humans behind the code and data.</p>
<Row className="justify-content-center">
{[1, 2, 3].map((item) => (
<Col md={4} key={item} className="mb-4">
<div className="team-card">
<div className="team-img-wrapper mb-3">
<img src={Photo} alt="Team Member" className="rounded-circle shadow" />
</div>
<h5 className="fw-bold mb-0">Team Member {item}</h5>
<p className="text-primary small">Founder & Developer</p>
</div>
</Col>
))}
</Row>
</Container>
</section>

<style>{`
.about-hero {
height: 60vh;
background: url('https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&w=1500&q=80') center/cover fixed;
position: relative;
}
.hero-overlay {
position: absolute;
top: 0; left: 0; right: 0; bottom: 0;
background: linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6));
}
.text-info-custom {
color: #38bdf8;
}
.value-icon {
width: 60px; height: 60px;
background: rgba(13, 110, 253, 0.1);
color: #0d6efd;
display: flex; align-items: center; justify-content: center;
border-radius: 15px; font-size: 1.5rem;
}
.hover-card:hover {
transform: translateY(-10px);
box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
}
.transition-all { transition: all 0.3s ease; }
.team-img-wrapper img {
width: 150px; height: 150px;
object-fit: cover; border: 5px solid #f1f5f9;
}
.transform-zoom:hover {
transform: scale(1.02);
transition: 0.5s;
}
`}</style>
</div>
);
};

export default AboutUs;