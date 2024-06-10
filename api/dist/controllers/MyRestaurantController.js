"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("../models/order.model"));
const getMyRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurant_model_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
        res.json(restaurant);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching restaurant" });
    }
};
const createMyRestaurant = async (req, res) => {
    try {
        const existingRestaurant = await restaurant_model_1.default.findOne({
            user: req.userId,
        });
        if (existingRestaurant) {
            return res
                .status(409)
                .json({ message: "User restaurant already exists" });
        }
        const imageUrl = await uploadImage(req.file);
        const restaurant = new restaurant_model_1.default(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose_1.default.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();
        res.status(201).send(restaurant);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
const updateMyRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurant_model_1.default.findOne({
            user: req.userId,
        });
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();
        if (req.file) {
            const imageUrl = await uploadImage(req.file);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        res.status(200).send(restaurant);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
const getMyRestaurantOrders = async (req, res) => {
    try {
        const restaurant = await restaurant_model_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
        const orders = await order_model_1.default.find({ restaurant: restaurant._id })
            .populate("restaurant")
            .populate("user");
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await order_model_1.default.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const restaurant = await restaurant_model_1.default.findById(order.restaurant);
        if (restaurant?.user?._id.toString() !== req.userId) {
            return res.status(401).send();
        }
        order.status = status;
        await order.save();
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "unable to update order status" });
    }
};
const uploadImage = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary_1.default.v2.uploader.upload(dataURI);
    return uploadResponse.url;
};
exports.default = {
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant,
    getMyRestaurantOrders,
    updateOrderStatus,
};
