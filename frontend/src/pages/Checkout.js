import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customer.name || !customer.email || !customer.address) {
      alert("Please fill all required fields");
      return;
    }

    // TEMP: backend later
    console.log("Order:", {
      customer,
      items: cartItems,
      total: totalPrice
    });

    // ✅ CLEAR CART
    clearCart();

    // ✅ REDIRECT TO SUCCESS PAGE
    navigate("/order-success");
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-main">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h3>Customer Information</h3>

          <input
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={customer.address}
            onChange={handleChange}
            required
          />

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>

          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <strong>Total</strong>
            <strong>Rs. {totalPrice}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
