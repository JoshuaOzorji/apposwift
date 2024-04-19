import { useGetMyOrders } from "@/api-client/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatusPage = () => {
	const { orders, isLoading } = useGetMyOrders();

	if (isLoading) {
		return "Loading...";
	}

	if (!orders || orders.length === 0) {
		return "No orders found";
	}
	return (
		<main>
			{orders.map((order) => (
				<div>
					<OrderStatusHeader order={order} />
					<div>
						<OrderStatusDetail order={order} />
						<img src={order.restaurant.imageUrl} alt='Restaurant image' />
					</div>
				</div>
			))}
		</main>
	);
};

export default OrderStatusPage;
