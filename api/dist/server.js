"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const MyUserRoute_1 = __importDefault(require("./routes/MyUserRoute"));
const cloudinary_1 = require("cloudinary");
const MyRestaurantRoute_1 = __importDefault(require("./routes/MyRestaurantRoute"));
const RestaurantRoutes_1 = __importDefault(require("./routes/RestaurantRoutes"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const AllRestaurantsRoute_1 = __importDefault(require("./routes/AllRestaurantsRoute"));
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to database"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/api/order/checkout/webhook", express_1.default.raw({ type: "*/*" }));
app.use(express_1.default.json());
// app.get("/test", async (req: Request, res: Response) => {
// 	res.json({ message: "test message" });
// });
app.get("/health", async (req, res) => {
    res.send({ message: "health OK!" });
});
app.use("/api/my/user", MyUserRoute_1.default);
app.use("/api/my/restaurant", MyRestaurantRoute_1.default);
app.use("/api/restaurant", RestaurantRoutes_1.default);
app.use("/api/restaurants", AllRestaurantsRoute_1.default);
app.use("/api/order", OrderRoute_1.default);
app.listen(7000, () => {
    console.log("server running successfully");
});
