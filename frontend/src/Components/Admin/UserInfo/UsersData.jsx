import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaUsers, FaSearch, FaUniversity, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

function UsersData() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Bhai yahan apni api ka path sahi kar lena
                const res = await axios.get("http://localhost:8080/Auth/users", { withCredentials: true });
                setUsers(res.data.payload || []);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Filter Logic: Naam ya Email se search karne ke liye
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.college?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="py-4">
            {/* Header Section */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark">
                        <FaUsers className="me-2 text-primary" /> User Management
                    </h2>
                    <p className="text-muted small">Manage and view all registered students on HireLens</p>
                </div>
                <div className="mt-2 mt-md-0">
                    <Badge bg="primary" className="px-3 py-2 rounded-pill">
                        Total Users: {users.length}
                    </Badge>
                </div>
            </div>

            {/* Search Bar */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-2">
                    <InputGroup className="border-0">
                        <InputGroup.Text className="bg-transparent border-0 pe-0">
                            <FaSearch className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control 
                            placeholder="Search by name, email or college..." 
                            className="border-0 shadow-none py-2"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>

            {/* Table Section */}
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2 text-muted">Loading user directory...</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <Table hover className="align-middle mb-0">
                            <thead className="bg-light text-secondary">
                                <tr>
                                    <th className="ps-4 py-3 border-0">USER</th>
                                    <th className="py-3 border-0">EMAIL</th>
                                    <th className="py-3 border-0">COLLEGE</th>
                                    <th className="py-3 border-0 text-center">LOCATION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-circle me-3">
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="fw-bold text-dark">{user.username}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center text-muted">
                                                    <FaEnvelope className="me-2 opacity-50" /> {user.email}
                                                </div>
                                            </td>
                                            <td>
                                                {user.college ? (
                                                    <div className="d-flex align-items-center">
                                                        <FaUniversity className="me-2 text-primary opacity-75" />
                                                        <span className="small fw-semibold">{user.college.name}</span>
                                                    </div>
                                                ) : (
                                                    <Badge bg="secondary" className="fw-normal opacity-75">Not Assigned</Badge>
                                                )}
                                            </td>
                                            <td className="text-center text-muted small">
                                                {user.college ? `${user.college.city}, ${user.college.state}` : "—"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted">
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Card>

            <style>{`
                .avatar-circle {
                    width: 35px;
                    height: 35px;
                    background: #e0f2fe;
                    color: #0369a1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-weight: bold;
                    font-size: 0.8rem;
                }
                .table thead th {
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                    font-weight: 700;
                }
                .table tbody tr {
                    transition: all 0.2s;
                }
                .table tbody tr:hover {
                    background-color: #f8fafc !important;
                }
            `}</style>
        </Container>
    );
}

export default UsersData;