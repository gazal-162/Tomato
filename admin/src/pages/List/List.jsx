import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
const url = import.meta.env.VITE_API_URL;
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

    
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch food list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the food list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      fetchList(); // Refresh the list
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete food");
  }
};



  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
<p
  style={{ cursor: "pointer" }}
  onClick={() => removeFood(item._id)}
>
  X
</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;