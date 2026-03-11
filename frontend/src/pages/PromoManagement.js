import { useState, useEffect } from "react";
import { getPromoBanners, createPromoBanner, updatePromoBanner, deletePromoBanner, uploadImage } from "../services/productService";
import "./HeroManagement.css"; // Reuse Hero css for matching style

function PromoManagement() {
    const [promos, setPromos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        imageUrl: "",
        buttonText: "",
        buttonLink: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadPromos();
    }, []);

    const loadPromos = () => {
        setLoading(true);
        getPromoBanners()
            .then(res => {
                setPromos(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading promos", err);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setFormData({ title: "", subtitle: "", imageUrl: "", buttonText: "", buttonLink: "" });
        setImageFile(null);
        setEditingId(null);
        const fileInput = document.getElementById("promoImageInput");
        if (fileInput) fileInput.value = "";
    };

    const handleEdit = (promo) => {
        setFormData(promo);
        setEditingId(promo.id);
        setImageFile(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this promo banner?")) {
            try {
                await deletePromoBanner(id);
                loadPromos();
            } catch (err) {
                console.error("Error deleting promo", err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let finalImageUrl = formData.imageUrl;
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append("file", imageFile);
                const uploadRes = await uploadImage(uploadData);
                finalImageUrl = uploadRes.data;
            }

            const promoToSubmit = { ...formData, imageUrl: finalImageUrl };

            if (editingId) {
                await updatePromoBanner(editingId, promoToSubmit);
            } else {
                await createPromoBanner(promoToSubmit);
            }

            resetForm();
            loadPromos();
        } catch (err) {
            console.error("Error submitting promo", err);
            alert("Error saving promotional banner");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading Promos...</p>;

    return (
        <div className="hero-management">
            <h2>Manage Promotional Banners</h2>

            <div className="admin-form-section" style={{ marginBottom: '40px' }}>
                <form className="edit-hero-form" onSubmit={handleSubmit}>
                    <h3>{editingId ? "Edit Promo Banner" : "Create New Promo Banner"}</h3>
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Subtitle / Description</label>
                        <input name="subtitle" value={formData.subtitle} onChange={handleChange} required />
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Button Text</label>
                            <input name="buttonText" value={formData.buttonText} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Button Link</label>
                            <input name="buttonLink" value={formData.buttonLink} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Background Image</label>
                        <input type="file" id="promoImageInput" accept="image/*" onChange={handleImageChange} className="file-input" />
                        {formData.imageUrl && !imageFile && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={formData.imageUrl} alt="Promo preview" style={{ height: '80px', borderRadius: '6px' }} />
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Saving..." : (editingId ? "Update Promo" : "Create Promo")}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} style={{ backgroundColor: '#6b7280' }}>Cancel Edit</button>
                        )}
                    </div>
                </form>
            </div>

            <div className="promo-list">
                <h3>Existing Banners</h3>
                {promos.length === 0 && <p>No promotional banners found.</p>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {promos.map(promo => (
                        <div key={promo.id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', padding: '15px', borderRadius: '8px', gap: '20px' }}>
                            <img src={promo.imageUrl} alt={promo.title} style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '6px' }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 5px 0' }}>{promo.title}</h4>
                                <p style={{ margin: '0 0 5px 0', color: '#4b5563', fontSize: '14px' }}>{promo.subtitle}</p>
                                <span style={{ fontSize: '12px', background: '#e5e7eb', padding: '3px 8px', borderRadius: '4px' }}>{promo.buttonText} &rarr; {promo.buttonLink}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button onClick={() => handleEdit(promo)} style={{ padding: '6px 12px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(promo.id)} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PromoManagement;
