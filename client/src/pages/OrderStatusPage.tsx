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
		<main className='border p-3 rounded-md shadow-sm my-6 space-y-2 w-full mx-auto md:w-[60%] lg:w-[50%]'>
			<span className=''>
				<p className='text-center font-bold bg-slate-200 text-lg rounded-md'>
					Order
				</p>
			</span>

			{orders.map((order) => (
				<div className='space-y-2 p-2 md:p-4'>
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
