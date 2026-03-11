import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === product.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize state with first available options if any exist
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes.split(',')[0].trim() : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors.split(',')[0].trim() : ""
  );

  const handleAddToCart = () => {
    if (!isInCart) {
      const productWithOptions = {
        ...product,
        selectedSize,
        selectedColor
      };
      addToCart(productWithOptions);
      setIsModalOpen(false); // Optionally close modal on add
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <Link to={`/product/${product.id}`}>
            <img src={product.imageUrl} alt={product.name} />
          </Link>
          <div className="quick-view-btn" onClick={() => setIsModalOpen(true)}>Quick View</div>
        </div>

        <div className="product-info">
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{product.name}</h3>
          </Link>
          <p className="category">{product.category}</p>
          <p className="price">Rs. {product.price}</p>
        </div>

        <div className="product-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className={`btn-cart ${isInCart ? 'in-cart' : ''}`}
            onClick={
              (product.sizes || product.colors) && !isInCart
                ? () => setIsModalOpen(true)
                : handleAddToCart
            }
            disabled={isInCart && (!product.sizes && !product.colors)}
          >
            {isInCart ? 'In Cart' : ((product.sizes || product.colors) ? 'Select Options' : 'Add to Cart')}
          </button>
        </div>
      </div>

      {isModalOpen && mounted && createPortal(
        <div className="quick-view-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>×</button>

            <div className="modal-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="modal-info">
              <h2>{product.name}</h2>
              <div className="modal-tags">
                <span className="modal-category-badge">{product.category}</span>
                {product.type && <span className="modal-type-badge">{product.type}</span>}
              </div>

              <h3 className="modal-price">Rs. {product.price}</h3>
              <p className="modal-desc">{product.description || "No description available."}</p>

              {product.sizes && (
                <div className="modal-options">
                  <h4>Select Size:</h4>
                  <div className="modal-options-list">
                    {product.sizes.split(',').map(size => {
                      const s = size.trim();
                      return (
                        <span
                          key={s}
                          className={`modal-badge modal-size-badge ${selectedSize === s ? 'active' : ''}`}
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
                <div className="modal-options">
                  <h4>Select Color:</h4>
                  <div className="modal-options-list">
                    {product.colors.split(',').map(color => {
                      const c = color.trim();
                      const isLight = ['white', 'yellow', 'light'].some(l => c.toLowerCase().includes(l));
                      return (
                        <span
                          key={c}
                          className={`modal-badge modal-color-badge ${selectedColor === c ? 'active' : ''}`}
                          style={{
                            backgroundColor: c.toLowerCase(),
                            color: isLight ? '#000' : '#fff'
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
                className={`modal-add-btn ${isInCart ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? 'Already in Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default ProductCard;
