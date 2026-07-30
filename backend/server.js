import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 4000;



// Middleware
app.use(express.json());
app.use(cors());

// Database
connectDB();

// Routes
app.use("/api/food", foodRouter);
// user route
app.use("/api/user", userRouter);
// cart router
app.use("/api/cart", cartRouter);
// order route
app.use("/api/order", orderRouter);
// Images
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});