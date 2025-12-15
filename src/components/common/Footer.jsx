import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-5 mt-auto">
            <Container>
                <Row className="g-4">
                    <Col md={4}>
                        <h4 className="fw-bold mb-3">LBO</h4>
                        <p className="text-white-50">
                            Empowering the Lingayat business community through connection, collaboration, and growth.
                        </p>
                    </Col>
                    <Col md={2}>
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
                            <li><Link to="/members" className="text-white-50 text-decoration-none">Members</Link></li>
                            <li><Link to="/business" className="text-white-50 text-decoration-none">directory</Link></li>
                            <li><Link to="/events" className="text-white-50 text-decoration-none">Events</Link></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5 className="mb-3">Contact</h5>
                        <ul className="list-unstyled text-white-50">
                            <li>📞 +91 7620054812</li>
                            <li>📞 +91 8999480836</li>
                            <li>✉️  info@lboindia.com</li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5 className="mb-3">Legal</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/privacy" className="text-white-50 text-decoration-none">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-white-50 text-decoration-none">Terms of Service</Link></li>
                        </ul>
                    </Col>
                </Row>
                <hr className="my-4 border-secondary" />
                <div className="text-center text-white-50">
                    <small>&copy; 2025 Lingayat Business Organization. All rights reserved.</small>
                    <div className="mt-2">
                        <small>Designed & Developed by <a href="https://digisahyadri.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline">digisahyadri.com</a></small>
                    </div>
                </div>
            </Container>
        </footer >
    );
};

export default Footer;
