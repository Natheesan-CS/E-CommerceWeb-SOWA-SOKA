import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const shippingFee = totalPrice > 0 ? 500 : 0;
  const grandTotal = totalPrice + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty 🛒</h2>
        <p>Add some clothing items to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-main">
        {/* LEFT SIDE – CART ITEMS */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p className="price">Rs. {item.price}</p>

                <div className="quantity-control">
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                  />
                </div>

                <p className="subtotal">
                  Subtotal: Rs. {item.price * item.quantity}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items Total</span>
            <span>Rs. {totalPrice}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Rs. {shippingFee}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Grand Total</span>
            <span>Rs. {grandTotal}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
