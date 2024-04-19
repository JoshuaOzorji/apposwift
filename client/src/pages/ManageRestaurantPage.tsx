import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
	useGetMyRestaurantOrders,
	useUpdateMyRestaurant,
} from "@/api-client/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

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
			<div className='md:w-[70%] lg:w-[50%] mx-auto'>
				<ManageRestaurantForm
					restaurant={restaurant}
					onSave={isEditing ? updateRestaurant : createRestaurant}
					isLoading={isCreateLoading || isUpdateLoading}
				/>
			</div>
		</Tabs>
	);
};

export default ManageRestaurantPage;
