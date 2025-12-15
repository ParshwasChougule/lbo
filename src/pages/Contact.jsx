import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Contact = () => {
    const location = useLocation();
    const isNewChapterRequest = location.state?.type === 'new_chapter';
    const isJoinRequest = location.state?.type === 'join_lbo';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: isNewChapterRequest ? 'Application to Start a New Chapter' : (isJoinRequest ? 'Membership Inquiry' : ''),
        message: '',
        city: '',
        experience: ''
    });

    useEffect(() => {
        if (isNewChapterRequest) {
            setFormData(prev => ({
                ...prev,
                subject: 'Application to Start a New Chapter'
            }));
        } else if (isJoinRequest) {
            setFormData(prev => ({
                ...prev,
                subject: 'Membership Inquiry'
            }));
        }
    }, [isNewChapterRequest, isJoinRequest]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict phone input to numeric only
        if (name === 'phone') {
            if (/^\d*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://formsubmit.co/ajax/info@lboindia.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    subject: formData.subject || "New Inquiry from Website",
                    message: isNewChapterRequest
                        ? `Proposed City: ${formData.city}\nExperience: ${formData.experience}\n\nMessage: ${formData.message}`
                        : formData.message,
                    _template: 'table',
                    _subject: `New Inquiry: ${formData.subject || 'General'}`,
                    _captcha: 'false',
                    // Add extra fields for email visibility if supported or appended to message
                    "Proposed City": isNewChapterRequest ? formData.city : undefined,
                })
            });

            if (response.ok) {
                alert("Thank you! Your message has been sent successfully.");
                setFormData({ name: '', email: '', phone: '', subject: '', message: '', city: '', experience: '' });
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error sending your message.");
        }
    };

    return (
        <div className="contact-page">
            {/* Hero Header */}
            <section className="position-relative py-5 text-white overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #FF6600 0%, #FF8C00 100%)',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div className="position-absolute w-100 h-100" style={{ background: 'url(/assets/images/pattern.png) repeat', opacity: 0.1 }}></div>
                <Container className="position-relative z-1 text-center">
                    <h1 className="display-3 fw-bold mb-3">{isNewChapterRequest ? 'Start a New Chapter' : (isJoinRequest ? 'Join LBO Network' : 'Contact Us')}</h1>
                    <p className="lead opacity-90 mx-auto" style={{ maxWidth: '700px' }}>
                        {isNewChapterRequest
                            ? 'Ready to lead? Fill out the form below to apply for a new chapter in your city.'
                            : (isJoinRequest
                                ? 'Become a part of the fastest-growing business community. Fill out the form to inquire about membership.'
                                : "We'd love to hear from you. Reach out to us for any queries or collaborations.")}
                    </p>
                </Container>
            </section>

            <section className="py-5 bg-light">
                <Container>
                    <Row className="g-4">
                        {/* Left Column: Contact Info & Map */}
                        <Col lg={4}>
                            {/* Contact Info Card */}
                            <Card className="border-0 shadow-sm rounded-4 mb-4">
                                <Card.Body className="p-4">
                                    <h3 className="fw-bold mb-4">Contact Info</h3>

                                    {/* Phone */}
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 text-white"
                                            style={{ width: '50px', height: '50px', backgroundColor: '#3b82f6' }}>
                                            <i className="fas fa-phone-alt fs-5"></i>
                                        </div>
                                        <div className="ms-3">
                                            <div className="fw-bold text-dark">Phone</div>
                                            <div className="text-muted">+91 8999480836</div>
                                            <div className="text-muted">+91 7620054812</div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 text-white"
                                            style={{ width: '50px', height: '50px', backgroundColor: '#a855f7' }}>
                                            <i className="fas fa-envelope fs-5"></i>
                                        </div>
                                        <div className="ms-3">
                                            <div className="fw-bold text-dark">Email</div>
                                            <div className="text-muted">info@lboindia.com</div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 text-white"
                                            style={{ width: '50px', height: '50px', backgroundColor: '#22c55e' }}>
                                            <i className="fas fa-map-marker-alt fs-5"></i>
                                        </div>
                                        <div className="ms-3">
                                            <div className="fw-bold text-dark">Address</div>
                                            <div className="text-muted small">
                                                Shivaji Nagar, Sangli,<br />
                                                Maharashtra - 416416
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4 opacity-10" />

                                    {/* Follow Us */}
                                    <h5 className="fw-bold mb-3">Follow Us</h5>
                                    <div className="d-flex gap-2">
                                        <a href="#" className="d-flex align-items-center justify-content-center text-white rounded-3 text-decoration-none"
                                            style={{ width: '40px', height: '40px', backgroundColor: '#1877f2' }}>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#" className="d-flex align-items-center justify-content-center text-white rounded-3 text-decoration-none"
                                            style={{ width: '40px', height: '40px', backgroundColor: '#1da1f2' }}>
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#" className="d-flex align-items-center justify-content-center text-white rounded-3 text-decoration-none"
                                            style={{ width: '40px', height: '40px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a href="#" className="d-flex align-items-center justify-content-center text-white rounded-3 text-decoration-none"
                                            style={{ width: '40px', height: '40px', backgroundColor: '#0a66c2' }}>
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Location Card */}
                            <Card className="border-0 shadow-sm rounded-4">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center">
                                        <i className="fas fa-map-marker-alt text-danger me-2"></i>
                                        Our Location
                                    </h5>
                                    <div className="rounded-3 overflow-hidden" style={{ height: '300px' }}>
                                        <iframe
                                            title="LBO Location"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61094.96076274271!2d74.54290046619134!3d16.85436033550144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc10c8187f060eb%3A0x37911f53cdc1ddb3!2sSangli%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1765723072181!5m2!1sen!2sin"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Right Column: Contact Form */}
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm rounded-4 h-100">
                                <Card.Body className="p-4 p-md-5">
                                    <h3 className="fw-bold mb-2">{isNewChapterRequest ? 'Chapter Application Form' : (isJoinRequest ? 'Membership Inquiry Form' : 'Send us a Message')}</h3>
                                    <p className="text-muted mb-4">{isNewChapterRequest ? 'Please provide details about the city and your background.' : (isJoinRequest ? 'Let us know how we can help you grow your business.' : 'We will get back to you within 24 hours.')}</p>
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Group controlId="formName">
                                                    <Form.Label className="fw-medium">Your Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-light border-0 py-2 rounded-3"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formPhone">
                                                    <Form.Label className="fw-medium">Phone Number</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        className="bg-light border-0 py-2 rounded-3"
                                                        maxLength={10}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            {isNewChapterRequest && (
                                                <Col md={12}>
                                                    <Form.Group controlId="formCity">
                                                        <Form.Label className="fw-medium">Proposed Chapter City *</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Which city do you want to start a chapter in?"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            required
                                                            className="bg-light border-0 py-2 rounded-3"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            )}

                                            <Col md={12}>
                                                <Form.Group controlId="formEmail">
                                                    <Form.Label className="fw-medium">Email Address</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-light border-0 py-2 rounded-3"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group controlId="formSubject">
                                                    <Form.Label className="fw-medium">Subject</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="What is this regarding?"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                        // Disable subject edit if it's a chapter request to keep it consistent
                                                        // readOnly={isNewChapterRequest}
                                                        // User might want to tweak it, let's allow edit but prefill
                                                        className="bg-light border-0 py-2 rounded-3"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group controlId="formMessage">
                                                    <Form.Label className="fw-medium">{isNewChapterRequest ? 'Brief Background / Leadership Experience' : 'Message'}</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={6}
                                                        placeholder={isNewChapterRequest ? "Tell us about your business background and why you want to lead a chapter..." : (isJoinRequest ? "Tell us about your business and why you'd like to join LBO..." : "Type your message here...")}
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-light border-0 py-2 rounded-3"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} className="mt-4">
                                                <Button variant="primary" type="submit" size="lg" className="w-100 rounded-pill shadow-sm py-2">
                                                    {isNewChapterRequest ? 'Submit Application' : (isJoinRequest ? 'Submit Inquiry' : 'Send Message')}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Contact;
