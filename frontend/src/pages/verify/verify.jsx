import React from "react";
import { Link } from "react-router-dom";
import "./Verify.css";

const Verify = () => {
  return (
    <div className="verify">
      <div className="verify-container">
        <div className="check-circle">✓</div>

        <h1>Order Confirmed!</h1>

        <p>
          Thank you for your order. Your delicious meal is being prepared and
          will be delivered soon.
        </p>

        <div className="order-info">
          <p><strong>Status:</strong> Order Received</p>
          <p><strong>Estimated Delivery:</strong> 30 - 45 mins</p>
        </div>

        <Link to="/">
          <button className="verify-btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Verify;