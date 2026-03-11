import { useState, useEffect } from "react";
import { getFooterSettings, updateFooterSettings } from "../services/productService";
import "./HeroManagement.css";

function FooterManagement() {
    const [formData, setFormData] = useState({
        aboutText: "",
        contactEmail: "",
        contactPhone: "",
        contactAddress: "",
        facebookLink: "",
        instagramLink: "",
        twitterLink: ""
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getFooterSettings()
            .then(res => {
                if (res.data) setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching footer settings", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await updateFooterSettings(formData);
            setFormData(res.data);
            alert("✅ Footer settings updated successfully!");
        } catch (err) {
            console.error("Error updating footer settings", err);
            alert("Failed to update footer settings.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading Footer Settings...</p>;

    return (
        <div className="hero-management">
            <h2>Manage Global Footer Settings</h2>

            <div className="admin-form-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form className="edit-hero-form" onSubmit={handleSubmit}>

                    <h3>About Content</h3>
                    <div className="form-group">
                        <label>About Us Text</label>
                        <textarea
                            name="aboutText"
                            value={formData.aboutText}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <h3 style={{ marginTop: '20px' }}>Contact Information</h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Support Email</label>
                            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Phone Number</label>
                            <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Physical Address</label>
                        <input type="text" name="contactAddress" value={formData.contactAddress} onChange={handleChange} required />
                    </div>

                    <h3 style={{ marginTop: '20px' }}>Social Media Links</h3>
                    <div className="form-group">
                        <label>Facebook URL</label>
                        <input type="url" name="facebookLink" value={formData.facebookLink} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Instagram URL</label>
                        <input type="url" name="instagramLink" value={formData.instagramLink} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Twitter/X URL</label>
                        <input type="url" name="twitterLink" value={formData.twitterLink} onChange={handleChange} />
                    </div>

                    <button type="submit" disabled={submitting} style={{ marginTop: '20px' }}>
                        {submitting ? "Saving Updates..." : "Save Footer Settings"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default FooterManagement;
