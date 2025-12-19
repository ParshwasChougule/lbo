import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { getMembers, updateMember, deleteMember } from '../../services/dataService';

const MemberList = ({ isAdmin = false, refreshTrigger }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Show 10 members per page

    useEffect(() => {
        fetchMembers();
    }, [refreshTrigger]);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const data = await getMembers();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (member) => {
        const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';
        try {
            // Optimistic update
            setMembers(members.map(m => m.id === member.id ? { ...m, status: newStatus } : m));
            await updateMember(member.id, { status: newStatus });
        } catch (error) {
            console.error("Error updating status:", error);
            fetchMembers(); // Revert on error
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                setMembers(members.filter(m => m.id !== id)); // Optimistic remove
                await deleteMember(id);
            } catch (error) {
                console.error("Error deleting member:", error);
                fetchMembers();
            }
        }
    };

    const handleEditClick = (member) => {
        setEditingMember({ ...member });
        setShowEditModal(true);
    };

    const handleEditSave = async () => {
        try {
            await updateMember(editingMember.id, editingMember);
            setShowEditModal(false);
            fetchMembers();
            alert("Member updated successfully!");
        } catch (error) {
            console.error("Failed to update member", error);
            alert("Failed to update member.");
        }
    };

    const handleEditChange = (e) => {
        setEditingMember({ ...editingMember, [e.target.name]: e.target.value });
    };

    const filteredMembers = members.filter(member =>
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.business?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.mobile?.includes(searchTerm) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div className="text-center py-5">Loading members...</div>;

    return (

        <div className="card shadow border-0 rounded-4 mt-5">
            <div className="card-header bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3 text-success">
                        <i className="fas fa-users fa-lg"></i>
                    </div>
                    <div>
                        <h5 className="mb-1 fw-bold text-dark">Member Management</h5>
                        <p className="text-muted small mb-0">Manage existing members, edit details or remove.</p>
                    </div>
                </div>
            </div>

            <div className="card-body p-4">
                <div className="row mb-4">
                    <div className="col-md-6">
                        <InputGroup className="input-group-lg shadow-sm rounded-pill overflow-hidden border">
                            <InputGroup.Text className="bg-white border-0 ps-4 text-muted">
                                <i className="fas fa-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-0 shadow-none ps-2"
                                style={{ fontSize: '0.95rem' }}
                            />
                        </InputGroup>
                    </div>
                </div>

                <div className="table-responsive rounded-3 border">
                    <Table hover className="mb-0 align-middle">
                        <thead className="bg-light text-muted small text-uppercase fw-bold">
                            <tr>
                                <th className="py-3 ps-4 border-0">Name</th>
                                <th className="py-3 border-0">Mobile</th>
                                <th className="py-3 border-0">Email</th>
                                <th className="py-3 border-0">Business</th>
                                <th className="py-3 border-0">Category</th>
                                <th className="py-3 border-0">City</th>
                                {isAdmin && (
                                    <>
                                        <th className="py-3 border-0 text-center">Status</th>
                                        <th className="py-3 border-0 text-center">Actions</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentMembers.length > 0 ? (
                                currentMembers.map((member) => (
                                    <tr key={member.id} className="border-bottom-custom">
                                        <td className="ps-4 py-3">
                                            <div className="fw-bold text-dark">{member.name}</div>
                                        </td>
                                        <td className="py-3 text-muted">{member.mobile}</td>
                                        <td className="py-3 text-muted">{member.email || '-'}</td>
                                        <td className="py-3 fw-medium text-dark">{member.business}</td>
                                        <td className="py-3">
                                            <Badge bg="light" text="dark" className="border fw-normal">
                                                {member.category}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-muted">{member.city}</td>
                                        {isAdmin && (
                                            <>
                                                <td className="py-3 text-center">
                                                    <Form.Check
                                                        type="switch"
                                                        id={`custom-switch-${member.id}`}
                                                        checked={member.status === 'Active'}
                                                        onChange={() => handleToggleActive(member)}
                                                        className="d-inline-block fs-5"
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                                <td className="py-3 text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            className="btn-icon text-primary rounded-circle border-0"
                                                            onClick={() => handleEditClick(member)}
                                                            title="Edit Member"
                                                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Button>
                                                        <Button
                                                            variant="light"
                                                            size="sm"
                                                            className="btn-icon text-danger rounded-circle border-0"
                                                            onClick={() => handleDelete(member.id)}
                                                            title="Delete Member"
                                                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isAdmin ? 8 : 6} className="text-center py-5 text-muted">
                                        <div className="mb-2"><i className="fas fa-search fa-2x opacity-25"></i></div>
                                        <span className="small">No members found matching your search.</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination Controls */}
                {filteredMembers.length > 0 && (
                    <div className="d-flex justify-content-between align-items-center mt-4 px-3 pb-2">
                        <div className="text-muted small">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMembers.length)} of {filteredMembers.length} members
                        </div>

                        {totalPages > 1 && (
                            <nav>
                                <ul className="pagination pagination-sm mb-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link rounded-start"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                    </li>

                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        // Show first page, last page, current page, and pages around current
                                        if (
                                            pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                        ) {
                                            return (
                                                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(pageNumber)}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                </li>
                                            );
                                        } else if (
                                            pageNumber === currentPage - 2 ||
                                            pageNumber === currentPage + 2
                                        ) {
                                            return <li key={pageNumber} className="page-item disabled"><span className="page-link">...</span></li>;
                                        }
                                        return null;
                                    })}

                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link rounded-end"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingMember && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editingMember.name}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobile"
                                    value={editingMember.mobile}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={editingMember.email}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Business Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="business"
                                    value={editingMember.business}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={editingMember.category}
                                    onChange={handleEditChange}
                                    list="editCategoryOptions"
                                    placeholder="e.g. IT Services or type custom category"
                                />
                                <datalist id="editCategoryOptions">
                                    <option value="IT Services" />
                                    <option value="Manufacturing" />
                                    <option value="Retail" />
                                    <option value="Healthcare" />
                                    <option value="Education" />
                                    <option value="Construction" />
                                    <option value="Consulting" />
                                    <option value="Food & Beverage" />
                                    <option value="Finance & Banking" />
                                    <option value="Real Estate" />
                                    <option value="Transportation & Logistics" />
                                    <option value="Agriculture" />
                                    <option value="Hospitality & Tourism" />
                                    <option value="Legal Services" />
                                    <option value="Media & Entertainment" />
                                    <option value="Other" />
                                </datalist>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={editingMember.city}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MemberList;
