import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();
router.get(
	"/:restaurantId",
	param("restaurantId")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("RestaurantId parameter must be a valid string"),
	RestaurantController.getRestaurant,
);

router.get(
	"/search/:city",
	param("city")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("City parameter must be a valid string"),
	RestaurantController.searchRestaurant,
);

router.get(
	"/search",
	param("city")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("City parameter must be a valid string"),
	RestaurantController.searchFunction,
);

router.get("/", RestaurantController.featuredRestaurants);

export default router;
