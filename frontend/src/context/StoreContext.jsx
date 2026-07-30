import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

const url = import.meta.env.VITE_API_URL;

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // const token = localStorage.getItem("token");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Fetch Food List
const fetchFoodList = async () => {
  try {
    const response = await axios.get(`${url}/api/food/list`);

    console.log("Full Response:", response.data);
    console.log("Food Array:", response.data.data);
    console.log("Number of Foods:", response.data.data.length);

    if (response.data.success) {
      setFoodList(response.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
  // Load Cart From Database
  const loadCartData = async () => {

    try {

      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // Add Item
  const addToCart = async (itemId) => {

    if (!cartItems[itemId]) {

      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));

    } else {

      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));

    }

    if (token) {

      try {

        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: {
              token,
            },
          }
        );

      } catch (error) {
        console.log(error);
      }

    }

  };

  // Remove Item
  const removeFromCart = async (itemId) => {

    setCartItems((prev) => {

      const updatedCart = { ...prev };

      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] -= 1;
      }

      return updatedCart;
    });

    if (token) {

      try {

        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: {
              token,
            },
          }
        );

      } catch (error) {
        console.log(error);
      }

    }

  };

  // Cart Total
  const getTotalCartAmount = () => {

    let totalAmount = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        const itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }

      }

    }

    return totalAmount;

  };

useEffect(() => {

  async function loadData() {

    await fetchFoodList();

    if (token) {
      await loadCartData();
    }

  }

  loadData();

}, [token]);

const contextValue = {
  url,
  food_list,
  cartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  token,
  setToken,
};

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;