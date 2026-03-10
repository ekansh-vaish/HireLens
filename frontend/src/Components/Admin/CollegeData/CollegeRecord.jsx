import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaBuilding, FaMapMarkerAlt, FaStar, FaRupeeSign, FaQuoteLeft } from 'react-icons/fa';

function CollegeRecord() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function FetchRecords() {
    try {
      const res = await axios.get("http://localhost:8080/placementrecord/getrecords", {
        withCredentials: true
      });
      setRecords(res.data.FetchRecord || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchRecords();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <Spinner animation="grow" variant="primary" />
        <p className="mt-3 fw-bold text-secondary">Fetching verified records...</p>
      </div>
    </div>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger" className="rounded-4 shadow-sm">
        <Alert.Heading>Error loading data</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  return (
    <div className="pb-5" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold text-dark mb-1">📜 Placement Transparency Logs</h2>
            <p className="text-muted">Direct insights from student placement experiences</p>
          </div>
          <Badge bg="primary" className="rounded-pill px-3 py-2">
            Total Records: {records.length}
          </Badge>
        </div>

        <Row className="g-4">
          {records.map((rec) => {
            // Logic to check reality gap color
            const gap = rec.AdvertisedPackage - rec.ActualPackage;
            const gapColor = gap > 2 ? 'text-danger' : 'text-success';

            return (
              <Col key={rec._id} lg={4} md={6}>
                <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden record-card">
                  <Card.Body className="p-4">
                    {/* Header: Company & Rating */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                          <FaBuilding className="text-primary fs-4" />
                        </div>
                        <h5 className="fw-bold mb-0 text-dark">{rec.CompanyName}</h5>
                      </div>
                      <div className="d-flex align-items-center bg-warning bg-opacity-10 px-2 py-1 rounded-2">
                        <FaStar className="text-warning me-1 small" />
                        <span className="fw-bold text-warning small">{rec.Rating}</span>
                      </div>
                    </div>

                    {/* Salary Details */}
                    <div className="row g-2 mb-4">
                      <div className="col-6">
                        <div className="p-3 bg-light rounded-3 border-start border-primary border-3">
                          <small className="text-muted d-block text-uppercase small-font">Actual</small>
                          <span className="fw-bold text-primary fs-5">₹{rec.ActualPackage}L</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-light rounded-3 border-start border-secondary border-3">
                          <small className="text-muted d-block text-uppercase small-font">Promised</small>
                          <span className="fw-bold text-dark fs-5">₹{rec.AdvertisedPackage}L</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Section */}
                    <div className="mb-4 position-relative">
                      <FaQuoteLeft className="text-primary opacity-10 position-absolute top-0 start-0" style={{fontSize: '2rem'}} />
                      <p className="text-success small mb-0 m-4 ps-4 pt-2 italic-text">
                        "{rec.ReviewDescription}"
                      </p>
                    </div>

                    {/* Footer: College Info */}
                    <div className="pt-3 border-top mt-auto">
                      <div className="d-flex align-items-center text-muted small">
                        <FaMapMarkerAlt className="me-2 text-primary" />
                        <span className="fw-semibold">{rec.collegeId?.name}</span>
                      </div>
                      <div className="ps-4 mt-1">
                        <span className="badge bg-light text-primary fw-normal">{rec.collegeId?.city}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

    
    </div>
  );
}

export default CollegeRecord;