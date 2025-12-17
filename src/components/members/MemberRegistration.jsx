import React, { useState } from "react";

import { addMember, uploadMemberImage } from "../../services/dataService";

const MemberRegistration = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        business: "",
        category: "",
        city: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitting to Firebase...", formData);

        try {
            let imageUrl = "";
            if (imageFile) {
                imageUrl = await uploadMemberImage(imageFile);
            }

            const payload = { ...formData, img: imageUrl };

            await addMember(payload);
            console.log("Success!");
            alert("✅ Member Saved Successfully to Firebase!");
            setFormData({ name: "", mobile: "", email: "", business: "", city: "" });
            setImageFile(null);
            if (onSuccess) onSuccess(); // Trigger refresh
        } catch (error) {
            console.error("Firebase Error Full Object:", error);

            let errorMsg = "Failed to save.";
            if (error.code === 'unavailable') {
                errorMsg = "❌ Network Error: You seem to be offline or Firebase is blocked.";
            } else if (error.code === 'permission-denied') {
                errorMsg = "❌ Permission Denied: Database rules block this write. Check Firebase Console.";
            } else {
                errorMsg = `❌ Error: ${error.message}`;
            }
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow border-0 rounded-4">
            <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-primary">
                        <i className="fas fa-user-plus fa-lg"></i>
                    </div>
                    <div>
                        <h5 className="mb-1 fw-bold text-dark">Add New Member</h5>
                        <p className="text-muted small mb-0">Fill in the details to register a new member.</p>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        <div className="col-md-12 text-center mb-2">
                            <div className="d-inline-block position-relative">
                                <div className="rounded-circle overflow-hidden bg-light border d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: '120px', height: '120px' }}>
                                    {imageFile ? (
                                        <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-100 h-100 object-fit-cover" />
                                    ) : (
                                        <i className="fas fa-camera fa-2x text-muted opacity-50"></i>
                                    )}
                                </div>
                                <label className="btn btn-sm btn-outline-primary rounded-pill position-absolute bottom-0 start-50 translate-middle-x mb-2" style={{ whiteSpace: 'nowrap' }}>
                                    Upload Photo <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Full Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="e.g. Rahul Patil"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Mobile Number <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="e.g. 9876543210"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Email Address</label>
                            <input
                                type="email"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="e.g. rahul@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Business Name</label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="e.g. Patil Traders"
                                name="business"
                                value={formData.business}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">Business Category <span className="text-danger">*</span></label>
                            <select
                                className="form-select form-select-lg bg-light border-0"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="IT Services">IT Services</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Retail">Retail</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Construction">Construction</option>
                                <option value="Consulting">Consulting</option>
                                <option value="Food & Beverage">Food & Beverage</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-muted small fw-bold">City</label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="e.g. Kolhapur"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4 pt-2">
                        <button className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow-sm" disabled={loading}>
                            {loading ? (
                                <span><i className="fas fa-spinner fa-spin me-2"></i> Saving...</span>
                            ) : (
                                <span><i className="fas fa-save me-2"></i> Save Member</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberRegistration;
