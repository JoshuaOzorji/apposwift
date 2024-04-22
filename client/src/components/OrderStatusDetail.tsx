import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
	order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
	return (
		<main className='flex flex-col gap-2 text-h3'>
			<div className='flex flex-col'>
				<span className='font-bold'>Items Ordered: </span>
				<ul>
					{order.cartItems.map((item) => (
						<li>
							{item.name} x {item.quantity}
						</li>
					))}
				</ul>
			</div>
			<div className='space-x-1'>
				<span className='font-bold'>Delivering to:</span>
				<span>{order.deliveryDetails.name},</span>
				<span>
					{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
				</span>
			</div>

			<Separator />
			<div className='flex font-bold justify-between text-h2'>
				<span>Total</span>
				<span>£{(order.totalAmount / 100).toFixed(2)}</span>
			</div>
		</main>
	);
};

export default OrderStatusDetail;
