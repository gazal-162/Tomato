import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";




// Place Order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

// User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.body.userId,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};

// List All Orders (Admin)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};

// Update Order Status
const updateStatus = async (req, res) => {
  try {

    await orderModel.findByIdAndUpdate(
      req.body.orderId,
      {
        status: req.body.status,
      }
    );

    res.json({
      success: true,
      message: "Order Status Updated",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error Updating Status",
    });

  }
};

export {
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
};