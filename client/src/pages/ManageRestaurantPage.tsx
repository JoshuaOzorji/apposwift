import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
} from "@/api-client/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
	const { createRestaurant, isLoading } = useCreateMyRestaurant();
	const { restaurant } = useGetMyRestaurant();

	return (
		<div>
			<ManageRestaurantForm
				restaurant={restaurant}
				onSave={createRestaurant}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default ManageRestaurantPage;
