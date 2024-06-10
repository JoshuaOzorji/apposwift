"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const getAllRestaurants = async (req, res) => {
    try {
        const allRestaurants = await restaurant_model_1.default.find();
        res.status(200).json(allRestaurants);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching restaurants" });
    }
};
exports.default = {
    getAllRestaurants,
};
