import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, InputGroup, Spinner } from 'react-bootstrap';
import { FaUniversity, FaMapMarkerAlt, FaGlobeAmericas, FaPlusCircle } from 'react-icons/fa';

function AddCollege() {
  const [collegeData, setCollegeData] = useState({
    name: "",
    city: "",
    state: ""
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setCollegeData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function AddDetails(e) {
    e.preventDefault();
    setLoading(true);
    try {
       await axios.post(
        "https://hirelens-9o7y.onrender.com/collegedetail/addcollege",
        collegeData,
        { withCredentials: true }
      );
      alert("College added successfully!");
      setCollegeData({ name: "", city: "", state: "" }); // Reset form
    } catch (err) {
      console.error("Error adding college:", err);
      alert("Failed to add college. Please try again.");
    
    } finally {
      setLoading(false);
    }
  }

  return (
    /* Flexible wrapper to prevent footer overlap */
    <div className="bg-light d-flex align-items-center" style={{ minHeight: '85vh', padding: '60px 0' }}>
      <Container className="d-flex justify-content-center">
        <Card className="border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '480px', width: '100%' }}>
          
          {/* Top Decorative Bar */}
          <div className="bg-success py-3 text-center">
            <FaPlusCircle className="text-white fs-1" />
          </div>

          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark">Add New College</h3>
              <p className="text-muted small">Expand the HireLens institution network</p>
            </div>

            <Form onSubmit={AddDetails}>
              {/* College Name */}
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary">Institution Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaUniversity className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-start-0 ps-0 shadow-none"
                    type="text"
                    name="name"
                    placeholder="e.g. IIT Delhi, LPU..."
                    value={collegeData.name}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* City */}
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary">City</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaMapMarkerAlt className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-start-0 ps-0 shadow-none"
                    type="text"
                    name="city"
                    placeholder="Enter city..."
                    value={collegeData.city}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* State */}
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary">State</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaGlobeAmericas className="text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-start-0 ps-0 shadow-none"
                    type="text"
                    name="state"
                    placeholder="Enter state..."
                    value={collegeData.state}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <div className="d-grid gap-2 mt-5">
                <Button 
                  variant="success" 
                  type="submit" 
                  className="py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Adding Institution...
                    </>
                  ) : (
                    'Add College'
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddCollege;