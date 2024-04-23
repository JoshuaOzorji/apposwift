import { Restaurant } from "@/types";
import { PiDotOutlineFill } from "react-icons/pi";

type Props = {
	restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
	return (
		<main className='space-y-2 bg-white p-3'>
			<span className='flex items-end space-x-2'>
				<h1 className='font-bold text-h1'>{restaurant.restaurantName},</h1>
				<p>
					{restaurant.city}, {restaurant.country}
				</p>
			</span>

			<div className='flex text-h4'>
				{restaurant.cuisines?.map((item, index) => (
					<div className='flex items-center'>
						<span>{item}</span>
						{index < restaurant.cuisines.length - 1 && <PiDotOutlineFill />}
					</div>
				))}
			</div>
		</main>
	);
};

export default RestaurantInfo;
