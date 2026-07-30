import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">

      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h3>No Orders Yet</h3>
          <p>Looks like you haven't placed any orders.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>

            <div className="order-header">
              <h3>Order #{order._id.slice(-6)}</h3>

              <span className="status">
                {order.status || "Food Processing"}
              </span>
            </div>

            <div className="order-items">

              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} × {item.quantity}
                </p>
              ))}

            </div>

            <div className="order-footer">

              <p>
                <strong>Total:</strong> ${order.amount}
              </p>

              <p>
                <strong>Delivery:</strong> 30-45 Minutes
              </p>

            </div>
<div className="order-tracker">

  <div
    className={`tracker-step ${
      order.status === "Food Processing" ||
      order.status === "Out for Delivery" ||
      order.status === "Delivered"
        ? "completed"
        : ""
    }`}
  >
    <div className="tracker-circle"></div>
    <span>Food Processing</span>
  </div>

  <div
    className={`tracker-step ${
      order.status === "Out for Delivery" ||
      order.status === "Delivered"
        ? "completed"
        : ""
    }`}
  >
    <div className="tracker-circle"></div>
    <span>Out for Delivery</span>
  </div>

  <div
    className={`tracker-step ${
      order.status === "Delivered"
        ? "completed"
        : ""
    }`}
  >
    <div className="tracker-circle"></div>
    <span>Delivered</span>
  </div>

</div>
            <button
              className="track-btn"
              onClick={fetchOrders}
            >
              Refresh Status
            </button>

          </div>
        ))
      )}

    </div>
  );
};

export default MyOrders;