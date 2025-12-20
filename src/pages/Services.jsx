import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
    return (
        <div className="services-page">
            {/* Hero Header */}
            <section className="bg-primary text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #FF6600 0%, #FF8C00 100%)' }}>
                <Container>
                    <h1 className="display-4 fw-bold mb-3">Our Services</h1>
                    <p className="lead opacity-75">Empowering your business journey with dedicated support and resources.</p>
                </Container>
            </section>

            {/* Financial & Legal Support Section */}
            <section className="py-5 bg-light">
                <Container>
                    <div className="section-title text-center mb-5">
                        <h2 className="fw-bold text-dark">💰 Financial & Legal Support</h2>
                        <p className="text-muted">Comprehensive guidance for the fiscal and legal health of your business.</p>
                    </div>

                    <Row className="g-4">
                        {/* Finance Assistance */}
                        <Col md={6} data-aos="fade-right">
                            <Card className="h-100 border-0 shadow-sm service-card">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="service-icon-wrapper bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                                            <i className="fas fa-chart-line fa-2x"></i>
                                        </div>
                                        <h3 className="h4 fw-bold mb-0">Finance Assistance</h3>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-check-circle text-success mt-1 me-2"></i>
                                            <div>
                                                <strong>Loan & Funding Guidance:</strong> Expert advice on securing capital for growth.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-check-circle text-success mt-1 me-2"></i>
                                            <div>
                                                <strong>Bank Tie-ups:</strong> Exclusive information on banking partnerships and offers.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-check-circle text-success mt-1 me-2"></i>
                                            <div>
                                                <strong>Govt Schemes for MSME:</strong> Assistance in navigating and applying for government benefits.
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Legal & Compliance Help */}
                        <Col md={6} data-aos="fade-left">
                            <Card className="h-100 border-0 shadow-sm service-card">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="service-icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                            <i className="fas fa-balance-scale fa-2x"></i>
                                        </div>
                                        <h3 className="h4 fw-bold mb-0">Legal & Compliance Help</h3>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                                            <div>
                                                <strong>Company Registration:</strong> Step-by-step guidance for setting up your legal entity.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                                            <div>
                                                <strong>GST / ITR Help:</strong> Support for tax filing and compliance matters.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-check-circle text-primary mt-1 me-2"></i>
                                            <div>
                                                <strong>Legal Consultation:</strong> Easy booking for professional legal advice.
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Women & Youth Empowerment Section */}
            <section className="py-5 bg-white">
                <Container>
                    <div className="section-title text-center mb-5">
                        <h2 className="fw-bold text-dark">👩‍💼 Women Win</h2>
                        <p className="text-muted">Fostering the next generation of leaders and inclusive growth.</p>
                    </div>

                    <Row className="g-4">
                        {/* Women Entrepreneurs Wing */}
                        <Col md={6} data-aos="fade-right">
                            <Card className="h-100 border-0 shadow-sm service-card">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="service-icon-wrapper bg-danger bg-opacity-10 text-danger rounded-circle p-3 me-3">
                                            <i className="fas fa-female fa-2x"></i>
                                        </div>
                                        <h3 className="h4 fw-bold mb-0">Women Entrepreneurs Wing</h3>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-star text-danger mt-1 me-2"></i>
                                            <div>
                                                <strong>Women-Owned Directory:</strong> A dedicated space to showcase businesses led by women.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-star text-danger mt-1 me-2"></i>
                                            <div>
                                                <strong>Special Training:</strong> Skill development programs tailored for women entrepreneurs.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-star text-danger mt-1 me-2"></i>
                                            <div>
                                                <strong>Success Stories:</strong> Highlighting inspiring journeys to motivate others.
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Youth & Startup Cell */}
                        <Col md={6} data-aos="fade-left">
                            <Card className="h-100 border-0 shadow-sm service-card">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="service-icon-wrapper bg-warning bg-opacity-10 text-warning rounded-circle p-3 me-3">
                                            <i className="fas fa-rocket fa-2x"></i>
                                        </div>
                                        <h3 className="h4 fw-bold mb-0">Youth & Startup Cell</h3>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-lightbulb text-warning mt-1 me-2"></i>
                                            <div>
                                                <strong>Student Support:</strong> Mentorship and resources for aspiring student entrepreneurs.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-lightbulb text-warning mt-1 me-2"></i>
                                            <div>
                                                <strong>Startup Showcase:</strong> A platform to present innovative ideas to the community.
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="fas fa-lightbulb text-warning mt-1 me-2"></i>
                                            <div>
                                                <strong>Internships:</strong> Connecting youth with practical opportunities in established member businesses.
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Services;
