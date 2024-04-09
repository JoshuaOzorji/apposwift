import { useGetRestaurant } from "@/api-client/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const DetailPage = () => {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useGetRestaurant(restaurantId);

	if (isLoading || !restaurant) {
		return "Loading...";
	}

	return (
		<main>
			<section className='flex flex-col md:flex-row w-full my-4 gap-6'>
				<div className='md:w-[65%] space-y-3'>
					<img
						src={restaurant.imageUrl}
						className='rounded-md object-cover md:w-full md:h-[70vh]'
					/>
					<RestaurantInfo restaurant={restaurant} />

					<span>Menu</span>
					{restaurant.menuItems.map((menuItem) => (
						<MenuItem menuItem={menuItem} />
					))}
				</div>
				<div className='md:w-[35%]'>
					<Card />
				</div>
			</section>
		</main>
	);
};

export default DetailPage;
