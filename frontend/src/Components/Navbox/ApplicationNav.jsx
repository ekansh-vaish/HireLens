import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaPlusCircle, FaUniversity, FaBuilding, FaSignInAlt, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

function ApplicationNav() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const userDetail = JSON.parse(localStorage.getItem("UserDetail"));

  async function FetchRecords() {
    try {
      const res = await axios.get("https://hirelens-9o7y.onrender.com/placementrecord/getrecords", {
        withCredentials: true
      });
      setRecords(res.data.FetchRecord || []);
    } catch (err) {
      console.log("Error fetching records:", err);
    }
  }

  useEffect(() => {
    if (!userDetail?.payload) {
      navigate("/home");
    } else {
      FetchRecords();
    }
  }, []);

  // 3. Logic: Check karna ki logged-in user ne submit kiya hai ya nahi
  // Hum current user ki ID ko array mein dhoond rahe hain
  const hasSubmitted = records.some((rec) => rec.UserId === userDetail?.payload?.id);

  async function Logout() {
    try {
      await axios.post("https://hirelens-9o7y.onrender.com/Auth/logout", {}, { withCredentials: true });
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className="shadow-sm py-2" 
      style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold fs-3 d-flex align-items-center">
          <FaChartLine className="me-2" />
          <span style={{ letterSpacing: '1px' }}>HireLens</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link as={Link} to="/collegequery" className="px-3">
              <FaUniversity className="me-1 mb-1" /> Colleges
            </Nav.Link>

            {userDetail?.payload.role !== "Admin" && !hasSubmitted && (
              <Nav.Link as={Link} to="/addrecord" className="px-3 text-warning fw-semibold animate-pulse">
                <FaPlusCircle className="me-1 mb-1" /> Add Reality Record
              </Nav.Link>
            )}

            {hasSubmitted && userDetail?.payload.role !== "Admin" && (
              <Nav.Link className="px-3 text-info disabled opacity-75">
                <FaCheckCircle className="me-1 mb-1" /> Record Submitted
              </Nav.Link>
            )}

            {/* Admin Panel logic same rahegi */}
            {userDetail?.payload.role === "Admin" && (
              <NavDropdown title={<span><FaUserShield className="me-1 mb-1" /> Admin Panel</span>} id="admin-nav-dropdown" className="px-2">
                <NavDropdown.Header className="fw-bold text-primary">College Management</NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/addcollege">Add New College</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/collegelist">Manage Colleges</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Header className="fw-bold text-primary">Data & Analytics</NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/collegerecord">Master Records</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/companydata">Company Data Bank</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/addcompany">Register Company</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Header className="fw-bold text-primary">Users Data</NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/users">Users Records</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contactdata">Contact Records</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <Nav className="ms-auto align-items-center mt-2 mt-lg-0">
            {!userDetail ? (
              <Button variant="light" className="rounded-pill px-4 fw-bold text-primary shadow-sm" onClick={() => navigate('/login')}>
                <FaSignInAlt className="me-2" /> Student Login
              </Button>
            ) : (
              <NavDropdown title={userDetail?.payload?.email} id="user-dropdown">
                <NavDropdown.Item>Hi, {userDetail?.payload?.username || 'User'}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={Logout} className="text-danger">Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ApplicationNav;