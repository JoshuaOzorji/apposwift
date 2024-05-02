import { useFeaturedRestaurants } from "@/api-client/RestaurantApi";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const FeaturedRestaurants = () => {
	const { restaurants, isLoading } = useFeaturedRestaurants();

	if (isLoading || !restaurants || !Array.isArray(restaurants)) {
		return <Loading />;
	}

	return (
		<main className='flex flex-col gap-2 font-lato my-4 border-t border-black/10 py-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-h1 font-bold font-rubik'>Featured</h1>

				<Link
					to='/restaurants'
					className='text-h3 hover:underline animate font-rubik font-light'>
					See more
				</Link>
			</div>

			<section className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
				{Array.isArray(restaurants) &&
					restaurants.map((item) => (
						<div className='flex flex-col border rounded-md border-slate-300'>
							<img
								src={item.imageUrl}
								className='rounded-t-lg h-[28vh] sm:h-[26vh] md:h-[30vh] object-cover object-center'
							/>
							<span className='flex flex-col px-2 py-3 text-h4'>
								<Link to={`/detail/${item._id}`}>
									<div>
										<p className='font-bold'>{item.restaurantName}</p>{" "}
										<p className='font-light'>
											{item.city}, {item.country}
										</p>
									</div>
									<p className='space-x-1'>
										<span className='font-bold'>Cuisines:</span>
										<span>{item.cuisines.join(", ")}</span>
									</p>
								</Link>
							</span>
						</div>
					))}
			</section>
		</main>
	);
};

export default FeaturedRestaurants;
