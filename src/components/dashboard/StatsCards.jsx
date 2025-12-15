import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const StatsCards = () => {
    const stats = [
        { title: 'Total Members', value: '150', color: 'primary' },
        { title: 'Active Businesses', value: '85', color: 'success' },
        { title: 'Upcoming Events', value: '3', color: 'warning' },
        { title: 'New Registrations', value: '12', color: 'info' },
    ];

    return (
        <Row>
            {stats.map((stat, index) => (
                <Col md={3} key={index} className="mb-4">
                    <Card className={`border-left-${stat.color} h-100 py-2 shadow-sm`}>
                        <Card.Body>
                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                                {stat.title}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{stat.value}</div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default StatsCards;
