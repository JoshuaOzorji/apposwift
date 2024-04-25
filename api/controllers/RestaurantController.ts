import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";

const getRestaurant = async (req: Request, res: Response) => {
	try {
		const restaurantId = req.params.restaurantId;
		const restaurant = await Restaurant.findById(restaurantId);

		if (!restaurant) {
			return res.status(404).json({ message: "Restaurant not found" });
		}
		res.json(restaurant);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getAllRestaurants = async (req: Request, res: Response) => {
	const page = parseInt(req.query.page as string) || 1;
	const pageSize = parseInt(req.query.pageSize as string) || 10;

	try {
		const totalCount = await Restaurant.countDocuments();
		const totalPages = Math.ceil(totalCount / pageSize);

		const restaurants = await Restaurant.find()
			.skip((page - 1) * pageSize)
			.limit(pageSize);

		res.status(200).json({
			restaurants,
			totalPages,
			currentPage: pageSize,
			pageSize,
			totalCount,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error fetching restaurants" });
	}
};

export const featuredRestaurants = async (req: Request, res: Response) => {
	try {
		const featured = await Restaurant.find();
		featured.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
		const lastFiveHotels = featured.slice(0, 4);
		res.status(200).json(lastFiveHotels);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error fetching restaurants" });
	}
};

interface Query {
	city?: RegExp;
	cuisines?: { $all: RegExp[] };
	[key: string]: any;
}
const searchRestaurant = async (req: Request, res: Response) => {
	try {
		let query: Query = {};

		const city = req.params.city;
		if (city) {
			query["city"] = new RegExp(city, "i");
		}

		const searchQuery = req.query.searchQuery as string;
		if (searchQuery) {
			const searchRegex = new RegExp(searchQuery, "i");
			query["$or"] = [
				{ restaurantName: searchRegex },
				{ cuisines: { $in: [searchRegex] } },
			];
		}

		const selectedCuisines = req.query.selectedCuisines as string;
		if (selectedCuisines) {
			const cuisinesArray = selectedCuisines
				.split(",")
				.map((cuisine) => new RegExp(cuisine, "i"));
			query["cuisines"] = { $all: cuisinesArray };
		}

		const sortOption = (req.query.sortOption as string) || "lastUpdated";

		const pageSize = 5;
		const page = parseInt(req.query.page as string) || 1;
		const skip = (page - 1) * pageSize;

		let restaurants;
		let total;

		if (Object.keys(query).length === 0) {
			// If no city is specified, return all restaurants
			restaurants = await Restaurant.find()
				.sort({ [sortOption]: 1 })
				.skip(skip)
				.limit(pageSize)
				.lean();
			total = await Restaurant.countDocuments();
		} else {
			// If city is specified, perform city-based search
			restaurants = await Restaurant.find(query)
				.sort({ [sortOption]: 1 })
				.skip(skip)
				.limit(pageSize)
				.lean();
			total = await Restaurant.countDocuments(query);
		}

		const response = {
			data: restaurants,
			pagination: {
				total,
				page,
				pages: Math.ceil(total / pageSize),
			},
		};
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

export default {
	getRestaurant,
	searchRestaurant,
	featuredRestaurants,
	getAllRestaurants,
};
