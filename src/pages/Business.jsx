import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Spinner, Badge } from 'react-bootstrap';
import { getBusinesses } from '../services/dataService';

const Business = () => {
    const [businesses, setBusinesses] = useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    // Extract unique cities for filter dropdown
    const cities = [...new Set(businesses.map(b => b.location).filter(Boolean))];
    const categories = ['Manufacturing', 'Trading', 'Services', 'Retail', 'Other'];

    useEffect(() => {
        fetchBusinesses();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, categoryFilter, cityFilter, businesses]);

    const fetchBusinesses = async () => {
        setLoading(true);
        try {
            const data = await getBusinesses();
            setBusinesses(data);
            setFilteredBusinesses(data);
        } catch (error) {
            console.error("Error fetching businesses:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        let result = businesses;

        if (searchTerm) {
            result = result.filter(b =>
                b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.owner?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter) {
            result = result.filter(b => b.category === categoryFilter);
        }

        if (cityFilter) {
            result = result.filter(b => b.location === cityFilter);
        }

        setFilteredBusinesses(result);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setCategoryFilter('');
        setCityFilter('');
    };

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">Lingayat Business Directory</h2>
                <p className="text-muted">Connect with trusted businesses from our community.</p>
            </div>

            {/* Filter Section */}
            <Card className="mb-5 shadow-sm border-0">
                <Card.Body className="p-4">
                    <Row className="g-3">
                        <Col md={4}>
                            <InputGroup>
                                <InputGroup.Text>🔍</InputGroup.Text>
                                <Form.Control
                                    placeholder="Search by business or owner..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={3}>
                            <Form.Select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                                <option value="">All Cities</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={2}>
                            <Button variant="outline-secondary" className="w-100" onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Results Section */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row className="g-4">
                    {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map((business) => (
                            <Col key={business.id} md={6} lg={4}>
                                <Card className="h-100 shadow-sm border-0 hover-effect">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <Badge bg="primary" className="mb-2">{business.category}</Badge>
                                            {business.status === 'Active' && <Badge bg="success" pill>Verified</Badge>}
                                        </div>
                                        <h4 className="card-title fw-bold mb-1">{business.name}</h4>
                                        <p className="text-muted small mb-3">Owner: {business.owner}</p>

                                        <div className="mb-2">
                                            <small className="text-muted d-block">📍 {business.location}</small>
                                            <small className="text-muted d-block">📞 {business.contact}</small>
                                        </div>

                                        {business.description && (
                                            <p className="card-text mt-3 text-secondary small line-clamp-2">
                                                {business.description}
                                            </p>
                                        )}
                                    </Card.Body>
                                    <Card.Footer className="bg-white border-0 pt-0 pb-4">
                                        <Button variant="outline-primary" size="sm" className="w-100">View Details</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <h4>No businesses found</h4>
                            <p className="text-muted">Try adjusting your search or filters.</p>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default Business;
