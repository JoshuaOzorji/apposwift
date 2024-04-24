import Restaurant from "../models/restaurant.model";

const getAllRestaurants = async (req: Request, res: Response) => {
	try {
		const allRestaurants = await Restaurant.find();
		res.status(200).json(allRestaurants);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error fetching restaurants" });
	}
};

export default {
	getAllRestaurants,
};
