import { deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";
import "./AdminProductCard.css";

function AdminProductCard({ product, onDelete }) {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            deleteProduct(product.id)
                .then(() => onDelete(product.id))
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="admin-product-card">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">Rs. {product.price}</p>
            </div>

            <div className="product-actions">
                <Link to={`/edit-product/${product.id}`}>
                    <button className="btn-edit">Edit Product</button>
                </Link>

                <button className="btn-delete" onClick={handleDelete}>
                    Delete Product
                </button>
            </div>
        </div>
    );
}

export default AdminProductCard;
