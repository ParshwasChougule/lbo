import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addEvent, updateEvent } from '../../services/dataService';

const AddEvent = ({ onEventAdded, onCancel, editMode = false, eventData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        type: 'Event',
        description: '',
        location: '',
        status: 'Scheduled'
    });
    const [loading, setLoading] = useState(false);

    // Pre-fill form if in edit mode
    useEffect(() => {
        if (editMode && eventData) {
            setFormData({
                title: eventData.title || '',
                date: eventData.date || '',
                type: eventData.type || 'Event',
                description: eventData.description || '',
                location: eventData.location || '',
                status: eventData.status || 'Scheduled'
            });
        }
    }, [editMode, eventData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editMode && eventData) {
                // Update existing event
                await updateEvent(eventData.id, formData);
                alert('Event Updated Successfully!');
            } else {
                // Add new event
                await addEvent(formData);
                alert('Event Added Successfully!');
            }
            setFormData({ title: '', date: '', type: 'Event', description: '', location: '', status: 'Scheduled' });
            if (onEventAdded) onEventAdded();
        } catch (error) {
            console.error(`Error ${editMode ? 'updating' : 'adding'} event:`, error);
            alert(`Failed to ${editMode ? 'update' : 'add'} event.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 border rounded bg-light mb-4">
            <div className="d-flex justify-content-between mb-3">
                <h5>{editMode ? 'Edit Event' : 'Schedule New Event / Meeting'}</h5>
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
                        {loading ? (editMode ? 'Updating...' : 'Scheduling...') : (editMode ? 'Update Event' : 'Schedule Event')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddEvent;
