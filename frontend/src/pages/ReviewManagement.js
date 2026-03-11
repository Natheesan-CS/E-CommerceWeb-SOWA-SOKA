import { useState, useEffect } from "react";
import { getCustomerReviews, createCustomerReview, updateCustomerReview, deleteCustomerReview } from "../services/productService";
import "./HeroManagement.css";

function ReviewManagement() {
    const [reviews, setReviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        customerName: "",
        rating: 5,
        reviewText: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = () => {
        setLoading(true);
        getCustomerReviews()
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading reviews", err);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ customerName: "", rating: 5, reviewText: "" });
        setEditingId(null);
    };

    const handleEdit = (review) => {
        setFormData(review);
        setEditingId(review.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await deleteCustomerReview(id);
                loadReviews();
            } catch (err) {
                console.error("Error deleting review", err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCustomerReview(editingId, formData);
            } else {
                await createCustomerReview(formData);
            }
            resetForm();
            loadReviews();
        } catch (err) {
            console.error("Error submitting review", err);
            alert("Error saving review");
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading Reviews...</p>;

    return (
        <div className="hero-management">
            <h2>Manage Customer Reviews</h2>

            <div className="admin-form-section" style={{ marginBottom: '40px' }}>
                <form className="edit-hero-form" onSubmit={handleSubmit}>
                    <h3>{editingId ? "Edit Review" : "Add New Review"}</h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Customer Name</label>
                            <input name="customerName" value={formData.customerName} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Rating (1-5)</label>
                            <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Review Text</label>
                        <textarea name="reviewText" rows="3" value={formData.reviewText} onChange={handleChange} required />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit">
                            {editingId ? "Update Review" : "Add Review"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} style={{ backgroundColor: '#6b7280' }}>Cancel Edit</button>
                        )}
                    </div>
                </form>
            </div>

            <div className="promo-list">
                <h3>Existing Reviews</h3>
                {reviews.length === 0 && <p>No reviews added yet.</p>}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {reviews.map(review => (
                        <div key={review.id} style={{ border: '1px solid #e5e7eb', padding: '15px', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h4 style={{ margin: 0 }}>{review.customerName}</h4>
                                <span style={{ color: '#fbbf24' }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                            </div>
                            <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#4b5563', fontStyle: 'italic' }}>"{review.reviewText}"</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => handleEdit(review)} style={{ padding: '4px 10px', fontSize: '12px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(review.id)} style={{ padding: '4px 10px', fontSize: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewManagement;
