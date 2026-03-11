import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory, uploadImage, seedCategories } from "../services/productService";
import "./CategoryManagement.css";

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
        imageUrl: "",
        parentCategory: "" // Empty means it is a Main Category
    });
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
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
        if (!newCategory.name.trim()) return alert("Category Name is required");

        setSubmitting(true);
        try {
            let finalImageUrl = newCategory.imageUrl;

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                const uploadRes = await uploadImage(formData);
                finalImageUrl = uploadRes.data;
            }

            // If parentCategory is empty string, convert to null for the backend
            const parentCat = newCategory.parentCategory === "" ? null : newCategory.parentCategory;

            const categoryToSubmit = {
                ...newCategory,
                parentCategory: parentCat,
                imageUrl: finalImageUrl
            };

            if (editingCategoryId) {
                await updateCategory(editingCategoryId, categoryToSubmit);
                alert("✅ Category updated successfully!");
            } else {
                await createCategory(categoryToSubmit);
                alert("✅ Category created successfully!");
            }

            // Reset form
            setNewCategory({ name: "", description: "", imageUrl: "", parentCategory: "" });
            setImageFile(null);
            setEditingCategoryId(null);
            document.getElementById("catImageInput").value = "";

            // Refresh list
            fetchCategories();
        } catch (err) {
            console.error(err);
            alert("Error creating category");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (err) {
                console.error(err);
                alert("Error deleting category");
            }
        }
    };

    const handleEdit = (cat) => {
        setNewCategory({
            name: cat.name,
            description: cat.description || "",
            imageUrl: cat.imageUrl || "",
            parentCategory: cat.parentCategory || ""
        });
        setEditingCategoryId(cat.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setNewCategory({ name: "", description: "", imageUrl: "", parentCategory: "" });
        setEditingCategoryId(null);
        setImageFile(null);
        document.getElementById("catImageInput").value = "";
    };

    const handleSeedCategories = async () => {
        if (window.confirm("This will automatically create the Men, Women, and Kids categories. Continue?")) {
            try {
                await seedCategories();
                alert("Categories seeded successfully!");
                fetchCategories();
            } catch (err) {
                console.error(err);
                alert("Warning: Database might not be empty or server error occurred.");
            }
        }
    };

    // Derived arrays
    const mainCategories = categories.filter(c => !c.parentCategory);
    const subCategories = categories.filter(c => c.parentCategory);

    return (
        <div className="category-management">
            <h2>Manage Categories</h2>

            <div className="admin-grid-layout">
                <div className="admin-form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0 }}>{editingCategoryId ? "Edit Category" : "Create New Category / Type"}</h3>
                        {categories.length === 0 && !editingCategoryId && (
                            <button onClick={handleSeedCategories} style={{ background: 'var(--color-primary)', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                + Auto-Fill Basic Categories
                            </button>
                        )}
                    </div>

                    <form className="add-category-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                name="name"
                                value={newCategory.name}
                                onChange={handleChange}
                                placeholder="e.g. Men, T-Shirts, Dresses"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Parent Category</label>
                            <select name="parentCategory" value={newCategory.parentCategory} onChange={handleChange} className="cat-select">
                                <option value="">None (Make this a Main Category)</option>
                                {mainCategories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                            <small>If you select None, this will be a top-level category like Men/Women.</small>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={newCategory.description}
                                onChange={handleChange}
                                placeholder="Short description..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Preview Image</label>
                            <input
                                type="file"
                                id="catImageInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input"
                            />
                            {editingCategoryId && newCategory.imageUrl && !imageFile && (
                                <small>Current Image: <img src={newCategory.imageUrl} alt="preview" style={{ width: '30px', height: '30px', objectFit: 'cover', marginLeft: '10px', verticalAlign: 'middle' }} /></small>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" disabled={submitting} style={{ flex: 1 }}>
                                {submitting ? "Saving..." : (editingCategoryId ? "Update Category" : "Create Category")}
                            </button>
                            {editingCategoryId && (
                                <button type="button" onClick={handleCancelEdit} style={{ flex: 1, backgroundColor: '#6b7280' }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="admin-list-section">
                    <h3>Existing Main Categories</h3>
                    {loading ? <p>Loading...</p> : (
                        <div className="category-list">
                            {mainCategories.length === 0 && <p className="empty-msg">No main categories found.</p>}
                            {mainCategories.map(cat => (
                                <div key={cat.id} className="admin-cat-card main-cat">
                                    <img src={cat.imageUrl || "https://via.placeholder.com/100"} alt={cat.name} />
                                    <div className="admin-cat-info">
                                        <strong>{cat.name}</strong>
                                        <p>{cat.description}</p>
                                    </div>
                                    <button className="del-btn" style={{ backgroundColor: '#e5e7eb', color: '#374151' }} onClick={() => handleEdit(cat)}>Edit</button>
                                    <button className="del-btn" onClick={() => handleDelete(cat.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <h3 style={{ marginTop: '30px' }}>Existing Clothing Types</h3>
                    {loading ? <p>Loading...</p> : (
                        <div className="category-list sub-list">
                            {subCategories.length === 0 && <p className="empty-msg">No sub-categories found.</p>}
                            {subCategories.map(cat => (
                                <div key={cat.id} className="admin-cat-card sub-cat">
                                    <img src={cat.imageUrl || "https://via.placeholder.com/100"} alt={cat.name} />
                                    <div className="admin-cat-info">
                                        <strong>{cat.name}</strong>
                                        <span className="parent-badge">Under: {cat.parentCategory}</span>
                                    </div>
                                    <button className="del-btn" style={{ backgroundColor: '#e5e7eb', color: '#374151' }} onClick={() => handleEdit(cat)}>Edit</button>
                                    <button className="del-btn" onClick={() => handleDelete(cat.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryManagement;
