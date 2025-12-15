import React, { useEffect, useState } from 'react';
import { Card, Table, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { getMembers, getEvents, getSettings } from '../../services/dataService';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
    const [recentMembers, setRecentMembers] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [sponsors, setSponsors] = useState({ text: '', images: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [membersData, eventsData, settingsData] = await Promise.all([
                    getMembers(),
                    getEvents(),
                    getSettings()
                ]);

                // Process Members (Last 5 active)
                // Assuming newer members are at the end, so reverse to get recent first
                // If they have createdAt, sort by that. If not, just reverse list.
                // Since firestore doesn't guarantee order unless specified, we'll just take the list for now.
                // Ideally we'd sort by createdAt if available.
                const sortedMembers = membersData.sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        return b.createdAt.seconds - a.createdAt.seconds; // Descending
                    }
                    return 0;
                });
                setRecentMembers(sortedMembers.slice(0, 5));

                // Process Events (Upcoming, sort by date)
                const upcoming = eventsData
                    .filter(e => new Date(e.date) >= new Date())
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(0, 3);
                setUpcomingEvents(upcoming);

                // Process Sponsors
                if (settingsData) {
                    setSponsors({
                        text: settingsData.marqueeText || '',
                        images: settingsData.sponsorImages || []
                    });
                }
            } catch (error) {
                console.error("Error fetching dashboard overview:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;

    return (
        <div className="mt-4">
            <Row className="g-4">
                {/* Recent Members */}
                <Col lg={8}>
                    <Card className="shadow border-0 rounded-4 h-100">
                        <Card.Header className="bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2 text-primary">
                                    <i className="fas fa-users"></i>
                                </div>
                                <h5 className="mb-0 fw-bold">Recent Members</h5>
                            </div>
                            <Link to="/admin/members" className="text-decoration-none small fw-bold text-primary">
                                View All
                            </Link>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="table-responsive rounded-3 border">
                                <Table hover className="align-middle mb-0">
                                    <thead className="bg-light text-muted small text-uppercase">
                                        <tr>
                                            <th className="border-0 ps-3 py-3">Name</th>
                                            <th className="border-0 py-3">Business</th>
                                            <th className="border-0 py-3">City</th>
                                            <th className="border-0 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentMembers.map((member, index) => (
                                            <tr key={member.id || index} className="border-bottom-custom">
                                                <td className="ps-3 fw-bold text-dark py-3">{member.name}</td>
                                                <td className="text-muted small py-3">{member.business}</td>
                                                <td className="text-muted small py-3">{member.city}</td>
                                                <td className="py-3">
                                                    <Badge bg={member.status === 'Active' ? 'success' : 'warning'} className="fw-normal px-3 py-2 rounded-pill">
                                                        {member.status || 'Pending'}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                        {recentMembers.length === 0 && (
                                            <tr><td colSpan="4" className="text-center text-muted py-4">No recent members found</td></tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Upcoming Events */}
                <Col lg={4}>
                    <Card className="shadow border-0 rounded-4 h-100">
                        <Card.Header className="bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="bg-success bg-opacity-10 p-2 rounded-circle me-2 text-success">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                                <h5 className="mb-0 fw-bold">Upcoming Events</h5>
                            </div>
                            <Link to="/admin/events" className="text-decoration-none small fw-bold text-success">
                                Manage
                            </Link>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {upcomingEvents.length > 0 ? (
                                <div className="d-flex flex-column gap-3">
                                    {upcomingEvents.map((event, index) => (
                                        <div key={event.id || index} className="d-flex align-items-center p-3 border rounded-3 bg-white hover-shadow transition-all">
                                            <div className="bg-light border rounded text-center p-2 me-3" style={{ minWidth: '60px' }}>
                                                <small className="d-block text-uppercase text-danger fw-bold" style={{ fontSize: '0.7rem' }}>
                                                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                                </small>
                                                <span className="d-block h4 mb-0 fw-bold text-dark">
                                                    {new Date(event.date).getDate()}
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="mb-1 fw-bold text-dark">{event.title}</h6>
                                                <small className="text-muted d-block mb-1"><i className="fas fa-map-marker-alt me-1 text-secondary"></i>{event.location}</small>
                                                <Badge bg="info" text="dark" className="fw-normal" style={{ fontSize: '0.65rem' }}>
                                                    {event.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <div className="text-muted opacity-50 mb-2"><i className="fas fa-calendar-times fa-3x"></i></div>
                                    <p className="text-muted mb-0">No upcoming events.</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Sponsors Overview */}
                <Col lg={12}>
                    <Card className="shadow border-0 rounded-4">
                        <Card.Header className="bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="bg-warning bg-opacity-10 p-2 rounded-circle me-2 text-warning">
                                    <i className="fas fa-bullhorn"></i>
                                </div>
                                <h5 className="mb-0 fw-bold">Active Sponsors & Announcements</h5>
                            </div>
                            <Link to="/admin/settings" className="text-decoration-none small fw-bold text-warning">
                                Edit Settings
                            </Link>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Row className="g-4">
                                <Col md={6}>
                                    <label className="text-muted small fw-bold text-uppercase mb-2">Live Announcement</label>
                                    {sponsors.text ? (
                                        <div className="alert alert-light border shadow-sm p-4 rounded-3 d-flex h-100">
                                            <div className="me-3 text-info"><i className="fas fa-info-circle fa-2x"></i></div>
                                            <div>
                                                <h6 className="alert-heading fw-bold text-dark">Marquee Preview</h6>
                                                <p className="mb-0 text-secondary">"{sponsors.text}"</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="alert alert-light border border-dashed text-center p-4 rounded-3 text-muted">
                                            No announcement text set.
                                        </div>
                                    )}
                                </Col>
                                <Col md={6}>
                                    <label className="text-muted small fw-bold text-uppercase mb-2">Sponsor Logos</label>
                                    <div className="bg-light rounded-3 p-4 border h-100">
                                        <div className="d-flex flex-wrap gap-3">
                                            {sponsors.images.length > 0 ? (
                                                sponsors.images.map((img, idx) => (
                                                    <div key={idx} className="bg-white p-2 rounded-3 border shadow-sm d-flex align-items-center justify-content-center" style={{ width: '80px', height: '60px' }}>
                                                        <img src={img} alt="Sponsor" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="w-100 text-center py-2 text-muted small">
                                                    No sponsor logos uploaded.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <style>
                {`
                .hover-shadow:hover {
                    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                    transform: translateY(-2px);
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                `}
            </style>
        </div>
    );
};

export default DashboardOverview;
