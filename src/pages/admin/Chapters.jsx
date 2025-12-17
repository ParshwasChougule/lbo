import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col, Spinner, Badge } from 'react-bootstrap';
import AdminLayout from '../../components/layout/AdminLayout';
import { getChapters, addChapter, updateChapter, deleteChapter, uploadChapterImage } from '../../services/dataService';
import { toast } from 'react-toastify';

const Chapters = () => {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        president: '',
        vicePresident: '',
        activeMembers: '',
        img: '',
        images: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchChapters();
    }, []);

    const fetchChapters = async () => {
        try {
            setLoading(true);
            const data = await getChapters();
            setChapters(data);
        } catch (error) {
            console.error("Error fetching chapters:", error);
            toast.error("Failed to load chapters");
        } finally {
            setLoading(false);
        }
    };

    const handleSeedDefaults = async () => {
        setLoading(true);
        try {
            const defaultChapters = [
                { name: 'Sangli', leadership: { president: 'Mr. Patil', vicePresident: '' }, stats: { activeMembers: 150 } },
                { name: 'Kolhapur', leadership: { president: 'Mrs. Deshmukh', vicePresident: '' }, stats: { activeMembers: 200 } },
                { name: 'Ichalkaranji', leadership: { president: 'Mr. Kulkarni', vicePresident: '' }, stats: { activeMembers: 120 } },
                { name: 'Solapur', leadership: { president: 'Mr. Swami', vicePresident: '' }, stats: { activeMembers: 100 } },
                { name: 'Pune', leadership: { president: 'Mr. Shetty', vicePresident: '' }, stats: { activeMembers: 300 } },
                { name: 'Belagavi', leadership: { president: 'Mr. Kage', vicePresident: '' }, stats: { activeMembers: 180 } }
            ];

            const seedPromises = defaultChapters.map(chapter => addChapter(chapter));
            await Promise.all(seedPromises);

            toast.success("Default chapters loaded!");
            fetchChapters();
        } catch (error) {
            console.error("Error seeding chapters:", error);
            toast.error("Failed to seed chapters");
            setLoading(false);
        }
    };

    const handleEdit = (chapter) => {
        setEditingId(chapter.id);
        setFormData({
            name: chapter.name || '',
            president: chapter.leadership?.president || '',
            vicePresident: chapter.leadership?.vicePresident || '',
            activeMembers: chapter.stats?.activeMembers || '',
            img: chapter.img || '',
            images: chapter.images || (chapter.img ? [chapter.img] : [])
        });
        setImageFiles([]); // Reset file input
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            name: '',
            president: '',
            vicePresident: '',
            activeMembers: '',
            img: '',
            images: []
        });
        setImageFiles([]);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this chapter?")) {
            try {
                await deleteChapter(id);
                setChapters(chapters.filter(c => c.id !== id));
                toast.success("Chapter deleted successfully");
            } catch (error) {
                console.error("Error deleting chapter", error);
                toast.error("Failed to delete chapter");
            }
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const removeExistingImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let uploadedUrls = [];

            if (imageFiles.length > 0) {
                console.log("Uploading images...");
                // Note: You must update dataService.js to export uploadChapterImages if it's not already there.
                // Assuming we added it in the previous step. If not, we can map over uploadChapterImage here.
                const { uploadChapterImages } = require('../../services/dataService');
                uploadedUrls = await uploadChapterImages(imageFiles);
                console.log("Images uploaded:", uploadedUrls);
            }

            // Combine existing images (that weren't removed) with new uploads
            const finalImages = [...formData.images, ...uploadedUrls];
            const primaryImage = finalImages.length > 0 ? finalImages[0] : '';

            const chapterPayload = {
                name: formData.name,
                img: primaryImage, // Maintain backward compatibility
                images: finalImages, // New array field
                leadership: {
                    president: formData.president,
                    vicePresident: formData.vicePresident
                },
                stats: {
                    activeMembers: parseInt(formData.activeMembers) || 0
                }
            };

            console.log("Saving chapter with payload:", chapterPayload);

            if (editingId) {
                await updateChapter(editingId, chapterPayload);
                toast.success("Chapter updated successfully");
            } else {
                await addChapter(chapterPayload);
                toast.success("Chapter created successfully");
            }
            setShowModal(false);
            fetchChapters();
        } catch (error) {
            console.error("Error saving chapter:", error);
            if (error.code === 'storage/unauthorized') {
                toast.error("Permission denied: Cannot upload image.");
            } else if (error.toString().includes('exceeds')) {
                toast.error("File is too large.");
            } else {
                toast.error("Failed to save chapter. " + (error.message || ""));
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Chapter Management</h2>
                <Button
                    variant="primary"
                    className="rounded-pill shadow-sm fw-bold px-4"
                    onClick={handleAddNew}
                >
                    <i className="fas fa-plus-circle me-2"></i> Add Chapter
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <Row className="g-4">
                    {chapters.length > 0 ? (
                        chapters.map(chapter => (
                            <Col lg={4} md={6} key={chapter.id}>
                                <Card className="shadow border-0 rounded-4 h-100 hover-shadow transition-all">
                                    <div className="card-top-border bg-primary" style={{ height: '6px' }}></div>
                                    <Card.Body className="p-4 d-flex flex-column">

                                        {/* Chapter Image Preview */}
                                        <div className="mb-3 rounded-3 overflow-hidden shadow-sm" style={{ height: '150px' }}>
                                            <img
                                                src={chapter.img || `https://via.placeholder.com/400x250?text=${chapter.name}`}
                                                alt={chapter.name}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </div>

                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold mb-1">{chapter.name}</h4>
                                                <Badge bg="light" text="secondary" className="border fw-normal">
                                                    Chapter ID: {chapter.id.substring(0, 6)}...
                                                </Badge>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <Button size="sm" variant="outline-primary" className="btn-icon rounded-circle" onClick={() => handleEdit(chapter)}>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                                <Button size="sm" variant="outline-danger" className="btn-icon rounded-circle" onClick={() => handleDelete(chapter.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-3 mb-4">
                                            <div className="d-flex align-items-center mb-3 p-3 bg-light rounded-3">
                                                <div className="bg-white p-2 rounded-circle shadow-sm me-3 text-primary">
                                                    <i className="fas fa-users fa-lg"></i>
                                                </div>
                                                <div>
                                                    <small className="text-muted text-uppercase fw-bold d-block" style={{ fontSize: '0.7rem' }}>Active Members</small>
                                                    <span className="h3 fw-bold mb-0">{chapter.stats?.activeMembers || 0}</span>
                                                </div>
                                            </div>

                                            <div className="ps-2">
                                                <h6 className="fw-bold text-muted text-uppercase small mb-3">Chapter Leadership</h6>
                                                <div className="mb-2 d-flex align-items-center">
                                                    <i className="fas fa-user-tie text-secondary me-2" style={{ width: '20px' }}></i>
                                                    <div>
                                                        <small className="text-muted d-block" style={{ lineHeight: '1' }}>President</small>
                                                        <span className="fw-medium">{chapter.leadership?.president || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-user-shield text-secondary me-2" style={{ width: '20px' }}></i>
                                                    <div>
                                                        <small className="text-muted d-block" style={{ lineHeight: '1' }}>Vice President</small>
                                                        <span className="fw-medium">{chapter.leadership?.vicePresident || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <div className="text-muted opacity-50 mb-3"><i className="fas fa-city fa-3x"></i></div>
                            <h5>No chapters found.</h5>
                            <p className="text-muted mb-4">Create your first chapter or load basic defaults.</p>
                            <Button variant="outline-primary" onClick={handleSeedDefaults} disabled={loading}>
                                <i className="fas fa-database me-2"></i> Load Default Chapters
                            </Button>
                        </Col>
                    )}
                </Row>
            )}

            {/* Add/Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">{editingId ? 'Edit Chapter' : 'Add New Chapter'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleSubmit}>

                        {/* Image Upload Area */}
                        <Form.Group className="mb-4">
                            <Form.Label className="d-block fw-bold small text-uppercase text-muted mb-3">Chapter Images</Form.Label>

                            {/* Previews Grid */}
                            <div className="d-flex flex-wrap gap-3 mb-3">
                                {/* Existing Images */}
                                {formData.images && formData.images.map((url, idx) => (
                                    <div key={idx} className="position-relative" style={{ width: '100px', height: '100px' }}>
                                        <img src={url} alt={`Existing ${idx}`} className="w-100 h-100 object-fit-cover rounded-3 border" />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm p-0 position-absolute top-0 end-0 translate-middle-y shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                                            style={{ width: '20px', height: '20px', right: '-5px', top: '-5px' }}
                                            onClick={() => removeExistingImage(idx)}
                                        >
                                            <span style={{ fontSize: '12px', lineHeight: 1 }}>&times;</span>
                                        </button>
                                    </div>
                                ))}

                                {/* New Files Previews */}
                                {imageFiles.map((file, idx) => (
                                    <div key={`new-${idx}`} className="position-relative opacity-75" style={{ width: '100px', height: '100px' }}>
                                        <img src={URL.createObjectURL(file)} alt="New Preview" className="w-100 h-100 object-fit-cover rounded-3 border" />
                                        <div className="position-absolute bottom-0 start-0 w-100 bg-dark text-white text-center py-1" style={{ fontSize: '10px' }}>New</div>
                                    </div>
                                ))}

                                {/* Add Button (File Input trigger) */}
                                <div className="position-relative" style={{ width: '100px', height: '100px' }}>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="position-absolute w-100 h-100 opacity-0 cursor-pointer"
                                        style={{ zIndex: 10 }}
                                    />
                                    <div className="w-100 h-100 bg-light rounded-3 border border-dashed d-flex flex-column align-items-center justify-content-center text-muted">
                                        <i className="fas fa-plus fa-lg mb-1"></i>
                                        <span style={{ fontSize: '10px' }}>Add Photos</span>
                                    </div>
                                </div>
                            </div>
                            <Form.Text className="text-muted small">Select multiple files. First image will be the cover.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold small text-uppercase text-muted">Chapter Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control-lg bg-light border-0"
                                placeholder="e.g. Pune Chapter"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        {/* More fields... */}

                        <div className="row g-3 mb-4">
                            <Col md={12}>
                                <div className="p-3 bg-light rounded-3 border border-dashed">
                                    <h6 className="fw-bold small text-primary mb-3"><i className="fas fa-chart-line me-2"></i>Stats</h6>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Active Members Count</Form.Label>
                                        <Form.Control
                                            type="number"
                                            className="bg-white border-0 shadow-sm"
                                            placeholder="0"
                                            name="activeMembers"
                                            value={formData.activeMembers}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                        </div>

                        <h6 className="fw-bold small text-muted text-uppercase mb-3">Leadership Team</h6>
                        <Form.Group className="mb-3">
                            <Form.Label className="small">President Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="bg-light border-0"
                                placeholder="Enter Name"
                                name="president"
                                value={formData.president}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small">Vice President Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="bg-light border-0"
                                placeholder="Enter Name"
                                name="vicePresident"
                                value={formData.vicePresident}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="light" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button type="submit" variant="primary" disabled={submitting}>
                                {submitting ? 'Saving...' : 'Save Chapter'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </AdminLayout>
    );
};

export default Chapters;
