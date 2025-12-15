import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Spinner } from 'react-bootstrap';
import { getBusinesses } from '../../services/dataService';
import AddBusiness from './AddBusiness';

const BusinessList = ({ isAdmin = false }) => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchBusinesses = async () => {
        setLoading(true);
        try {
            const data = await getBusinesses();
            setBusinesses(data);
        } catch (error) {
            console.error("Error fetching businesses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, []);

    const handleBusinessAdded = () => {
        setShowAddForm(false);
        fetchBusinesses();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Business Directory</h2>
                <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Hide Form' : 'Add Business'}
                </Button>
            </div>

            {showAddForm && (
                <AddBusiness
                    onBusinessAdded={handleBusinessAdded}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Business Name</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Owner Name</th>
                            <th>Status</th>
                            {isAdmin && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {businesses.map((business) => (
                            <tr key={business.id}>
                                <td>{business.name}</td>
                                <td>{business.category}</td>
                                <td>{business.location}</td>
                                <td>{business.owner}</td>
                                <td>
                                    <Badge bg={business.status === 'Active' ? 'success' : 'secondary'}>
                                        {business.status || 'Active'}
                                    </Badge>
                                </td>
                                {isAdmin && (
                                    <td>
                                        <Button size="sm" variant="info" className="me-2">Edit</Button>
                                        <Button size="sm" variant="danger">Delete</Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default BusinessList;
