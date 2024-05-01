import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { PiDotOutlineFill } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

type Props = {
	restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
	return (
		<div>
			<Link
				to={`/detail/${restaurant._id}`}
				className='flex flex-col md:grid grid-cols-7  md:gap-6 border border-slate-300 rounded-md hover:shadow-md animate md:items-center my-3 bg-white'>
				{/* image container	 */}
				<img
					src={restaurant.imageUrl}
					className='w-full h-full object-fill md:col-span-2 rounded-t-md md:rounded-t-none md:rounded-l-md'
				/>

				<div className='flex flex-col py-2 px-3 md:p-2 md:col-span-5'>
					<h3 className='text-h2 font-bold'>{restaurant.restaurantName}</h3>
					<span className='flex text-h4'>
						{`${restaurant.city},  ${restaurant.country}`}
					</span>

					<div id='card-content' className='text-h4'>
						<div className='flex flex-row flex-wrap'>
							{restaurant.cuisines.map((item, index) => (
								<span className='flex items-center'>
									<span>{item}</span>
									{index < restaurant.cuisines.length - 1 && (
										<PiDotOutlineFill />
									)}
								</span>
							))}
						</div>
						<div className='flex flex-col'>
							<div className='flex items-center text-pry gap-1'>
								<IoTimeOutline className='text-pry' />
								{restaurant.estimatedDeliveryTime} mins
							</div>
							<div className='flex items-center gap-1'>
								<TbTruckDelivery className='' />
								Delivery fee £{(restaurant.deliveryPrice / 100).toFixed(2)}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default SearchResultCard;
