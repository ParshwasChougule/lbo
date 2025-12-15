import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getChapters } from '../services/dataService';

const Chapters = () => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const data = await getChapters();
                setChapters(data);
            } catch (error) {
                console.error("Error fetching chapters", error);
            }
        };
        fetchChapters();
    }, []);
    return (
        <div className="chapters-page">
            {/* Hero Section */}
            <section className="position-relative py-5 text-white overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #FF6600 0%, #FF8C00 100%)',
                    minHeight: '400px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div className="position-absolute w-100 h-100" style={{ background: 'url(/assets/images/pattern.png) repeat', opacity: 0.1 }}></div>
                <Container className="position-relative z-1 text-center">
                    <span className="badge bg-white text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">NETWORK</span>
                    <h1 className="display-3 fw-bold mb-3">Our Expanding Footprint</h1>
                    <p className="lead opacity-90 mx-auto" style={{ maxWidth: '700px' }}>
                        Empowering Lingayat entrepreneurs across regions. Connect with a local chapter to access mentorship, trade opportunities, and community support.
                    </p>
                </Container>
            </section>

            {/* Stats Overview */}
            <section className="py-4 bg-white shadow-sm position-relative" style={{ marginTop: '-50px', zIndex: 10 }}>
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md={3} className="border-end border-light">
                            <h2 className="fw-bold text-primary mb-0">12+</h2>
                            <p className="text-muted small text-uppercase fw-bold mb-0">Active Chapters</p>
                        </Col>
                        <Col md={3} className="border-end border-light">
                            <h2 className="fw-bold text-primary mb-0">5,000+</h2>
                            <p className="text-muted small text-uppercase fw-bold mb-0">Community Members</p>
                        </Col>
                        <Col md={3}>
                            <h2 className="fw-bold text-primary mb-0">3</h2>
                            <p className="text-muted small text-uppercase fw-bold mb-0">States Covered</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Chapters List */}
            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5 pt-4">
                        <h5 className="text-primary fw-bold text-uppercase letter-spacing-2 small">Find Your Community</h5>
                        <h2 className="fw-bold">Explore Our Chapters</h2>
                        <div className="bg-primary mx-auto mt-3" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
                    </div>

                    <Row className="g-4">
                        {chapters.map((chapter, idx) => (
                            <Col md={6} lg={4} key={chapter.id || idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                                <Card className="h-100 border-0 shadow-sm hover-effect rounded-4 overflow-hidden">
                                    <div className="position-relative">
                                        <Card.Img variant="top" src={chapter.img || `https://via.placeholder.com/400x250?text=${chapter.name}`} alt={chapter.name} style={{ height: '200px', objectFit: 'cover' }} />
                                        <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-to-t" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                            <h4 className="text-white fw-bold mb-0">{chapter.name} Chapter</h4>
                                        </div>
                                    </div>
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.75rem' }}>Chapter Head</small>
                                                <span className="fw-bold text-dark">{chapter.leadership?.president || 'TBD'}</span>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.75rem' }}>Strength</small>
                                                <span className="badge bg-primary-light text-primary rounded-pill px-3">
                                                    {chapter.stats?.activeMembers || 0}+
                                                </span>
                                            </div>
                                        </div>
                                        <hr className="opacity-10 my-3" />
                                        <div className="d-grid">
                                            <Button as={Link} to={`/chapters/${chapter.id}`} variant="outline-primary" className="rounded-pill fw-bold">
                                                View Details
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                        {chapters.length === 0 && (
                            <div className="text-center py-5">
                                <p className="text-muted">Loading chapters...</p>
                            </div>
                        )}
                    </Row>
                </Container>
            </section>

            {/* Simple CTA */}
            <section className="py-5 bg-white">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <Card className="bg-primary text-white border-0 shadow-lg rounded-4 overflow-hidden">
                                <Card.Body className="p-5 text-center position-relative">
                                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                                    <h2 className="fw-bold mb-3 position-relative z-1">Want to start a new Chapter?</h2>
                                    <p className="lead mb-4 position-relative z-1 opacity-90">
                                        Lead the change in your city. We provide the framework, you provide the leadership.
                                    </p>
                                    <Button as={Link} to="/contact" state={{ type: 'new_chapter' }} variant="light" size="lg" className="rounded-pill px-5 shadow position-relative z-1 text-primary fw-bold">
                                        Apply to Lead
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Chapters;
