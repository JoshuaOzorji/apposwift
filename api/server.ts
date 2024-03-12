import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log("Connected to database"));

const app = express();

app.use(cors());

app.use(express.json());

// app.get("/test", async (req: Request, res: Response) => {
// 	res.json({ message: "test message" });
// });

app.use("/api/my/user", myUserRoute);

app.listen(7000, () => {
	console.log("server running on http://localhost:7000");
});
