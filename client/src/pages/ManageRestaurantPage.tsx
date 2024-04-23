import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
	useGetMyRestaurantOrders,
	useUpdateMyRestaurant,
} from "@/api-client/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCard from "@/components/OrderItemCard";

const ManageRestaurantPage = () => {
	const { createRestaurant, isLoading: isCreateLoading } =
		useCreateMyRestaurant();
	const { restaurant } = useGetMyRestaurant();
	const { updateRestaurant, isLoading: isUpdateLoading } =
		useUpdateMyRestaurant();

	const { orders } = useGetMyRestaurantOrders();

	const isEditing = !!restaurant;

	return (
		<Tabs className='md:w-[70%] lg:w-[60%] mx-auto my-4' defaultValue='orders'>
			<TabsList className='border border-slate-300'>
				<TabsTrigger value='orders'>Orders</TabsTrigger>
				<TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
			</TabsList>

			<TabsContent value='orders'>
				<h2 className='text-h3 text-pry'>{orders?.length} active orders</h2>

				<div className='space-y-2'>
					{orders?.map((order) => (
						<OrderItemCard order={order} />
					))}
				</div>
			</TabsContent>

			<TabsContent value='manage-restaurant'>
				<ManageRestaurantForm
					restaurant={restaurant}
					onSave={isEditing ? updateRestaurant : createRestaurant}
					isLoading={isCreateLoading || isUpdateLoading}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default ManageRestaurantPage;
