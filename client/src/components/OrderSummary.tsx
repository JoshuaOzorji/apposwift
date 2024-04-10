import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { Badge } from "./ui/badge";
import { HiOutlineTrash } from "react-icons/hi2";
import { Separator } from "./ui/separator";

type Props = {
	restaurant: Restaurant;
	cartItems: CartItem[];
	removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
	const getTotalCost = () => {
		const totalInPence = cartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0,
		);

		const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

		return (totalWithDelivery / 100).toFixed(2);
	};

	return (
		<main>
			<div>
				<p>Your Order</p>
				<p>£{getTotalCost()}</p>
			</div>

			<div>
				{cartItems.map((item) => (
					<div className='flex justify-between'>
						<span>
							<Badge>{item.quantity}</Badge>
						</span>
						<span className='flex items-center gap-1'>
							<HiOutlineTrash
								className='cursor-pointer text-red-600 w-4 h-4 md:h-5 md:w-5'
								onClick={() => removeFromCart(item)}
							/>
							£{((item.price * item.quantity) / 100).toFixed(2)}
						</span>
					</div>
				))}
				<Separator />
				<div className='flex justify-between'>
					<p>Delivery</p>
					<p>£{(restaurant.deliveryPrice / 100).toFixed(2)}</p>
				</div>
			</div>
		</main>
	);
};

export default OrderSummary;
