import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { getMembers } from '../services/dataService';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const data = await getMembers();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMembers = members.filter(member =>
        member.status === 'Active' && (
            member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.business?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="members-page bg-light min-vh-100">
            {/* Header Section */}
            <section className="bg-white py-5 border-bottom">
                <Container>
                    <div className="text-center">
                        <h2 className="display-5 fw-bold text-dark mb-3">Our Valued Members</h2>
                        <div className="mx-auto bg-primary mb-4" style={{ height: '4px', width: '60px' }}></div>
                        <p className="lead text-muted mb-4 max-w-2xl mx-auto">
                            The backbone of LBO. Meet the visionary entrepreneurs shaping our community's future.
                        </p>

                        {/* Search Bar - Clean & Centered */}
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <InputGroup size="lg">
                                    <Form.Control
                                        placeholder="Search member, business, or city..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border-end-0 bg-light"
                                        style={{ fontSize: '0.95rem' }}
                                    />
                                    <InputGroup.Text className="bg-light border-start-0 text-primary">
                                        <i className="fas fa-search"></i>
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <Container className="py-5">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <Row className="g-4">
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map((member) => (
                                <Col key={member.id} md={6} lg={4} xl={3}>
                                    <Card className="h-100 border-0 shadow-sm member-card text-center overflow-hidden">
                                        <div className="card-top-border bg-primary" style={{ height: '4px' }}></div>
                                        <Card.Body className="p-4">
                                            <div className="mb-4 d-inline-block position-relative">
                                                <div className="rounded-circle p-1 border border-2 border-primary border-opacity-25">
                                                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden" style={{ width: '120px', height: '120px' }}>
                                                        {/* Placeholder for real image */}
                                                        <span className="display-4 text-secondary opacity-50 fw-bold">
                                                            {member.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="fw-bold text-dark mb-1">{member.name}</h5>
                                            <p className="text-primary fw-medium small text-uppercase letter-spacing-1 mb-2">
                                                {member.business || 'Entrepreneur'}
                                            </p>

                                            {member.category && (
                                                <Badge bg="light" text="dark" className="fw-normal border mb-3">
                                                    {member.category}
                                                </Badge>
                                            )}

                                            <hr className="my-3 opacity-10" />

                                            <p className="text-muted small mb-0">
                                                <i className="fas fa-map-marker-alt text-danger me-2"></i>
                                                {member.city || 'India'}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center py-5">
                                <h5 className="text-muted">No members found.</h5>
                            </Col>
                        )}
                    </Row>
                )}
            </Container>

            <style>
                {`
                .member-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .member-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
                }
                .letter-spacing-1 {
                    letter-spacing: 1px;
                }
                `}
            </style>
        </div>
    );
};

export default Members;
