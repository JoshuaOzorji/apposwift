import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "lucide-react";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api-client/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
	order: Order;
};

const OrderItemCard = ({ order }: Props) => {
	const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

	const [status, setStatus] = useState<OrderStatus>(order.status);

	useEffect(() => {
		setStatus(order.status);
	}, [order.status]);

	const handleStatusChange = async (newStatus: OrderStatus) => {
		await updateRestaurantStatus({
			orderId: order._id as string,
			status: newStatus,
		});
		setStatus(newStatus);
	};

	const getTime = () => {
		const orderDateTime = new Date(order.createdAt);

		const hours = orderDateTime.getHours();
		const minutes = orderDateTime.getMinutes();

		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${paddedMinutes}`;
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<div>
						Customer Name: <span>{order.deliveryDetails.name}</span>
					</div>

					<div>
						Delivery address: <span>{order.deliveryDetails.addressLine1}</span>
					</div>

					<div>
						Time:
						<span>{getTime()}</span>
					</div>

					<div>
						Total Cost: <span>£{(order.totalAmount / 100).toFixed(2)}</span>
					</div>
				</CardTitle>
				<Separator />
			</CardHeader>

			<CardContent>
				<div>
					{order.cartItems.map((cartItem) => (
						<span>
							<Badge>{cartItem.quantity}</Badge>
							{cartItem.name}
						</span>
					))}
				</div>

				<div>
					<Label htmlFor='status'></Label>
					<Select
						value={status}
						disabled={isLoading}
						onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
						<SelectTrigger id='status'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>

						<SelectContent>
							{ORDER_STATUS.map((status) => (
								<SelectItem value={status.value}>{status.label}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderItemCard;
