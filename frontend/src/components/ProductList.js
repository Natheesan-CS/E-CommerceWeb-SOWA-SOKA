import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="product-list-container">
      <h2 className="section-title">Latest Collections</h2>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
