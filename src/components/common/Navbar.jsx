import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Building2, Factory, Landmark } from 'lucide-react';

const AppNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showChapters, setShowChapters] = useState(false);

    const showDropdown = () => {
        setShowChapters(true);
    };

    const hideDropdown = () => {
        setShowChapters(false);
    };

    return (
        <Navbar expand="lg" fixed="top" className="py-3 navbar-custom">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center">
                    <img src="/assets/images/lbo-logo.png" alt="LBO Logo" height="40" className="me-2" />
                    <span className="text-dark fs-6 opacity-75 border-start ps-2 border-2">Lingayat Business Organization </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="nav-link-custom" active={location.pathname === '/'}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link-custom" active={location.pathname === '/about'}>About</Nav.Link>
                        <Nav.Link as={Link} to="/services" className="nav-link-custom" active={location.pathname === '/services'}>Services</Nav.Link>

                        <NavDropdown
                            title={<span onClick={() => navigate('/chapters')}>Chapters</span>}
                            id="chapters-dropdown"
                            className="nav-link-custom"
                            show={showChapters}
                            onMouseEnter={showDropdown}
                            onMouseLeave={hideDropdown}
                        >
                            <NavDropdown.Item as={Link} to="/chapters/sangli" style={{ fontSize: '1.05rem' }}>
                                <MapPin size={20} className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle', color: '#3b82f6' }} />
                                Sangli Chapter
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/chapters/kolhapur" style={{ fontSize: '1.05rem' }}>
                                <Building2 size={20} className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle', color: '#8b5cf6' }} />
                                Kolhapur Chapter
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/chapters/ichalkaranji" style={{ fontSize: '1.05rem' }}>
                                <Factory size={20} className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle', color: '#f97316' }} />
                                Ichalkaranji Chapter
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/chapters/solapur" style={{ fontSize: '1.05rem' }}>
                                <Landmark size={20} className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle', color: '#10b981' }} />
                                Solapur Chapter
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to="/members" className="nav-link-custom" active={location.pathname === '/members'}>Members</Nav.Link>
                        <Nav.Link as={Link} to="/events" className="nav-link-custom" active={location.pathname === '/events'}>Events</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="nav-link-custom" active={location.pathname === '/contact'}>Contact</Nav.Link>
                        <Button as={Link} to="/contact" state={{ type: 'join_lbo' }} variant="primary" className="ms-lg-3 px-4 rounded-pill btn-hover-effect fw-medium">
                            Join LBO
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
