import React from 'react';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
FaSearchLocation, FaChartPie, FaShieldAlt, FaArrowRight, 
FaUserEdit, FaFileInvoiceDollar, FaCheckDouble, FaQuoteLeft 
} from 'react-icons/fa';

function Home() {
const navigate = useNavigate();



return (
<div className="landing-page overflow-hidden">

<section className="hero-section text-white d-flex align-items-center position-relative" 
style={{ 
background: 'radial-gradient(circle at top right, #3b82f6, #1e3a8a 70%)',
minHeight: '95vh',
padding: '120px 0 80px 0'
}}>
<div className="position-absolute w-100 h-100 top-0 start-0 opacity-10" 
style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

<Container className="position-relative">
<Row className="align-items-center">
<Col lg={7} className="text-center text-lg-start mb-5 mb-lg-0">
<span className="badge rounded-pill bg-warning text-dark px-3 py-2 mb-3 fw-bold shadow-sm">
🚀 #1 Transparency Platform for Students
</span>
<h1 className="display-2 fw-bold mb-4 tracking-tight leading-tight">
Stop Chasing <span className="text-info">Fake</span> <br />
Placement Numbers.
</h1>
<p className="lead mb-5 opacity-90 fs-4 pe-lg-5">
90% of colleges inflate their salary data. We help you see the <strong>Fixed vs Variable</strong> split so you don't regret your 4 years.
</p>
<div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
<Button variant="warning" size="lg" className="rounded-pill px-5 py-3 fw-bold shadow-lg hvr-grow"
onClick={() => navigate('/collegequery')}>
Explore Colleges <FaArrowRight className="ms-2" />
</Button>
<Button variant="outline-light" size="lg" className="rounded-pill px-4 py-3 hvr-light"
onClick={() => navigate('/addrecord')}>
Contribute Data
</Button>
</div>
<div className="mt-5 d-flex gap-4 justify-content-center justify-content-lg-start opacity-75 small">
<span><strong>500+</strong> Colleges</span>
<span><strong>10k+</strong> Verified Reviews</span>
<span><strong>100%</strong> Anonymous</span>
</div>
</Col>

<Col lg={5} className="d-none d-lg-block">
<div className="hero-card-stack position-relative">
<Card className="border-0 shadow-lg rounded-4 p-3 bg-white text-dark floating-card">
<div className="d-flex align-items-center mb-3">
<div className="bg-danger p-2 rounded-circle me-3"></div>
<span className="fw-bold">Reported Reality Gap: 45%</span>
</div>
<div className="progress mb-3" style={{height: '10px'}}>
<div className="progress-bar bg-primary w-75"></div>
</div>
<p className="small text-muted mb-0">"The CTC was 12 LPA, but in-hand is only 65k per month."</p>
</Card>
<Card className="border-0 shadow-lg rounded-4 p-3 bg-white text-dark position-absolute top-50 start-50 mt-4 ms-4 shadow-card">
<FaChartPie className="text-success mb-2 fs-2" />
<h6 className="fw-bold mb-1">In-Hand Salary</h6>
<span className="h4 fw-bold text-success">₹78,000/mo</span>
</Card>
</div>
</Col>
</Row>
</Container>
</section>

{/* 2. STATS BAR */}
<div className="bg-white py-4 shadow-sm">
<Container>
<Row className="text-center gy-3">
<Col md={3} sm={6}>
<h3 className="fw-bold mb-0 text-primary">₹3.2Cr+</h3>
<p className="text-muted small mb-0">Total Salary Gap Exposed</p>
</Col>
<Col md={3} sm={6}>
<h3 className="fw-bold mb-0 text-primary">450+</h3>
<p className="text-muted small mb-0">Verified Companies</p>
</Col>
<Col md={3} sm={6}>
<h3 className="fw-bold mb-0 text-primary">12k+</h3>
<p className="text-muted small mb-0">Active Students</p>
</Col>
<Col md={3} sm={6}>
<h3 className="fw-bold mb-0 text-primary">85%</h3>
<p className="text-muted small mb-0">Accuracy Rate</p>
</Col>
</Row>
</Container>
</div>

{/* 3. HOW IT WORKS */}
<section className="py-5">
<Container className="py-5">
<div className="text-center mb-5">
<h2 className="fw-bold display-5">How HireLens Works</h2>
<div className="bg-primary mx-auto mb-3" style={{width: '60px', height: '4px'}}></div>
</div>
<Row className="text-center gy-4">
<Col md={4}>
<div className="step-circle mx-auto mb-4">1</div>
<FaUserEdit className="fs-1 text-primary mb-3" />
<h4>Students Share</h4>
<p className="text-muted px-lg-4">Alumni and students upload their actual offer letters (Anonymously).</p>
</Col>
<Col md={4}>
<div className="step-circle mx-auto mb-4">2</div>
<FaCheckDouble className="fs-1 text-primary mb-3" />
<h4>We Verify</h4>
<p className="text-muted px-lg-4">Our algorithm & team cross-check data points for authenticity.</p>
</Col>
<Col md={4}>
<div className="step-circle mx-auto mb-4">3</div>
<FaFileInvoiceDollar className="fs-1 text-primary mb-3" />
<h4>You Decide</h4>
<p className="text-muted px-lg-4">Access detailed analytics and make informed career choices.</p>
</Col>
</Row>
</Container>
</section>

{/* 4. KEY FEATURES (THE CARDS YOU HAD + MORE) */}
<section className="py-5 bg-light">
<Container>
<Row className="align-items-center">
<Col lg={5} className="mb-5 mb-lg-0">
<h2 className="display-6 fw-bold mb-4">Deep Insights for <br /><span className="text-primary">Smarter Decisions.</span></h2>
<p className="text-muted mb-4">We provide a granular breakdown of placement statistics that you won't find on any official college website or brochure.</p>
<ul className="list-unstyled">
<li className="mb-3 d-flex align-items-center"><FaShieldAlt className="text-primary me-2"/> 100% Data Privacy for Contributors</li>
<li className="mb-3 d-flex align-items-center"><FaShieldAlt className="text-primary me-2"/> Fixed vs Variable CTC Breakdown</li>
<li className="mb-3 d-flex align-items-center"><FaShieldAlt className="text-primary me-2"/> Role-wise Reality Check</li>
</ul>
</Col>
<Col lg={7}>
<Row className="g-4">
<Col sm={6}>
<Card className="h-100 border-0 shadow-sm p-3 rounded-4 hvr-up">
<FaChartPie className="text-primary fs-2 mb-3"/>
<h5 className="fw-bold">Gap Analytics</h5>
<p className="small text-muted">Identify which companies offer high CTC but low base pay.</p>
</Card>
</Col>
<Col sm={6}>
<Card className="h-100 border-0 shadow-sm p-3 rounded-4 hvr-up">
<FaSearchLocation className="text-success fs-2 mb-3"/>
<h5 className="fw-bold">Location Trends</h5>
<p className="small text-muted">See which cities have the best cost-to-living vs salary ratio.</p>
</Card>
</Col>
</Row>
</Col>
</Row>
</Container>
</section>

{/* 5. TESTIMONIALS */}
<section className="py-5">
<Container className="py-5 text-center">
<h2 className="fw-bold mb-5">Hear From Fellow Students</h2>
<Row className="g-4">
{[1, 2, 3].map((i) => (
<Col md={4} key={i}>
<Card className="border-0 shadow-sm p-4 rounded-4 bg-white h-100">
<FaQuoteLeft className="text-warning opacity-25 fs-1 mb-3" />
<p className="font-italic text-muted">"HireLens saved me from joining a college that was claiming 100% placements but in reality, most were unpaid internships."</p>
<div className="mt-3">
<h6 className="fw-bold mb-0">Student {i}</h6>
<small className="text-primary">Tier-2 Engineering College</small>
</div>
</Card>
</Col>
))}
</Row>
</Container>
</section>

{/* 6. FAQ SECTION */}
<section className="py-5 bg-white">
<Container style={{maxWidth: '800px'}}>
<h2 className="text-center fw-bold mb-5">Frequently Asked Questions</h2>
<Accordion flush className="shadow-sm rounded-4 overflow-hidden border">
<Accordion.Item eventKey="0">
<Accordion.Header>Is my identity safe if I contribute data?</Accordion.Header>
<Accordion.Body>
Absolutely. We do not store any personal identification data. Your contribution is pooled into an aggregate database to protect your identity.
</Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="1">
<Accordion.Header>How do you verify the information?</Accordion.Header>
<Accordion.Body>
We use a 3-step verification process including offer letter parsing, LinkedIn profile verification, and peer-reviewing by students from the same batch.
</Accordion.Body>
</Accordion.Item>
</Accordion>
</Container>
</section>

{/* 7. CTA SECTION */}
<section className="py-5">
<Container>
<div className="bg-primary rounded-5 p-5 text-white text-center shadow-lg mx-2">
<h2 className="display-5 fw-bold mb-3">Your Career Deserves the Truth.</h2>
<p className="mb-4 opacity-75 fs-5">Don't be another statistic in a fake brochure.</p>
<Button variant="light" size="lg" className="rounded-pill px-5 fw-bold text-primary shadow" onClick={() => navigate('/collegequery')}>
Get Started Now
</Button>
</div>
</Container>
</section>

<style>{`
.hvr-grow { transition: transform 0.3s ease; }
.hvr-grow:hover { transform: scale(1.05); }
.hvr-up { transition: all 0.3s ease; }
.hvr-up:hover { transform: translateY(-10px); }
.floating-card { animation: float 6s ease-in-out infinite; }
@keyframes float {
0% { transform: translateY(0px) rotate(2deg); }
50% { transform: translateY(-20px) rotate(2deg); }
100% { transform: translateY(0px) rotate(2deg); }
}
.step-circle {
width: 50px; height: 50px; background: #3b82f6; color: white;
border-radius: 50%; display: flex; align-items: center; justify-content: center;
font-weight: bold; font-size: 1.2rem;
}
.leading-tight { line-height: 1.1; }
`}</style>
</div>
);
}

export default Home;