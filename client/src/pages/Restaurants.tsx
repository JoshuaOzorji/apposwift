import { useGetAllRestaurants } from "@/api-client/RestaurantApi";
import Loading from "@/components/Loading";
import ResultCard from "@/components/ResultCard";
import { useState } from "react";

const Restaurants = () => {
	const [page, setPage] = useState(1);
	const [sortOption, setSortOption] = useState("lastUpdated");

	const { results, isLoading } = useGetAllRestaurants(page, sortOption);

	if (isLoading || !results) {
		return <Loading />;
	}

	console.log("Results:", results);

	return (
		<main className='mx-auto md:w-[60%] my-6'>
			{Array.isArray(results) &&
				results.map((restaurant) => <ResultCard restaurant={restaurant} />)}
		</main>
	);
};

export default Restaurants;
