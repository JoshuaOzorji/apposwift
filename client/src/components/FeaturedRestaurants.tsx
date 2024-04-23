import { useGetAllRestaurants } from "@/api-client/RestaurantApi";
import LoadingButton from "./LoadingButton";

const FeaturedRestaurants = () => {
	const { allRestaurants, isLoading } = useGetAllRestaurants();

	if (isLoading || !allRestaurants) {
		return <LoadingButton />;
	}

	return (
		<main>
			<div>
				{allRestaurants?.map((item) => (
					<div>
						<img src={item.imageUrl} />
						<span>
							{item.city}, {item.country}
						</span>
					</div>
				))}
			</div>
		</main>
	);
};

export default FeaturedRestaurants;
