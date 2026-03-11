import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSubCategories } from "../services/productService";
import Breadcrumbs from "../components/Breadcrumbs";
import "./CategoryPage.css";

function CategoryPage() {
    const { categoryName } = useParams();
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSubCategories(categoryName)
            .then(res => {
                setTypes(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching sub categories", err);
                setLoading(false);
            });
    }, [categoryName]);

    if (!loading && !types.length) {
        return <div className="category-page error-page"><h2>Category Not Found</h2></div>;
    }

    return (
        <div className="category-page page-transition">
            <Breadcrumbs />
            <div className="category-header">
                <h1>{categoryName}'s Clothing</h1>
                <p>Explore our wide collection of {categoryName.toLowerCase()} fashion.</p>
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', margin: '40px 0' }}>Loading subcategories...</p>
            ) : (
                <div className="type-grid">
                    {types.map((type) => (
                        <Link
                            to={`/category/${categoryName}/${type.name}`}
                            key={type.id}
                            className="type-card"
                        >
                            <div className="type-image" style={{ backgroundImage: `url(${type.imageUrl})` }}></div>
                            <div className="type-name">{type.name}</div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
