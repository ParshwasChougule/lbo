import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addBusiness } from '../../services/dataService';

const AddBusiness = ({ onBusinessAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        location: '',
        owner: '',
        description: '',
        contact: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addBusiness(formData);
            alert('Business Added Successfully!');
            setFormData({ name: '', category: '', location: '', owner: '', description: '', contact: '' });
            if (onBusinessAdded) onBusinessAdded();
        } catch (error) {
            console.error("Error adding business:", error);
            alert("Failed to add business.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 border rounded bg-light mb-4">
            <div className="d-flex justify-content-between mb-3">
                <h5>Add New Business</h5>
                <Button variant="outline-secondary" size="sm" onClick={onCancel}>Cancel</Button>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Business Name</Form.Label>
                            <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Trading">Trading</option>
                                <option value="Services">Services</option>
                                <option value="Retail">Retail</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control name="owner" value={formData.owner} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Location / City</Form.Label>
                            <Form.Control name="location" value={formData.location} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control name="contact" value={formData.contact} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-3">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Business'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddBusiness;
