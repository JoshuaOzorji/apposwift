import { Order } from "@/types";
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

type Props = {
	order: Order;
};

const OrderItemCard = ({ order }: Props) => {
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
						{/* getTime function */}
						<span></span>
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
					<Select>
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
