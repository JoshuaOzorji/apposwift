import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { HiOutlineTrash } from "react-icons/hi2";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

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
		<main className='p-4 md:p-6 text-[13px] md:text-[0.93rem]'>
			<span className=''>
				<h1 className='text-center bg-slate-100 rounded-md font-bold p-0.5'>
					Order Details
				</h1>
			</span>

			<aside className='space-y-2 py-1 mt-3'>
				{cartItems.map((item) => (
					<div className='flex justify-between'>
						<div className='flex'>
							<Badge>{item.quantity}</Badge>
							<p className='pl-1'>{item.name}</p>
						</div>

						<span className='flex items-center gap-1'>
							£{((item.price * item.quantity) / 100).toFixed(2)}
							<HiOutlineTrash
								className='cursor-pointer text-red-600 w-3 h-3 md:h-4 md:w-4'
								onClick={() => removeFromCart(item)}
							/>
						</span>
					</div>
				))}
				<Separator />
				<span className='flex justify-between'>
					<p>Delivery</p>
					<p>£{(restaurant.deliveryPrice / 100).toFixed(2)}</p>
				</span>

				<Separator />
				<span className='flex justify-between font-bold'>
					<p>Total:</p>
					<span>£{getTotalCost()}</span>
				</span>
			</aside>
		</main>
	);
};

export default OrderSummary;
