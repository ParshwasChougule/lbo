import React, { useEffect, useState } from 'react';
import { Card, Table, Badge, Row, Col, Spinner, Button } from 'react-bootstrap';
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

    const getInitials = (name) => {
        return name
            ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
            : 'M';
    };

    const getRandomColor = (name) => {
        const colors = ['primary', 'success', 'danger', 'warning', 'info', 'dark'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;

    return (
        <div className="mt-4">
            <Row className="g-4">
                {/* Recent Members */}
                <Col lg={8}>
                    <Card className="shadow-sm border-0 rounded-4 h-100 overflow-hidden">
                        <Card.Header className="bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <span className="bg-primary bg-opacity-10 text-primary rounded-3 p-2 me-3">
                                    <i className="fas fa-users-cog fa-lg"></i>
                                </span>
                                <div>
                                    <h5 className="mb-0 fw-bold">New Members</h5>
                                    <small className="text-muted">Latest community additions</small>
                                </div>
                            </div>
                            <Button as={Link} to="/admin/members" variant="primary" size="sm" className="rounded-pill px-3 fw-bold text-white shadow-sm border-0">
                                View All
                            </Button>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="table-responsive">
                                <Table hover borderless className="align-middle mb-0">
                                    <thead className="bg-light text-secondary small text-uppercase fw-bold rounded-3">
                                        <tr>
                                            <th className="ps-3 py-3 rounded-start">Member</th>
                                            <th className="py-3">Details</th>
                                            <th className="py-3">Location</th>
                                            <th className="py-3 text-end pe-3 rounded-end">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentMembers.map((member, index) => (
                                            <tr key={member.id || index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                <td className="ps-3 py-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className={`rounded-circle bg-${getRandomColor(member.name || '')} text-white d-flex align-items-center justify-content-center me-3 shadow-sm`}
                                                            style={{ width: '40px', height: '40px', fontSize: '14px', flexShrink: 0 }}>
                                                            {getInitials(member.name)}
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold text-dark">{member.name}</div>
                                                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>ID: {member.id?.substring(0, 6)}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <div className="d-flex align-items-center text-muted">
                                                        <i className="fas fa-briefcase me-2 small opacity-50"></i>
                                                        <span className="small fw-medium">{member.business || 'N/A'}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <div className="d-flex align-items-center text-muted">
                                                        <i className="fas fa-map-marker-alt me-2 small opacity-50"></i>
                                                        <span className="small fw-medium">{member.city || 'N/A'}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-end pe-3">
                                                    <Badge bg={member.status === 'Active' ? 'success' : 'warning'}
                                                        className={`fw-normal px-3 py-2 rounded-pill bg-opacity-10 text-${member.status === 'Active' ? 'success' : 'warning'} border border-${member.status === 'Active' ? 'success' : 'warning'}`}>
                                                        {member.status || 'Pending'}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                        {recentMembers.length === 0 && (
                                            <tr><td colSpan="4" className="text-center text-muted py-5">No recent members found</td></tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Upcoming Events */}
                <Col lg={4}>
                    <Card className="shadow-sm border-0 rounded-4 h-100 overflow-hidden bg-gradient-to-b from-white to-light">
                        <Card.Header className="bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <span className="bg-success bg-opacity-10 text-success rounded-3 p-2 me-3">
                                    <i className="fas fa-calendar-star fa-lg"></i>
                                </span>
                                <div>
                                    <h5 className="mb-0 fw-bold">Events</h5>
                                    <small className="text-muted">Upcoming schedule</small>
                                </div>
                            </div>
                            <Link to="/admin/events" className="btn btn-sm btn-icon btn-light rounded-circle text-muted">
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {upcomingEvents.length > 0 ? (
                                <div className="d-flex flex-column gap-3">
                                    {upcomingEvents.map((event, index) => (
                                        <div key={event.id || index} className="d-flex align-items-center p-3 border-0 bg-white shadow-sm rounded-4 position-relative overflow-hidden group-hover-effect">
                                            <div className="position-absolute start-0 top-0 bottom-0 bg-success" style={{ width: '4px' }}></div>
                                            <div className="text-center me-3 ps-2">
                                                <small className="d-block text-uppercase text-danger fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                                                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                                </small>
                                                <span className="d-block h3 mb-0 fw-bold text-dark lh-1">
                                                    {new Date(event.date).getDate()}
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 border-start ps-3">
                                                <h6 className="mb-1 fw-bold text-dark text-truncate" style={{ maxWidth: '180px' }}>{event.title}</h6>
                                                <div className="d-flex align-items-center text-muted small">
                                                    <i className="fas fa-clock me-1 text-warning" style={{ fontSize: '0.7rem' }}></i>
                                                    <span>{event.time || 'All Day'}</span>
                                                </div>
                                            </div>
                                            <Badge bg="light" text="dark" className="border fw-normal rounded-2 align-self-start ms-2">
                                                {event.type}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <div className="text-muted opacity-25 mb-3"><i className="fas fa-calendar-check fa-4x"></i></div>
                                    <p className="text-muted fw-medium">No upcoming events scheduled.</p>
                                    <Button as={Link} to="/admin/events" variant="outline-success" size="sm" className="rounded-pill mt-2">
                                        Schedule Event
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Sponsors Overview - Compact */}
                <Col lg={12}>
                    <Card className="shadow-sm border-0 rounded-4 gradient-border-bottom">
                        <Card.Body className="p-4">
                            <Row className="align-items-center">
                                <Col md={4} className="border-end">
                                    <div className="d-flex align-items-center mb-3 mb-md-0">
                                        <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle me-3">
                                            <i className="fas fa-bullhorn fa-lg"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1">Marquee Updates</h6>
                                            <p className="text-muted small mb-0">Manage scrolling announcements</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <div className="bg-light p-3 rounded-3 d-flex justify-content-between align-items-center">
                                        <div className="text-truncate me-3 fst-italic text-secondary" style={{ maxWidth: '80%' }}>
                                            "{sponsors.text || 'No active announcement'}"
                                        </div>
                                        <Button as={Link} to="/admin/settings" variant="link" className="text-warning fw-bold p-0 text-decoration-none small">
                                            Edit <i className="fas fa-pen ms-1"></i>
                                        </Button>
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
                    transition: all 0.3s ease;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                .gradient-border-bottom {
                    border-bottom: 4px solid #F7CE68;
                }
                `}
            </style>
        </div>
    );
};

export default DashboardOverview;
