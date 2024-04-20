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
		<Tabs>
			<TabsList>
				<TabsTrigger value='orders'>Orders</TabsTrigger>
				<TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
			</TabsList>

			<TabsContent value='orders'>
				<h2>{orders?.length} active orders</h2>
				{orders?.map((order) => (
					<OrderItemCard order={order} />
				))}
			</TabsContent>
			{/* <div className='md:w-[70%] lg:w-[50%] mx-auto'> */}
			<TabsContent value='manage-restaurant'>
				<ManageRestaurantForm
					restaurant={restaurant}
					onSave={isEditing ? updateRestaurant : createRestaurant}
					isLoading={isCreateLoading || isUpdateLoading}
				/>
			</TabsContent>
			{/* </div> */}
		</Tabs>
	);
};

export default ManageRestaurantPage;
