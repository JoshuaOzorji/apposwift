import { useGetAllRestaurants } from "@/api-client/RestaurantApi";
import Loading from "@/components/Loading";
import ResultCard from "@/components/ResultCard";
import { Restaurant } from "@/types";
import { useState } from "react";

const Restaurants = () => {
	const [page, setPage] = useState(1);
	const [sortOption, setSortOption] = useState("lastUpdated");

	const { results, isLoading } = useGetAllRestaurants(page, sortOption);

	if (isLoading || !results) {
		return <Loading />;
	}

	const { data, pagination } = results;
	console.log(results);

	return (
		<main className='mx-auto md:w-[60%]'>
			{Array.isArray(data) &&
				data.map((restaurant) => (
					<ResultCard key={restaurant._id} restaurant={restaurant} />
				))}
		</main>
	);
};

export default Restaurants;
