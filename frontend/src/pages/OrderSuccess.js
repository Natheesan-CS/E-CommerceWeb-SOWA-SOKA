import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for shopping with SOKA.</p>
      <p>You will be redirected to Home shortly.</p>
    </div>
  );
}

export default OrderSuccess;
