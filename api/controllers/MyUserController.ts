import { Request, Response } from "express";
import User from "../models/user.model";

const getCurrentUser = async (req: Request, res: Response) => {};

const createCurrentUser = async (req: Request, res: Response) => {
	try {
		const { auth0Id } = req.body;
		const existingUser = await User.findOne({ auth0Id });

		if (existingUser) {
			return res.status(200).send();
		}

		const newUser = new User(req.body);
		await newUser.save();

		res.status(201).json(newUser.toObject());
	} catch (error) {}
};

const updateCurrentUser = async (req: Request, res: Response) => {};

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
