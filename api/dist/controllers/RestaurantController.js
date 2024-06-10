"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuredRestaurants = void 0;
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const getRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurant = await restaurant_model_1.default.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.json(restaurant);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
const getAllRestaurants = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const sortOption = req.query.sortOption || "lastUpdated";
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        let query = {};
        const restaurant = await restaurant_model_1.default.find(query)
            .sort({ [sortOption]: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean();
        const total = await restaurant_model_1.default.countDocuments(query);
        const response = {
            data: restaurant,
            pagination: { total, page, pages: Math.ceil(total / pageSize) },
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching restaurants" });
    }
};
const featuredRestaurants = async (req, res) => {
    try {
        const featured = await restaurant_model_1.default.find();
        featured.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
        const lastFiveHotels = featured.slice(0, 4);
        res.status(200).json(lastFiveHotels);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching restaurants" });
    }
};
exports.featuredRestaurants = featuredRestaurants;
const searchRestaurant = async (req, res) => {
    try {
        const city = req.params.city;
        const searchQuery = req.query.searchQuery || "";
        const selectedCuisines = req.query.selectedCuisines || "";
        const sortOption = req.query.sortOption || "lastUpdated";
        const page = parseInt(req.query.page) || 1;
        let query = {};
        query["city"] = new RegExp(city, "i");
        const cityCheck = await restaurant_model_1.default.countDocuments(query);
        if (cityCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1,
                },
            });
        }
        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines
                .split(",")
                .map((cuisine) => new RegExp(cuisine, "i"));
            query["cuisines"] = { $all: cuisinesArray };
        }
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } },
            ];
        }
        const pageSize = 5;
        const skip = (page - 1) * pageSize;
        // sortOption = "lastUpdated"
        const restaurants = await restaurant_model_1.default.find(query)
            .sort({ [sortOption]: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean();
        const total = await restaurant_model_1.default.countDocuments(query);
        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            },
        };
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.default = {
    getRestaurant,
    searchRestaurant,
    featuredRestaurants: exports.featuredRestaurants,
    getAllRestaurants,
};
