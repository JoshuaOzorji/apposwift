"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RestaurantController_1 = __importDefault(require("../controllers/RestaurantController"));
const router = express_1.default.Router();
router.get("/", RestaurantController_1.default.getAllRestaurants);
exports.default = router;
