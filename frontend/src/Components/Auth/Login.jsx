import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUserShield, FaArrowRight } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/Auth/login",
        loginData,
        { withCredentials: true }
      );
      localStorage.setItem("UserDetail", JSON.stringify(res.data));
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page-wrapper d-flex align-items-center" style={{ minHeight: '90vh', background: '#f8fafc', padding: '40px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>
            <Card className="border-0 shadow-lg overflow-hidden rounded-4">
              <Row className="g-0">
                {/* Visual Side Panel (Hidden on small screens) */}
                <Col md={5} className="bg-primary d-none d-md-flex align-items-center justify-content-center text-white p-4">
                  <div className="text-center">
                    <FaUserShield size={80} className="mb-4 opacity-75" />
                    <h4 className="fw-bold">Welcome Back!</h4>
                    <p className="small opacity-75">Access the HireLens transparency dashboard and track placement reality.</p>
                  </div>
                </Col>

                {/* Form Side */}
                <Col md={7} className="bg-white p-4 p-lg-5">
                  <div className="mb-4">
                    <h2 className="fw-bold text-dark">Login</h2>
                    <p className="text-muted small">Please enter your credentials to continue.</p>
                  </div>

                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Email Address</Form.Label>
                      <InputGroup className="rounded-3 shadow-sm">
                        <InputGroup.Text className="bg-white border-end-0">
                          <FaEnvelope className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                          className="border-start-0 ps-0 shadow-none"
                          type="email"
                          name="email"
                          placeholder="name@company.com"
                          value={loginData.email}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold">Password</Form.Label>
                      <InputGroup className="rounded-3 shadow-sm">
                        <InputGroup.Text className="bg-white border-end-0">
                          <FaLock className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                          className="border-start-0 ps-0 shadow-none"
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <div className="d-grid gap-2 mb-4">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="py-2 fw-bold rounded-pill shadow-sm"
                        disabled={loading}
                      >
                        {loading ? <Spinner size="sm" /> : <>Secure Login <FaArrowRight className="ms-2" /></>}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="small text-muted mb-0">
                        Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register Now</Link>
                      </p>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Card>

            {/* Bottom Footer Spacing Hint */}
            <div className="mt-4 text-center">
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>
                Secure 256-bit SSL encrypted connection.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .login-page-wrapper {
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .form-control:focus {
          border-color: #dee2e6;
        }
        .input-group-text {
          border-color: #dee2e6;
        }
      `}</style>
    </div>
  );
}

export default Login;