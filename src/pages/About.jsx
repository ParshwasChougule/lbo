import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-page">
            {/* 1. Hero Header - Clean & Professional */}
            <section className="position-relative py-5 text-white overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #FF6600 0%, #FF8C00 100%)',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {/* Decorative circles */}
                <div className="position-absolute top-0 end-0 opacity-10 translate-middle-y"
                    style={{ width: '300px', height: '300px', borderRadius: '50%', background: 'white', marginRight: '-100px' }}></div>
                <div className="position-absolute bottom-0 start-0 opacity-10 translate-middle-x"
                    style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'white', marginLeft: '-50px', marginBottom: '-50px' }}></div>

                <Container className="position-relative z-1 text-center">
                    <h1 className="display-3 fw-bold mb-3">About LBO</h1>
                    <p className="lead opacity-90 mx-auto" style={{ maxWidth: '700px' }}>
                        Empowering the Lingayat Community through Business, Ethics, and Unity.
                    </p>
                </Container>
            </section>

            {/* 2. Who We Are Section */}
            <section className="py-5 bg-white">
                <Container className="py-lg-4">
                    <Row className="align-items-center gx-5">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <div className="position-relative ps-4 pt-4">
                                <div className="position-absolute top-0 start-0 bg-primary rounded" style={{ width: '60px', height: '60px', opacity: 0.1 }}></div>
                                <img src="https://via.placeholder.com/600x500?text=About+Our+Community" alt="LBO Community Meeting" className="img-fluid rounded-3 shadow-sm position-relative z-1" />
                                <div className="position-absolute bottom-0 end-0 bg-secondary rounded" style={{ width: '100px', height: '100px', opacity: 0.1, marginRight: '-20px', marginBottom: '-20px' }}></div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <h5 className="text-primary fw-bold text-uppercase letter-spacing-2 small mb-2">Who We Are</h5>
                            <h2 className="display-6 fw-bold mb-4">Uniting Lingayat Entrepreneurs for a Prosperous Future</h2>
                            <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                                The Lingayat Business Organization (LBO) is a premier global platform dedicated to connecting, mentoring, and empowering business owners, professionals, and startups within the Lingayat community.
                            </p>
                            <p className="text-muted mb-4">
                                Rooted in the principles of "Kayaka" (Work is Worship) and "Dasoha" (Giving Back), LBO strives to create an ecosystem where business growth goes hand-in-hand with social responsibility. We believe that economic strength is the foundation of community development.
                            </p>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary-light text-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <span className="fw-semibold">Fostering Ethical Business Practices</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary-light text-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <span className="fw-semibold">Building Strong Professional Networks</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary-light text-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <span className="fw-semibold">Supporting Youth & Women Entrepreneurs</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 3. Vision & Mission Cards */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="g-4 text-center">
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm overflow-hidden hover-top">
                                <Card.Body className="p-5">
                                    <div className="mb-4 d-inline-block p-4 rounded-circle bg-white shadow-sm text-primary display-4">
                                        <i className="fas fa-eye"></i>
                                    </div>
                                    <h3 className="fw-bold mb-3">Our Vision</h3>
                                    <p className="text-muted lead fs-6">
                                        "To ignite a global economic renaissance within the Lingayat community by cultivating a world-class network of entrepreneurs who lead with integrity, innovation, and inclusivity."
                                    </p>
                                </Card.Body>
                                <div className="bg-primary py-2"></div>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm overflow-hidden hover-top">
                                <Card.Body className="p-5">
                                    <div className="mb-4 d-inline-block p-4 rounded-circle bg-white shadow-sm text-secondary display-4">
                                        <i className="fas fa-rocket"></i>
                                    </div>
                                    <h3 className="fw-bold mb-3">Our Mission</h3>
                                    <ul className="text-start text-muted list-unstyled mx-auto" style={{ maxWidth: '400px' }}>
                                        <li className="mb-2"><i className="fas fa-angle-right text-primary me-2"></i> To provide mentorship and capital access to startups.</li>
                                        <li className="mb-2"><i className="fas fa-angle-right text-primary me-2"></i> To facilitate global trade opportunities for members.</li>
                                        <li className="mb-2"><i className="fas fa-angle-right text-primary me-2"></i> To preserve and promote the ethos of Kayaka & Dasoha.</li>
                                    </ul>
                                </Card.Body>
                                <div className="bg-secondary py-2"></div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 4. Core Values / Principles */}
            <section className="py-5 bg-white">
                <Container className="py-lg-4">
                    <div className="text-center mb-5">
                        <h5 className="text-primary fw-bold text-uppercase letter-spacing-2 small">Our Foundation</h5>
                        <h2 className="fw-bold">Core Principles</h2>
                        <div className="bg-primary mx-auto mt-3" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
                    </div>

                    <Row className="g-4">
                        {[
                            { icon: 'fa-hand-holding-heart', title: 'Dasoha (Giving)', desc: 'We believe that the ultimate fruit of labor is to give back to society and uplift the underprivileged.' },
                            { icon: 'fa-briefcase', title: 'Kayaka (Work)', desc: 'Work is divinity. We encourage excellence, hard work, and dedication in every business endeavor.' },
                            { icon: 'fa-users', title: 'Unity', desc: 'Strength lies in togetherness. Unlike competitors, we are collaborators lifting each other up.' },
                            { icon: 'fa-balance-scale', title: 'Integrity', desc: 'Ethical conduct is the cornerstone of trust. We advocate for complete transparency and honesty.' }
                        ].map((item, idx) => (
                            <Col md={6} lg={3} key={idx}>
                                <Card className="h-100 border-0 shadow-sm text-center p-3 hover-effect">
                                    <Card.Body>
                                        <div className="text-primary display-5 mb-3">
                                            <i className={`fas ${item.icon}`}></i>
                                        </div>
                                        <h5 className="fw-bold mb-3">{item.title}</h5>
                                        <p className="text-muted small">{item.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* 5. Founder's Message / Leadership (Optional Placeholder) */}
            {/* 5. Leadership / Founder's Message (Carousel) */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <Carousel indicators={true} controls={false} interval={5000} className="pb-5">
                                {/* Slide 1: President */}
                                <Carousel.Item>
                                    <div className="px-md-5">
                                        <i className="fas fa-quote-left text-primary display-3 opacity-25 mb-4"></i>
                                        <h3 className="fw-light fst-italic mb-4">
                                            "Our goal is not just to build businesses, but to build a community that stands tall on the pillars of economic independence and social welfare. Let us grow together."
                                        </h3>
                                        <div className="d-flex align-items-center justify-content-center mt-4">
                                            <div className="bg-secondary rounded-circle me-3" style={{ width: '60px', height: '60px' }}>
                                                {/* Placeholder for Founder Image */}
                                                <img src="https://via.placeholder.com/60" alt="Sachin Hatti" className="rounded-circle" />
                                            </div>
                                            <div className="text-start">
                                                <h5 className="fw-bold mb-0">Sachin Hatti</h5>
                                                <small className="text-muted">President, LBO</small>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>

                                {/* Slide 2: Secretary (Placeholder / "Ajun Ek") */}
                                <Carousel.Item>
                                    <div className="px-md-5">
                                        <i className="fas fa-quote-left text-primary display-3 opacity-25 mb-4"></i>
                                        <h3 className="fw-light fst-italic mb-4">
                                            "Unity is our greatest asset. By supporting each other's ventures and sharing knowledge, we can overcome any challenge and build a legacy for future generations."
                                        </h3>
                                        <div className="d-flex align-items-center justify-content-center mt-4">
                                            <div className="bg-secondary rounded-circle me-3" style={{ width: '60px', height: '60px' }}>
                                                {/* Placeholder for Leader Image */}
                                                <img src="https://via.placeholder.com/60" alt="Leader Name" className="rounded-circle" />
                                            </div>
                                            <div className="text-start">
                                                <h5 className="fw-bold mb-0">basavarag halakude </h5>
                                                <small className="text-muted">Secretary, LBO</small>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 6. Call to Action */}
            <section className="py-5 bg-primary text-white text-center">
                <Container>
                    <h2 className="fw-bold mb-3">Be Part of the Movement</h2>
                    <p className="lead mb-4 opacity-75">Connect with thousands of like-minded entrepreneurs today.</p>
                    <Button as={Link} to="/register" variant="light" size="lg" className="px-5 rounded-pill shadow fw-bold text-primary">
                        Become a Member
                    </Button>
                </Container>
            </section>
        </div>
    );
};

export default About;
