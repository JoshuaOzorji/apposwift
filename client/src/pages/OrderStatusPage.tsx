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
		<main className='my-4 space-y-2 mx-auto md:w-[60%] lg:w-[50%]'>
			<p className='text-center font-bold bg-slate-200 text-lg '>Order</p>

			{orders.map((order) => (
				<div className='space-y-2 p-2 md:p-4 border rounded-md shadow-sm'>
					<OrderStatusHeader order={order} />
					<OrderStatusDetail order={order} />

					{/* Image */}
					{/* <span className='md:w-[50%] '>
						<img src={order.restaurant.imageUrl} alt='Restaurant image' />
					</span> */}
				</div>
			))}
		</main>
	);
};

export default OrderStatusPage;
