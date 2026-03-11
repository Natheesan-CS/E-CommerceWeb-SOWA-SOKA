import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import Breadcrumbs from "../components/Breadcrumbs";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useCart();
  const isInCart = product ? cartItems.some(item => item.id === product.id) : false;

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description"); // Tabs state

  const handleAddToCart = () => {
    if (!isInCart) {
      const productWithOptions = {
        ...product,
        selectedSize,
        selectedColor
      };
      addToCart(productWithOptions);
    }
  };

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setProduct(res.data);
        // Pre-select first options if available
        if (res.data.sizes) setSelectedSize(res.data.sizes.split(',')[0].trim());
        if (res.data.colors) setSelectedColor(res.data.colors.split(',')[0].trim());
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="loading">Loading product...</p>;
  }

  // Create custom breadcrumbs for the product
  const productCrumbs = [
    { label: "Shop", path: "/shop" },
    { label: product.category, path: `/category/${product.category}` },
    ...(product.type ? [{ label: product.type, path: `/category/${product.category}/${product.type}` }] : []),
    { label: product.name, path: `/product/${product.id}` }
  ];

  return (
    <div className="product-details-container page-transition">
      <Breadcrumbs customCrumbs={productCrumbs} />
      <div className="product-details-card">
        <div className="details-image">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
          />
        </div>

        <div className="details-info">
          <h2>{product.name}</h2>

          <div className="product-tags">
            <span className="category-badge">
              {product.category}
            </span>
            {product.type && (
              <span className="type-badge">
                {product.type}
              </span>
            )}
          </div>

          <h3 className="price">Rs. {product.price}</h3>

          {product.sizes && (
            <div className="product-options">
              <h4>Available Sizes:</h4>
              <div className="options-list">
                {product.sizes.split(',').map(size => {
                  const s = size.trim();
                  return (
                    <span
                      key={s}
                      className={`option-badge size-badge ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="product-options">
              <h4>Available Colors:</h4>
              <div className="options-list">
                {product.colors.split(',').map(color => {
                  const c = color.trim();
                  return (
                    <span
                      key={c}
                      className={`option-badge color-badge ${selectedColor === c ? 'active' : ''}`}
                      style={{
                        backgroundColor: c.toLowerCase(),
                        color: ['white', 'yellow', 'light'].some(light => c.toLowerCase().includes(light)) ? '#000' : '#fff'
                      }}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <button
            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button
            className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping & Returns
          </button>
        </div>

        <div className="tab-content page-transition" key={activeTab}>
          {activeTab === 'description' && (
            <div className="tab-pane">
              <h3>Product Description</h3>
              <p>{product.description || "No detailed description available for this product."}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="tab-pane">
              <h3>Specifications</h3>
              <ul className="specs-list">
                <li><strong>Brand:</strong> SOKA Originals</li>
                <li><strong>Material:</strong> Premium Quality Fabric</li>
                <li><strong>Fit:</strong> Standard/Regular</li>
                <li><strong>Care:</strong> Machine Wash Cold</li>
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="tab-pane">
              <h3>Shipping & Returns Policy</h3>
              <p><strong>Free Shipping</strong> on orders over Rs. 5000.</p>
              <p>Standard delivery takes 3-5 business days. Express shipping options available at checkout.</p>
              <p>We offer a hassle-free 14-day return policy. If you are not completely satisfied, return the item in its original condition for a full refund or exchange.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
