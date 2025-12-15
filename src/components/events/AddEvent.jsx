import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addEvent } from '../../services/dataService';

const AddEvent = ({ onEventAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        type: 'Event',
        description: '',
        location: '',
        status: 'Scheduled'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addEvent(formData);
            alert('Event Added Successfully!');
            setFormData({ title: '', date: '', type: 'Event', description: '', location: '', status: 'Scheduled' });
            if (onEventAdded) onEventAdded();
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Failed to add event.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 border rounded bg-light mb-4">
            <div className="d-flex justify-content-between mb-3">
                <h5>Schedule New Event / Meeting</h5>
                <Button variant="outline-secondary" size="sm" onClick={onCancel}>Cancel</Button>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control name="title" value={formData.title} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Select name="type" value={formData.type} onChange={handleChange}>
                                <option value="Event">Event</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Webinar">Webinar</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control name="location" value={formData.location} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Description / Agenda</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-3">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Scheduling...' : 'Schedule Event'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddEvent;
