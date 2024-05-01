import { useGetAllRestaurants } from "@/api-client/RestaurantApi";
import Loading from "@/components/Loading";
import PaginationSelector from "@/components/PaginationSelector";
import SearchResultCard from "@/components/SearchResultCard";
import { useState } from "react";

const Restaurants = () => {
	const [page, setPage] = useState(1);
	const [sortOption, setSortOption] = useState("lastUpdated");

	const { results, isLoading } = useGetAllRestaurants(page, sortOption);

	if (isLoading || !results) {
		return <Loading />;
	}

	const { data, pagination } = results;

	const onPageChange = (newPage: number) => {
		setPage(newPage);
	};

	const handleSortOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOption(e.target.value);
	};

	console.log(results);

	return (
		<main className='mx-auto md:w-[60%] my-6'>
			<div className='flex justify-between text-h5 items-center'>
				<p className='text-pry'>{pagination.total} restaurants found</p>

				{/* sortOption feature */}
				<span>
					<select
						value={sortOption}
						onChange={handleSortOptionChange}
						className='p-1 rounded-md focus:outline-none space-y-1 border'>
						<option value='lastUpdated'>Last Updated</option>
						<option value='estimatedDeliveryTime'>
							Estimated Delivery Time
						</option>
						<option value='deliveryFee'>Delivery Fee</option>
					</select>
				</span>
			</div>
			<div>
				{Array.isArray(data) &&
					data.map((restaurant) => (
						<SearchResultCard key={restaurant._id} restaurant={restaurant} />
					))}

				<PaginationSelector
					page={pagination.page}
					pages={pagination.pages}
					onPageChange={onPageChange}
				/>
			</div>
		</main>
	);
};

export default Restaurants;
