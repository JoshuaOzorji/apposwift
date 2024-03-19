import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
	try {
		const existingRestaurant = await Restaurant.findOne({
			user: req.userId,
		});

		if (existingRestaurant) {
			return res
				.status(409)
				.json({ message: "User restaurant already exists" });
		}

		const imageUrl = await uploadImage(req.file as Express.Multer.File);
	} catch (error) {}
};

const uploadImage = async (file: Express.Multer.File) => {
	const image = file;

	const base64Image = Buffer.from(image.buffer).toString("base64");

	const dataURI = `data:${image.mimetype};base64,${base64Image}`;

	const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

	return uploadResponse.url;
};

export default {
	createMyRestaurant,
};
