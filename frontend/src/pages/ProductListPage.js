import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import "./ProductListPage.css";

function ProductListPage() {
    const { categoryName, type } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Scroll to top when category or type changes
        window.scrollTo(0, 0);
        setLoading(true);

        getAllProducts()
            .then(res => {
                // Filter products by category (Men/Women/Kids) and type
                const filtered = res.data.filter(product => {
                    const prodCategory = product.category ? product.category.toLowerCase().replace("'s", "") : "";
                    const urlCategory = categoryName ? categoryName.toLowerCase().replace("'s", "") : "";

                    const prodType = product.type ? product.type.toLowerCase().trim() : "";
                    const urlType = type ? type.toLowerCase().trim() : "";

                    return prodCategory === urlCategory && prodType === urlType;
                });
                setProducts(filtered);
            })
            .catch(err => console.error("Failed to fetch products", err))
            .finally(() => setLoading(false));
    }, [categoryName, type]);

    return (
        <div className="product-list-page">
            <div className="page-header">
                <div className="breadcrumbs">
                    <Link to="/">Home</Link> &gt;
                    <Link to={`/category/${categoryName}`}> {categoryName}</Link> &gt;
                    <span> {type}</span>
                </div>
                <h1>{categoryName}'s {type}</h1>
            </div>

            {loading ? (
                <div className="loading-state">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <h2>No products found</h2>
                    <p>We couldn't find any {type} in the {categoryName} category right now. Check back later!</p>
                    <Link to={`/category/${categoryName}`} className="back-btn">Browse other {categoryName}'s clothing</Link>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductListPage;
