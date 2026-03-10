import React from 'react';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Container, Row, Col, Accordion, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { FaSearch, FaQuestionCircle, FaUserShield, FaChartBar, FaEnvelopeOpenText, FaLifeRing } from 'react-icons/fa';

const HelpSupport = () => {

 const navigate  =  useNavigate();
  const faqs = [
    {
      category: "Account & Privacy",
      icon: <FaUserShield className="text-primary me-2" />,
      questions: [
        { q: "How do I verify my college profile?", a: "To verify your college profile, you need to upload a valid ID card or a document from your training and placement cell. Our team reviews it within 24-48 hours." },
        { q: "Is my personal data shared with companies?", a: "No, HireLens only shares aggregated placement statistics. Your personal identity remains anonymous unless you explicitly apply for a job." }
      ]
    },
    {
      category: "Data & Insights",
      icon: <FaChartBar className="text-success me-2" />,
      questions: [
        { q: "How accurate is the salary data?", a: "All data on HireLens is community-sourced and verified through multiple user reports and official placement brochures where available." },
        { q: "Can I compare two different colleges?", a: "Yes! Use the 'Compare' tool on the homepage to see side-by-side placement trends of any two institutions." }
      ]
    }
  ];

  return (
    <div className="help-support-wrapper py-5" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* 1. Header & Search Area */}
      <section className="support-header text-center py-5 mb-5" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', borderRadius: '0 0 50px 50px' }}>
        <Container>
          <h1 className="fw-bold mb-3"><FaLifeRing className="me-2 text-info" /> How can we help you?</h1>
          <p className="opacity-75 mb-4">Search our knowledge base or browse categories below</p>
          <Row className="justify-content-center">
            <Col md={6}>
              <InputGroup className="shadow-lg rounded-pill overflow-hidden">
                <InputGroup.Text className="bg-white border-0 ps-4"><FaSearch className="text-muted" /></InputGroup.Text>
                <Form.Control 
                  placeholder="Search for articles, guides..." 
                  className="border-0 py-3 shadow-none"
                />
                <Button variant="info" className="px-4 fw-bold text-white">Search</Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        <Row className="g-4">
          {/* 2. FAQ Section */}
          <Col lg={8}>
            <h4 className="fw-bold mb-4 d-flex align-items-center">
              <FaQuestionCircle className="me-2 text-primary" /> Frequently Asked Questions
            </h4>
            
            {faqs.map((cat, idx) => (
              <div key={idx} className="mb-4">
                <h6 className="text-uppercase fw-bold text-muted small mb-3 d-flex align-items-center">
                  {cat.icon} {cat.category}
                </h6>
                <Accordion className="custom-accordion shadow-sm rounded-4 overflow-hidden">
                  {cat.questions.map((item, qIdx) => (
                    <Accordion.Item eventKey={`${idx}-${qIdx}`} key={qIdx} className="border-0 border-bottom">
                      <Accordion.Header>{item.q}</Accordion.Header>
                      <Accordion.Body className="text-muted small">
                        {item.a}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            ))}
          </Col>

          {/* 3. Support Sidebar */}
          <Col lg={4}>
            <div className="sticky-top" style={{ top: '20px' }}>
              <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 text-center">
                <div className="support-icon-circle mx-auto mb-3">
                  <FaEnvelopeOpenText size={30} />
                </div>
                <h5 className="fw-bold">Still Need Help?</h5>
                <p className="text-muted small">Can't find the answer you're looking for? Raise a support ticket and our team will assist you.</p>
                <Button variant="primary" className="w-100 rounded-pill fw-bold py-2 mt-2" onClick={() => navigate("/contact")}>
                  Contact Support
                </Button>
              </Card>

              <Card className="border-0 shadow-sm rounded-4 p-4 bg-light">
                <h6 className="fw-bold mb-3">Quick Resources</h6>
                <ul className="list-unstyled mb-0 small support-list">
                  <li className="mb-2"><a href="#" className="text-decoration-none text-muted">📄 Placement Guide 2024</a></li>
                  <li className="mb-2"><a href="#" className="text-decoration-none text-muted">📄 Verification Process FAQ</a></li>
                  <li className="mb-2"><a href="#" className="text-decoration-none text-muted">📄 Community Guidelines</a></li>
                  <li><a href="#" className="text-decoration-none text-muted">📄 API Documentation</a></li>
                </ul>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .support-icon-circle {
          width: 70px; height: 70px;
          background: rgba(13, 110, 253, 0.1);
          color: #0d6efd;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
        }
        .custom-accordion .accordion-button:not(.collapsed) {
          background-color: transparent;
          color: #0d6efd;
          box-shadow: none;
        }
        .custom-accordion .accordion-button {
          font-weight: 600;
          font-size: 0.95rem;
          padding: 1.2rem;
        }
        .custom-accordion .accordion-item {
          background: white;
        }
        .support-list li:hover a {
          color: #0d6efd !important;
          padding-left: 5px;
          transition: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default HelpSupport;