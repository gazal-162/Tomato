import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB Connected");
    console.log("Database:", mongoose.connection.name);

  } catch (error) {
  console.error("MongoDB Connection Error:", error);
}
};