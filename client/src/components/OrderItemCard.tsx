import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
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
import { VscDebugBreakpointLog } from "react-icons/vsc";

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
		<Card className=''>
			<CardHeader>
				<CardTitle className='text-h3 font-normal space-y-2 font-lato'>
					<div className='flex gap-1'>
						<p className='font-bold'>Customer Name: </p>{" "}
						<span>{order.deliveryDetails.name}</span>
					</div>

					<div className='flex gap-1'>
						<p className='font-bold'>Delivery address:</p>{" "}
						<span>{order.deliveryDetails.addressLine1}</span>
					</div>

					<div className='flex gap-1'>
						<p className='font-bold'>Time:</p>
						<span>{getTime()}</span>
					</div>

					<div className='flex gap-1'>
						<p className='font-bold'>Total Cost:</p>
						<span>£{(order.totalAmount / 100).toFixed(2)}</span>
					</div>
				</CardTitle>
				<Separator />
			</CardHeader>

			<CardContent className='text-h3 space-y-2'>
				<div>
					<p className='font-bold'>Item(s) ordered:</p>
					{order.cartItems.map((cartItem) => (
						<span className='flex gap-1 items-center'>
							<VscDebugBreakpointLog>{cartItem.quantity}</VscDebugBreakpointLog>
							{cartItem.name}
						</span>
					))}
				</div>

				<div className='flex gap-1 items-center flex-wrap md:flex-nowrap'>
					<Label htmlFor='status' className='font-bold md:whitespace-nowrap'>
						Update Status:{" "}
					</Label>
					<Select
						value={status}
						disabled={isLoading}
						onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
						<SelectTrigger id='status' className='text-h3 h-9'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>

						<SelectContent position='popper'>
							{ORDER_STATUS.map((status) => (
								<SelectItem value={status.value} className='text-h3'>
									{status.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderItemCard;
