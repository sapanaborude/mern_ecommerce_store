import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors({
  origin: ["https://mern-ecommerce-store-frontend-pum9.onrender.com/"],
}));
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subcategory", subCategoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
