import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import AdminProductCard from "../components/AdminProductCard";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        getAllProducts()
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-header">
                <h2 className="section-title">Admin Dashboard</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link to="/admin/hero">
                        <button className="btn-add-product" style={{ backgroundColor: 'var(--color-primary)' }}>Manage Hero</button>
                    </Link>
                    <Link to="/admin/promos">
                        <button className="btn-add-product" style={{ backgroundColor: '#8b5cf6' }}>Manage Promos</button>
                    </Link>
                    <Link to="/admin/reviews">
                        <button className="btn-add-product" style={{ backgroundColor: '#ec4899' }}>Manage Reviews</button>
                    </Link>
                    <Link to="/admin/footer">
                        <button className="btn-add-product" style={{ backgroundColor: '#14b8a6' }}>Manage Footer</button>
                    </Link>
                    <Link to="/admin/categories">
                        <button className="btn-add-product" style={{ backgroundColor: '#4b5563' }}>Manage Categories</button>
                    </Link>
                    <Link to="/add-product">
                        <button className="btn-add-product">Add Product</button>
                    </Link>
                </div>
            </div>

            <div className="admin-product-grid">
                {products.length === 0 ? (
                    <p className="no-products">No products found. Start adding some!</p>
                ) : (
                    products.map(product => (
                        <AdminProductCard
                            key={product.id}
                            product={product}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
