import { useState, useEffect } from "react";
import { getHeroSection, updateHeroSection, uploadImage } from "../services/productService";
import "./HeroManagement.css";

function HeroManagement() {
    const [heroData, setHeroData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        buttonText: "",
        buttonLink: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHeroSection()
            .then(res => {
                if (res.data) {
                    setHeroData(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching hero section", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setHeroData({ ...heroData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (selectedFile.size > maxSizeInBytes) {
                alert("Image size exceeds 5MB.");
                e.target.value = "";
                setImageFile(null);
            } else {
                setImageFile(selectedFile);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let finalImageUrl = heroData.imageUrl;

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                const uploadRes = await uploadImage(formData);
                finalImageUrl = uploadRes.data;
            }

            const dataToSubmit = {
                ...heroData,
                imageUrl: finalImageUrl
            };

            const res = await updateHeroSection(dataToSubmit);
            setHeroData(res.data);
            alert("✅ Hero Section updated successfully!");

            setImageFile(null);
            document.getElementById("heroImageInput").value = "";
        } catch (err) {
            console.error(err);
            alert("Error updating hero section");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Hero Data...</p>;

    return (
        <div className="hero-management">
            <h2>Manage Home Page Hero Section</h2>

            <div className="admin-form-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form className="edit-hero-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Main Title</label>
                        <input
                            name="title"
                            value={heroData.title}
                            onChange={handleChange}
                            placeholder="Discover Your Style"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description Body</label>
                        <textarea
                            name="description"
                            value={heroData.description}
                            onChange={handleChange}
                            placeholder="Premium clothing collections..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Button Text</label>
                            <input
                                name="buttonText"
                                value={heroData.buttonText}
                                onChange={handleChange}
                                placeholder="Shop Now"
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Button Link (#ID or /url)</label>
                            <input
                                name="buttonLink"
                                value={heroData.buttonLink}
                                onChange={handleChange}
                                placeholder="#categories or /path"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Background Image</label>
                        <input
                            type="file"
                            id="heroImageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input"
                        />
                        {heroData.imageUrl && !imageFile && (
                            <div style={{ marginTop: '15px' }}>
                                <small style={{ display: 'block', marginBottom: '5px' }}>Current Background:</small>
                                <img src={heroData.imageUrl} alt="Hero Background" style={{ width: '200px', borderRadius: '8px', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={submitting} style={{ marginTop: '10px' }}>
                        {submitting ? "Saving Updates..." : "Save Hero Section"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default HeroManagement;
