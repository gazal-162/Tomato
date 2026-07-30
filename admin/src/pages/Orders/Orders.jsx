import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import parcel_icon from "../../assets/parcel_icon.png";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        alert("Error fetching orders");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders">
      <h2>📦 Customer Orders</h2>

      {orders.map((order) => {

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="order-item" key={order._id}>

      <img
        className="order-icon"
        src={parcel_icon}
        alt="Parcel"
      />

      <div className="order-left">

        <h3>Order #{order._id.slice(-6)}</h3>

        <div className="order-items">

          {order.items.map((item, index) => (
            <p key={index}>
              {item.name} × {item.quantity}
            </p>
          ))}

        </div>

        <p>
          <strong>Customer:</strong>{" "}
          {order.address.firstName} {order.address.lastName}
        </p>

        <p>
          <strong>Email:</strong> {order.address.email}
        </p>

        <p>
          <strong>Phone:</strong> {order.address.phone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {order.address.street}, {order.address.city},{" "}
          {order.address.state}, {order.address.country}
        </p>

        <p>
          <strong>Items:</strong> {totalItems}
        </p>

        <p>
          <strong>Amount:</strong> ${order.amount}
        </p>

        <p>
          <strong>Payment:</strong>{" "}
          {order.payment ? "Paid Online" : "Cash on Delivery"}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.date).toLocaleString()}
        </p>

      </div>

      <div className="order-right">

        <select
          value={order.status}
          onChange={(event) =>
            statusHandler(event, order._id)
          }
        >
          <option value="Food Processing">
            Food Processing
          </option>

          <option value="Out for Delivery">
            Out for Delivery
          </option>

          <option value="Delivered">
            Delivered
          </option>
        </select>

      </div>

    </div>
  );

})}
    </div>
  );
};

export default Orders;