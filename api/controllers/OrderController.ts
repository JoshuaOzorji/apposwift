import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import Order from "../models/order.model";
import Stripe from "stripe";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

type CheckoutSessionRequest = {
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: number;
	}[];
	deliveryDetails: {
		email: string;
		name: string;
		addressLine1: string;
		city: string;
	};
	restaurantId: string;
};

const stripeWebhookHandler = async (req: Request, res: Response) => {
	let event;

	try {
		const sig = req.headers["stripe-signature"];
		event = STRIPE.webhooks.constructEvent(
			req.body,
			sig as string,
			STRIPE_ENDPOINT_SECRET,
		);
	} catch (error: any) {
		console.log(error);
		return res.status(400).send(`Webhook error: ${error.message}`);
	}

	if (event.type === "checkout.session.completed") {
		const order = await Order.findById(event.data.object.metadata?.orderId);

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		order.totalAmount = event.data.object.amount_total;
		order.status = "paid";

		await order.save();
	}
};

const createCheckoutSession = async (req: Request, res: Response) => {
	try {
		const checkoutSessionRequest: CheckoutSessionRequest = req.body;

		const restaurant = await Restaurant.findById(
			checkoutSessionRequest.restaurantId,
		);

		if (!restaurant) {
			throw new Error("Restaurant not found");
		}

		const newOrder = new Order({});
	} catch (error) {}
};

export default { createCheckoutSession, stripeWebhookHandler };
