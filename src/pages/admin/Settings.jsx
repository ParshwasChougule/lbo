import React, { useState, useEffect } from "react";
import { getSettings, updateSettings, uploadSponsorImage } from "../../services/dataService";
import { toast } from "react-toastify";
import AdminLayout from "../../components/layout/AdminLayout";

const Settings = () => {
    const [marqueeText, setMarqueeText] = useState("");
    const [sponsorImages, setSponsorImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await getSettings();
            if (data) {
                setMarqueeText(data.marqueeText || "");
                setSponsorImages(data.sponsorImages || []);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
            toast.error("Failed to load settings.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const downloadURL = await uploadSponsorImage(file);
            const newImages = [...sponsorImages, downloadURL];
            setSponsorImages(newImages);
            // Auto-save just the images list to avoid user losing them if they forget to click save
            await updateSettings({ marqueeText, sponsorImages: newImages });
            toast.success("Image uploaded!");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = async (indexToRemove) => {
        const newImages = sponsorImages.filter((_, index) => index !== indexToRemove);
        setSponsorImages(newImages);
        await updateSettings({ marqueeText, sponsorImages: newImages });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings({ marqueeText, sponsorImages });
            toast.success("Settings updated successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="container-fluid p-0">
                <h2 className="mb-4">Sponsor Management</h2>

                <div className="card shadow border-0 rounded-4 mb-4">
                    <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2 text-primary">
                                <i className="fas fa-bullhorn"></i>
                            </div>
                            <h5 className="mb-0 fw-bold">Sponsor / Announcement Marquee</h5>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={handleSave}>
                            <div className="mb-4">
                                <label className="form-label text-muted small text-uppercase fw-bold">Homepage Marquee Text</label>
                                <textarea
                                    className="form-control form-control-lg bg-light border-0"
                                    rows="3"
                                    placeholder="Enter text to scroll on the homepage..."
                                    value={marqueeText}
                                    onChange={(e) => setMarqueeText(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-muted small text-uppercase fw-bold">Sponsor Logos (Scrolling)</label>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <input
                                        type="file"
                                        className="form-control w-auto"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                    {uploading && <div className="spinner-border spinner-border-sm text-primary" role="status"></div>}
                                </div>

                                <div className="d-flex flex-wrap gap-3 mt-3">
                                    {sponsorImages.map((imgUrl, index) => (
                                        <div key={index} className="position-relative border p-2 rounded-3 bg-white shadow-sm">
                                            <img src={imgUrl} alt={`Sponsor ${index}`} style={{ height: '60px', objectFit: 'contain' }} />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm badge position-absolute top-0 start-100 translate-middle rounded-circle shadow-sm"
                                                onClick={() => removeImage(index)}
                                                style={{ width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    {sponsorImages.length === 0 && <p className="text-muted small fst-italic">No images added yet.</p>}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm fw-bold" disabled={saving}>
                                {saving ? (
                                    <span><i className="fas fa-spinner fa-spin me-2"></i> Saving...</span>
                                ) : (
                                    <span><i className="fas fa-save me-2"></i> Save Changes</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
