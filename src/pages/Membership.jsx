import React from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Membership = () => {
    return (
        <div className="membership-page">
            {/* 1. Hero Header */}
            <section className="position-relative py-5 text-white overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #FF6600 0%, #FF8C00 100%)',
                    minHeight: '350px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div className="position-absolute w-100 h-100" style={{ background: 'url(/assets/images/pattern.png) repeat', opacity: 0.1 }}></div>
                <Container className="position-relative z-1 text-center">
                    <h1 className="display-3 fw-bold mb-3">Membership</h1>
                    <p className="lead opacity-90 mx-auto" style={{ maxWidth: '700px' }}>
                        Join the fastest-growing network of Lingayat entrepreneurs and professionals.
                    </p>
                    <div className="mt-4">
                        <Button as={Link} to="/register" variant="light" size="lg" className="px-5 rounded-pill fw-bold text-primary shadow">
                            Apply for Membership
                        </Button>
                    </div>
                </Container>
            </section>

            {/* 2. Why Become a Member? */}
            <section className="py-5 bg-white">
                <Container className="py-lg-4">
                    <div className="text-center mb-5">
                        <h5 className="text-primary fw-bold text-uppercase letter-spacing-2 small">Benefits</h5>
                        <h2 className="fw-bold">Why Join LBO?</h2>
                        <div className="bg-primary mx-auto mt-3" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
                    </div>

                    <Row className="g-4">
                        {[
                            { title: 'Global Networking', desc: 'Connect with thousands of business owners across different industries and geographies.', icon: 'fa-globe' },
                            { title: 'Business Growth', desc: 'Access exclusive trade opportunities, leads, and collaborative ventures within the community.', icon: 'fa-chart-line' },
                            { title: 'Mentorship & Learning', desc: 'Learn from industry veterans through seminars, workshops, and one-on-one mentorship.', icon: 'fa-chalkboard-teacher' },
                            { title: 'Brand Visibility', desc: 'Showcase your business to a targeted audience through our directory and events.', icon: 'fa-bullhorn' },
                            { title: 'Community Support', desc: 'Be part of a support system that practices "Dasoha" - lifting each other up.', icon: 'fa-hands-helping' },
                            { title: 'Exclusive Events', desc: 'Get priority access and discounts to LBO conferences, expos, and meetups.', icon: 'fa-calendar-star' }
                        ].map((item, idx) => (
                            <Col md={6} lg={4} key={idx}>
                                <Card className="h-100 border-0 shadow-sm hover-effect text-center p-4">
                                    <div className="mb-3 mx-auto bg-primary-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', fontSize: '1.75rem' }}>
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <h5 className="fw-bold mb-2">{item.title}</h5>
                                    <p className="text-muted small mb-0">{item.desc}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* 3. Membership Criteria & Plans */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <Card className="border-0 shadow overflow-hidden">
                                <Row className="g-0">
                                    <Col md={5} className="bg-dark text-white p-5 d-flex flex-column justify-content-center align-items-center text-center">
                                        <h3 className="fw-bold mb-3">Life Membership</h3>
                                        <div className="display-2 fw-bold text-primary mb-2">₹5,000</div>
                                        <p className="opacity-75 mb-4">One-time contribution</p>
                                        <Button as={Link} to="/register" variant="primary" size="lg" className="w-100 rounded-pill">
                                            Register Now
                                        </Button>
                                    </Col>
                                    <Col md={7} className="p-5 bg-white">
                                        <h4 className="fw-bold mb-4">What's Included?</h4>
                                        <ul className="list-unstyled">
                                            <li className="mb-3 d-flex align-items-start">
                                                <i className="fas fa-check-circle text-success mt-1 me-3"></i>
                                                <span>Lifetime access to the LBO Member Directory.</span>
                                            </li>
                                            <li className="mb-3 d-flex align-items-start">
                                                <i className="fas fa-check-circle text-success mt-1 me-3"></i>
                                                <span>Free listing of your business profile on the website.</span>
                                            </li>
                                            <li className="mb-3 d-flex align-items-start">
                                                <i className="fas fa-check-circle text-success mt-1 me-3"></i>
                                                <span>Voting rights in annual general meetings.</span>
                                            </li>
                                            <li className="mb-3 d-flex align-items-start">
                                                <i className="fas fa-check-circle text-success mt-1 me-3"></i>
                                                <span>Digital Membership ID Card.</span>
                                            </li>
                                            <li className="mb-3 d-flex align-items-start">
                                                <i className="fas fa-check-circle text-success mt-1 me-3"></i>
                                                <span>Opportunity to hold office bearer positions.</span>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 4. Eligibility */}
            <section className="py-5 bg-white">
                <Container>
                    <div className="text-center mb-5">
                        <h3 className="fw-bold">Who Can Join?</h3>
                        <p className="text-muted">Membership is open to individuals who meet the following criteria</p>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="d-flex align-items-start mb-4">
                                <div className="bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>1</div>
                                <div>
                                    <h5 className="fw-bold">Community Member</h5>
                                    <p className="text-muted">Must belong to the Lingayat community by birth or practice.</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start mb-4">
                                <div className="bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>2</div>
                                <div>
                                    <h5 className="fw-bold">Business / Profession</h5>
                                    <p className="text-muted">Must be an owner, partner, or director of a registered business, or a practicing professional (Doctor, Engineer, CA, Lawyer, etc.).</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start mb-4">
                                <div className="bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>3</div>
                                <div>
                                    <h5 className="fw-bold">Age Criteria</h5>
                                    <p className="text-muted">Must be at least 18 years of age.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 5. FAQ Section */}
            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h3 className="fw-bold">Frequently Asked Questions</h3>
                    </div>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0" className="mb-3 border-0 shadow-sm rounded">
                                    <Accordion.Header>How do I register?</Accordion.Header>
                                    <Accordion.Body>
                                        Click on the "Register Now" button, fill in your personal and business details, upload the required documents, and submit your application.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className="mb-3 border-0 shadow-sm rounded">
                                    <Accordion.Header>Is there a membership fee?</Accordion.Header>
                                    <Accordion.Body>
                                        Yes, there is a one-time life membership fee. Please refer to the pricing section above for current rates.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="mb-3 border-0 shadow-sm rounded">
                                    <Accordion.Header>Can students join?</Accordion.Header>
                                    <Accordion.Body>
                                        We have a separate wing for students under "Youth Empowerment". Please check the Student Membership section for details.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA at Bottom */}
            <section className="py-5 bg-primary text-white text-center">
                <Container>
                    <h2 className="fw-bold mb-3">Ready to Grow?</h2>
                    <p className="lead mb-4 opacity-90">Become a part of the LBO family today.</p>
                    <Button as={Link} to="/register" variant="dark" size="lg" className="px-5 rounded-pill shadow">
                        Join Now
                    </Button>
                </Container>
            </section>
        </div>
    );
};

export default Membership;
