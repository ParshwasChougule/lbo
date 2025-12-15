import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { getEvents } from '../services/dataService';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                // Sort descending by date (newest first) or ascending (upcoming first)
                // Let's do upcoming first
                data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">Events & Gatherings</h2>
                <p className="text-muted">Stay updated with our community meetings and business expos.</p>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row className="g-4">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <Col key={event.id} lg={6}>
                                <Card className="h-100 shadow-sm border-0 flex-row overflow-hidden hover-effect">
                                    <div className="bg-primary text-white p-3 d-flex flex-column justify-content-center text-center" style={{ minWidth: '100px' }}>
                                        <h3 className="mb-0 fw-bold">{new Date(event.date).getDate()}</h3>
                                        <small className="text-uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</small>
                                    </div>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between mb-2">
                                            <Badge bg="info" className="text-dark">{event.type}</Badge>
                                            <small className="text-muted">{formatDate(event.date)}</small>
                                        </div>
                                        <h4 className="card-title fw-bold">{event.title}</h4>
                                        <p className="mb-2 text-dark">📍 {event.location}</p>
                                        <p className="card-text text-muted small line-clamp-2">
                                            {event.description}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <p className="text-muted">No upcoming events scheduled at the moment.</p>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default Events;
