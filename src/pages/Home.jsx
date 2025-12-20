import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Form, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMembers, getBusinesses, getEvents, getSettings } from '../services/dataService';


const Home = () => {
    const [counts, setCounts] = useState({
        members: 0,
        businesses: 0,
        events: 0
    });
    const [displayCounts, setDisplayCounts] = useState({
        members: 0,
        businesses: 0,
        events: 0
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [featuredMembers, setFeaturedMembers] = useState([]);
    const [marqueeText, setMarqueeText] = useState("");
    const [sponsorImages, setSponsorImages] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const membersData = await getMembers();
                const businessesData = await getBusinesses();
                const eventsData = await getEvents();
                const settingsData = await getSettings();

                if (settingsData) {
                    setMarqueeText(settingsData.marqueeText || "");
                    setSponsorImages(settingsData.sponsorImages || []);
                }

                setCounts({
                    members: membersData.length,
                    businesses: businessesData.length,
                    events: eventsData.length
                });

                // Set featured members (random 3)
                if (membersData.length > 0) {
                    const shuffled = [...membersData].sort(() => 0.5 - Math.random());
                    setFeaturedMembers(shuffled.slice(0, 3));
                }

                // Find nearest upcoming event
                const now = new Date();
                const upcoming = eventsData
                    .filter(e => new Date(e.date) >= now)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

                if (upcoming) {
                    setUpcomingEvent(upcoming);
                }

            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    // Animated Counter Effect
    useEffect(() => {
        console.log('Counter effect running. Counts:', counts, 'hasAnimated:', hasAnimated);

        if (counts.members === 0 && counts.businesses === 0 && counts.events === 0) {
            console.log('Skipping animation - data not loaded yet');
            return; // Don't animate if data not loaded yet
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log('Intersection observed:', entry.isIntersecting, 'hasAnimated:', hasAnimated);
                    if (entry.isIntersecting && !hasAnimated) {
                        console.log('Starting counter animation!');
                        setHasAnimated(true);

                        // Animate each counter
                        const animateCounter = (key, target) => {
                            const duration = 2000; // 2 seconds
                            const frameRate = 1000 / 60; // 60 FPS
                            const totalFrames = Math.round(duration / frameRate);
                            let frame = 0;

                            const counter = setInterval(() => {
                                frame++;
                                const progress = frame / totalFrames;
                                const currentValue = Math.round(progress * target);

                                setDisplayCounts(prev => ({ ...prev, [key]: currentValue }));

                                if (frame === totalFrames) {
                                    clearInterval(counter);
                                    setDisplayCounts(prev => ({ ...prev, [key]: target }));
                                }
                            }, frameRate);
                        };

                        // Start animations for all counters
                        animateCounter('members', counts.members);
                        animateCounter('businesses', counts.businesses);
                        animateCounter('events', counts.events);
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }

        return () => {
            if (statsSection) {
                observer.unobserve(statsSection);
            }
        };
    }, [counts, hasAnimated]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="home-page">
            {/* Hero Header */}
            <section className="position-relative overflow-hidden py-5 d-flex align-items-center"
                style={{
                    minHeight: '750px'
                }}
            >
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ objectFit: 'cover', zIndex: -1 }}
                >
                    <source src="/assets/images/banner.mp4" type="video/mp4" />
                </video>

                {/* Modern Gradient Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)', zIndex: 0 }}>
                </div>
                <Container className="position-relative z-1 py-5">
                    <Row className="align-items-center justify-content-center text-center">
                        <Col lg={8} className="mb-4 mb-lg-0" data-aos="fade-up">
                            <h1 className="display-4 fw-bold mb-3 text-white">Grow with unity/together</h1>
                            <p className="lead mb-4 text-white opacity-75">
                                Connect, Collaborate, and Grow together. LBO is the premier platform for Lingayat entrepreneurs to network and expand their horizons.
                            </p>
                            <div className="d-flex gap-3 justify-content-center">
                                <Button as={Link} to="/contact" state={{ type: 'join_lbo' }} variant="light" size="lg" className="px-4 fw-bold text-primary shadow">
                                    Join Now
                                </Button>
                                <Button as={Link} to="/about" variant="outline-light" size="lg" className="px-4">
                                    Learn More
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Scrolling Sponsor Ad / Announcement Bar */}
            {(marqueeText || sponsorImages.length > 0) && (
                <div className="bg-white text-dark py-3 border-bottom overflow-hidden shadow-sm">
                    <Container fluid>
                        <marquee behavior="scroll" direction="left" scrollamount="8" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="d-flex align-items-center gap-5">
                                {marqueeText && <span className="fw-bold lead letter-spacing-1 me-5 text-primary">{marqueeText}</span>}
                                {sponsorImages.map((img, index) => (
                                    <img key={index} src={img} alt="Sponsor" style={{ height: '60px', objectFit: 'contain', margin: '0 30px' }} />
                                ))}
                            </div>
                        </marquee>
                    </Container>
                </div>
            )}

            {/* Key Stats Section */}
            <section className="stats-section bg-white">
                <Container>
                    <Row className="g-4">
                        <Col md={4} data-aos="fade-up" data-aos-delay="100">
                            <div className="stat-card">
                                <div className="stat-icon blue">
                                    <i className="fas fa-users"></i>
                                </div>
                                <h2><span className="count">{displayCounts.members}</span><span className="plus">+</span></h2>
                                <p>Active Members</p>
                            </div>
                        </Col>
                        <Col md={4} data-aos="fade-up" data-aos-delay="200">
                            <div className="stat-card">
                                <div className="stat-icon green">
                                    <i className="fas fa-building"></i>
                                </div>
                                <h2><span className="count">{displayCounts.businesses}</span><span className="plus">+</span></h2>
                                <p>Registered Businesses</p>
                            </div>
                        </Col>
                        <Col md={4} data-aos="fade-up" data-aos-delay="300">
                            <div className="stat-card">
                                <div className="stat-icon orange">
                                    <i className="fas fa-calendar-check"></i>
                                </div>
                                <h2><span className="count">{displayCounts.events}</span><span className="plus">+</span></h2>
                                <p>Successful Events</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* About LBO Section (Brief) */}
            <section className="py-5 bg-white">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <img src="https://via.placeholder.com/500x300?text=About+LBO" className="img-fluid rounded shadow" alt="About LBO" />
                        </Col>
                        <Col lg={6} className="mt-4 mt-lg-0">
                            <h2 className="fw-bold mb-3">About LBO</h2>
                            <p className="text-muted">
                                The Lingayat Business Organization (LBO) is dedicated to the economic and professional development of the community. We strictly adhere to ethical business practices and aim to build a strong support system for startups and established businesses alike.
                            </p>
                            <ul className="list-unstyled mb-4">
                                <li className="mb-2">✅ Promoting Ethical Business</li>
                                <li className="mb-2">✅ Mentorship Programs</li>
                                <li className="mb-2">✅ Access to wider markets</li>
                            </ul>
                            <Button as={Link} to="/about" variant="outline-dark">Read More About Us</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Featured Members Section */}
            <section className="py-5" style={{
                background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/assets/images/members-bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Meet Our Members</h2>
                        <p className="text-muted">Connect with the entrepreneurs driving our community forward.</p>
                    </div>
                    <Row className="g-4 mb-5">
                        {featuredMembers.length > 0 ? (
                            featuredMembers.map((member) => (
                                <Col key={member.id} md={6} lg={4}>
                                    <Card className="h-100 shadow-sm border-0 hover-effect text-center p-3">
                                        <Card.Body>
                                            <div className="rounded-circle bg-light border d-inline-flex align-items-center justify-content-center mb-3 overflow-hidden" style={{ width: '70px', height: '70px' }}>
                                                {member.img ? (
                                                    <img src={member.img} alt={member.name} className="w-100 h-100 object-fit-cover" />
                                                ) : (
                                                    <span style={{ fontSize: '1.5rem' }}>👤</span>
                                                )}
                                            </div>
                                            <h5 className="card-title fw-bold">{member.name}</h5>
                                            <p className="text-primary mb-1 fw-bold small">{member.business}</p>
                                            <p className="text-muted small">📍 {member.city}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center"><p>No members joined yet.</p></Col>
                        )}
                    </Row>
                    <div className="text-center">
                        <Button as={Link} to="/members" variant="primary" className="rounded-pill px-4">
                            View All Members
                        </Button>
                    </div>
                </Container>
            </section>


            {/* Upcoming Event Highlight */}
            <section className="py-5 bg-primary text-white">
                <Container>
                    <Row className="align-items-center">
                        <Col md={8}>
                            {upcomingEvent ? (
                                <>
                                    <h2 className="mb-2">📅 Upcoming Event: {upcomingEvent.title}</h2>
                                    <p className="mb-0 opacity-75">
                                        Join us on {formatDate(upcomingEvent.date)} at {upcomingEvent.location}. {upcomingEvent.description}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h2 className="mb-2">📅 Upcoming Events</h2>
                                    <p className="mb-0 opacity-75">Stay tuned for our next big community gathering!</p>
                                </>
                            )}
                        </Col>
                        <Col md={4} className="text-md-end mt-3 mt-md-0">
                            <Button as={Link} to="/events" variant="light" size="lg" className="rounded-pill">
                                View Details
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Vision & Mission */}
            <section className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Our Purpose</h2>
                        <p className="text-muted">Why we exist and where we are going</p>
                    </div>
                    <Row className="g-4">
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="display-5 mb-3">🎯</div>
                                    <h3 className="h4 card-title">Our Vision</h3>
                                    <p className="card-text text-muted">
                                        To be the leading global platform for Lingayat entrepreneurs, fostering a culture of innovation, ethics, and mutual growth.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="display-5 mb-3">🚀</div>
                                    <h3 className="h4 card-title">Our Mission</h3>
                                    <p className="card-text text-muted">
                                        To connect every Lingayat business owner, provide mentorship, and create opportunities for economic empowerment within the community.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Testimonials Section */}
            <section className="py-5 bg-white">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">What Our Members Say</h2>
                        <p className="text-muted">Real stories of growth and connection.</p>
                    </div>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <Carousel indicators={true} className="pb-5" variant="dark">
                                <Carousel.Item>
                                    <div className="p-4">
                                        <div className="mb-3 text-primary">
                                            <i className="fas fa-quote-left fa-2x"></i>
                                        </div>
                                        <h4 className="fst-italic fw-light mb-4">"Joining LBO gave my textile business the exposure it needed. The networking opportunities are unmatched."</h4>
                                        <h5 className="fw-bold mb-0">Amit Patil</h5>
                                        <small className="text-muted">CEO, Patil Textiles</small>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="p-4">
                                        <div className="mb-3 text-primary">
                                            <i className="fas fa-quote-left fa-2x"></i>
                                        </div>
                                        <h4 className="fst-italic fw-light mb-4">"The mentorship I received here helped me scale my startup from a team of 2 to 20 in just a year."</h4>
                                        <h5 className="fw-bold mb-0">Sneha K.</h5>
                                        <small className="text-muted">Founder, TechSpace Solutions</small>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="p-4">
                                        <div className="mb-3 text-primary">
                                            <i className="fas fa-quote-left fa-2x"></i>
                                        </div>
                                        <h4 className="fst-italic fw-light mb-4">"It's not just about business; it's about the values. Dasoha and Kayaka are truly practiced here."</h4>
                                        <h5 className="fw-bold mb-0">Dr. Ramesh B.</h5>
                                        <small className="text-muted">Director, GreenLife Agro</small>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Contact Section */}
            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Get In Touch</h2>
                        <p className="text-muted">Have questions? We'd love to hear from you.</p>
                    </div>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm p-4">
                                <Form>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Control placeholder="Your Name" />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Control placeholder="Your Email" />
                                        </Col>
                                        <Col md={12}>
                                            <Form.Control placeholder="Subject" />
                                        </Col>
                                        <Col md={12}>
                                            <Form.Control as="textarea" rows={4} placeholder="Message" />
                                        </Col>
                                        <Col md={12} className="text-center">
                                            <Button variant="primary" className="rounded-pill px-5">Send Message</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
