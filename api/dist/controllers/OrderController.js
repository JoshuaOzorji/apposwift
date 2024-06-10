"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const stripe_1 = __importDefault(require("stripe"));
const STRIPE = new stripe_1.default(process.env.STRIPE_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const getMyOrders = async (req, res) => {
    try {
        const orders = await order_model_1.default.find({ user: req.userId })
            .populate("restaurant")
            .populate("user");
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
const stripeWebhookHandler = async (req, res) => {
    let event;
    try {
        const sig = req.headers["stripe-signature"];
        event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_ENDPOINT_SECRET);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const order = await order_model_1.default.findById(event.data.object.metadata?.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.totalAmount = event.data.object.amount_total;
        order.status = "paid";
        await order.save();
    }
    res.status(200).send();
};
const createCheckoutSession = async (req, res) => {
    try {
        const checkoutSessionRequest = req.body;
        const restaurant = await restaurant_model_1.default.findById(checkoutSessionRequest.restaurantId);
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }
        const newOrder = new order_model_1.default({
            restaurant: restaurant,
            user: req.userId,
            status: "placed",
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            createdAt: new Date(),
        });
        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);
        const session = await createSession(lineItems, newOrder._id.toString(), restaurant.deliveryPrice, restaurant._id.toString());
        if (!session.url) {
            return res.status(500).json({ message: "Error creating stripe session" });
        }
        await newOrder.save();
        res.json({ url: session.url });
    }
    catch (error) {
        console.log(error);
        express_1.response.status(500).json({ message: error.raw.message });
    }
};
const createLineItems = (checkoutSessionRequest, menuItems) => {
    //1. foreach cartItem, get the menuItem object from the restaurant(to get the price)
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());
        if (!menuItem) {
            throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
        }
        //2. foreach cartItem, convert it to a stripe line item
        const line_item = {
            price_data: {
                currency: "gbp",
                unit_amount: menuItem.price,
                product_data: {
                    name: menuItem.name,
                },
            },
            quantity: parseInt(cartItem.quantity),
        };
        //3. return line item array
        return line_item;
    });
    return lineItems;
};
const createSession = async (lineItems, orderId, deliveryPrice, restaurantId) => {
    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice,
                        currency: "gbp",
                    },
                },
            },
        ],
        mode: "payment",
        metadata: {
            orderId,
            restaurantId,
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });
    return sessionData;
};
exports.default = { createCheckoutSession, stripeWebhookHandler, getMyOrders };
