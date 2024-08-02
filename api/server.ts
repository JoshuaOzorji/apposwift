import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoutes";
import orderRoute from "./routes/OrderRoute";
import allRestaurantsRoute from "./routes/AllRestaurantsRoute";
import job from "./cron.js";

mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log("Connected to database"));

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(cors());
job.start();

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

// app.get("/test", async (req: Request, res: Response) => {
// 	res.json({ message: "test message" });
// });

app.get("/health", async (req: Request, res: Response) => {
	res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/restaurants", allRestaurantsRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
	console.log("server running successfully");
});
