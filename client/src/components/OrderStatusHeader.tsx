import { Order } from "@/types";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Progress } from "./ui/progress";

type Props = {
	order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
	const getExpectedDelivery = () => {
		const created = new Date(order.createdAt);

		created.setMinutes(
			created.getMinutes() + order.restaurant.estimatedDeliveryTime,
		);
		const hours = created.getHours();
		const minutes = created.getMinutes();

		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${paddedMinutes}`;
	};

	const getOrderStatusInfo = () => {
		return (
			ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
		);
	};

	return (
		<main className='flex flex-col gap-2 text-h3'>
			<div className='space-y-2'>
				<span className='flex gap-1'>
					<p className='font-bold'>Status: </p>
					{""}
					{getOrderStatusInfo()?.label}
				</span>
				<span className='flex gap-1'>
					<p className='font-bold'>Expected by:</p> {getExpectedDelivery()}
				</span>
			</div>

			<span className='flex gap-1 items-center'>
				<p className='font-bold'>Progress:</p>
				<Progress
					value={getOrderStatusInfo().progressValue}
					className='border'
				/>
			</span>
		</main>
	);
};

export default OrderStatusHeader;
