import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = () => {
  const { food_list = [] } = useContext(StoreContext);

  // Get unique categories in the order they appear
  const categories = [...new Set(food_list.map((item) => item.category))];

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      {categories.map((category) => (
        <div key={category} id={category} className="food-category-section">
          <h3 className="food-category-title">{category}</h3>

          <div className="food-display-list">
            {food_list
              .filter((item) => item.category === category)
              .map((item) => (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDisplay;