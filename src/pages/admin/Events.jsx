import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Row, Col, Badge, Spinner, Modal } from 'react-bootstrap';
import { getEvents, deleteEvent } from '../../services/dataService';
import AddEvent from '../../components/events/AddEvent';
import AdminLayout from '../../components/layout/AdminLayout';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await getEvents();
            // Sort by date usually preferred
            data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventAdded = () => {
        setShowAddForm(false);
        fetchEvents();
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowEditModal(true);
    };

    const handleDelete = async (eventId, eventTitle) => {
        if (window.confirm(`Are you sure you want to cancel/delete "${eventTitle}"?`)) {
            try {
                await deleteEvent(eventId);
                alert('Event deleted successfully!');
                fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event.');
            }
        }
    };

    const handleEventUpdated = () => {
        setShowEditModal(false);
        setEditingEvent(null);
        fetchEvents();
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Events Management</h2>
                <Button
                    variant="primary"
                    className="rounded-pill shadow-sm fw-bold px-4"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? (
                        <span><i className="fas fa-times me-2"></i> Hide Form</span>
                    ) : (
                        <span><i className="fas fa-plus-circle me-2"></i> Add Event / Schedule Meeting</span>
                    )}
                </Button>
            </div>

            {showAddForm && (
                <div className="mb-5">
                    <AddEvent onEventAdded={handleEventAdded} onCancel={() => setShowAddForm(false)} />
                </div>
            )}

            <Row className="mb-4 g-4">
                <Col md={6}>
                    <Card className="text-center p-4 shadow border-0 rounded-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="text-muted text-uppercase fw-bold small mb-0">Total Events</h5>
                            <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle">
                                <i className="fas fa-calendar me-0 fa-lg"></i>
                            </div>
                        </div>
                        <h2 className="text-primary fw-bold display-6 mb-0 text-start">{events.length}</h2>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="text-center p-4 shadow border-0 rounded-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="text-muted text-uppercase fw-bold small mb-0">Upcoming</h5>
                            <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle">
                                <i className="fas fa-clock me-0 fa-lg"></i>
                            </div>
                        </div>
                        <h2 className="text-success fw-bold display-6 mb-0 text-start">
                            {events.filter(e => new Date(e.date) >= new Date()).length}
                        </h2>
                    </Card>
                </Col>
            </Row>

            <Card className="shadow border-0 rounded-4">
                <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
                    <h5 className="mb-0 fw-bold">Events & Schedules</h5>
                </Card.Header>
                <Card.Body className="p-4">
                    {loading ? (
                        <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
                    ) : (
                        <Table hover className="mb-0 align-middle">
                            <thead className="bg-light text-muted small text-uppercase">
                                <tr>
                                    <th className="py-3 ps-4 border-0">Event Title</th>
                                    <th className="py-3 border-0">Date</th>
                                    <th className="py-3 border-0">Type</th>
                                    <th className="py-3 border-0">Location</th>
                                    <th className="py-3 border-0">Status</th>
                                    <th className="py-3 border-0">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.id}>
                                        <td className="ps-4 fw-bold">{event.title}</td>
                                        <td className="text-muted">{event.date}</td>
                                        <td>
                                            <Badge bg="info" className="text-dark fw-normal">{event.type}</Badge>
                                        </td>
                                        <td>{event.location}</td>
                                        <td>
                                            <Badge bg={event.status === 'Scheduled' ? 'primary' : 'secondary'} className="fw-normal">
                                                {event.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2 rounded-pill px-3"
                                                onClick={() => handleEdit(event)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="rounded-pill px-3"
                                                onClick={() => handleDelete(event.id, event.title)}
                                            >
                                                Cancel
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {events.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">No events scheduled.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            {/* Edit Event Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingEvent && (
                        <AddEvent
                            onEventAdded={handleEventUpdated}
                            onCancel={() => setShowEditModal(false)}
                            editMode={true}
                            eventData={editingEvent}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </AdminLayout>
    );
};

export default Events;
