import express from "express";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get("/", RestaurantController.getAllRestaurants);

export default router;
