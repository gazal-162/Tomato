import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, token } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (!token) {
      toast.info("Please sign in to place your order.");
      navigate("/");
    }
  }, [token, navigate]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    notes: "",
    payment: "Cash on Delivery",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const placeOrder = async (event) => {
    event.preventDefault();

    if (getTotalCartAmount() === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        navigate("/verify");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">📍 Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
          />

          <input
            required
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
          />
        </div>

        <input
          required
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
        />

        <input
          required
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="123 Residency Road"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
          />

          <input
            required
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            placeholder="ZIP Code"
            pattern="[0-9]{6}"
            title="ZIP code must be 6 digits"
          />

          <input
            required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
          />
        </div>

        <input
          required
          type="tel"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="9876543210"
          maxLength="10"
          pattern="[0-9]{10}"
          title="Phone number must be exactly 10 digits"
        />

        <textarea
          name="notes"
          value={data.notes}
          onChange={onChangeHandler}
          placeholder="Special Instructions (Optional)"
        />

        <div className="payment-section">
          <h3>💳 Payment Method</h3>

          <label className="payment-option">
            <input type="radio" checked readOnly />
            Cash on Delivery (Available)
          </label>

          <label className="payment-option">
            <input type="radio" disabled />
            Online Payment (Coming Soon)
          </label>
        </div>
      </div>

      <div className="place-order-right">
        <div className="order-summary">
          <h2>🛒 Order Summary</h2>

          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="order-item" key={item._id}>
                  <p>
                    {item.name} × {cartItems[item._id]}
                  </p>

                  <p>${item.price * cartItems[item._id]}</p>
                </div>
              );
            }

            return null;
          })}

          <hr />

          <div className="summary-details">
            <p>Items</p>
            <p>{totalItems}</p>
          </div>

          <div className="summary-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <div className="summary-details">
            <p>Delivery Fee</p>
            <p>$2</p>
          </div>

          <hr />

          <div className="summary-details total">
            <b>Total</b>
            <b>${getTotalCartAmount() + 2}</b>
          </div>

          <div className="delivery-time">
            🚚 Estimated Delivery
            <br />
            <b>30-45 Minutes</b>
          </div>

          <button
            className="place-order-btn"
            type="submit"
            disabled={getTotalCartAmount() === 0}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;