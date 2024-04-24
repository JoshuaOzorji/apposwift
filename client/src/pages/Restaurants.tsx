import { useGetALLRestaurants } from "@/api-client/RestaurantApi";
import Loading from "@/components/Loading";
import SearchResultCard from "@/components/SearchResultCard";

const Restaurants = () => {
	const { allRestaurants, isLoading } = useGetALLRestaurants();

	if (isLoading || !allRestaurants) {
		return <Loading />;
	}
	return (
		<main>
			{allRestaurants.map((restaurant) => (
				<SearchResultCard restaurant={restaurant} />
			))}
		</main>
	);
};

export default Restaurants;
