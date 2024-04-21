import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
	order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
	return (
		<main>
			<div>
				<span>Delivering to:</span>
				<span>{order.deliveryDetails.name}</span>
				<span>
					{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
				</span>
			</div>

			<div className='flex flex-col'>
				<span>Your Order</span>
				<ul>
					{order.cartItems.map((item) => (
						<li>
							{item.name} x {item.quantity}
						</li>
					))}
				</ul>
			</div>

			<Separator />
			<div className='flex flex-col'>
				<span>Total</span>
				<span>£{(order.totalAmount / 100).toFixed(2)}</span>
			</div>
		</main>
	);
};

export default OrderStatusDetail;