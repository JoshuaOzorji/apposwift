import { useGetRestaurant } from "@/api-client/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";
import OrderSummary from "@/components/OrderSummary";

export type CartItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
};

const DetailPage = () => {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useGetRestaurant(restaurantId);

	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const storedCartItems = sessionStorage.getItem(`carItems-${restaurantId}`);
		return storedCartItems ? JSON.parse(storedCartItems) : [];
	});

	const addToCart = (menuItem: MenuItemType) => {
		setCartItems((prevCartItems) => {
			const existingCartItem = prevCartItems.find(
				(cartItem) => cartItem._id === menuItem._id,
			);

			let updatedCartItems;

			if (existingCartItem) {
				updatedCartItems = prevCartItems.map((cartItem) =>
					cartItem._id === menuItem._id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem,
				);
			} else {
				updatedCartItems = [
					...prevCartItems,
					{
						_id: menuItem._id,
						name: menuItem.name,
						price: menuItem.price,
						quantity: 1,
					},
				];
			}

			return updatedCartItems;
		});
	};

	const removeFromCart = (cartItem: CartItem) => {
		setCartItems((prevCartItems) => {
			const updatedCartItems = prevCartItems.filter(
				(item) => cartItem._id !== item._id,
			);

			sessionStorage.setItem(
				`cartItems-${restaurantId}`,
				JSON.stringify(updatedCartItems),
			);

			return updatedCartItems;
		});
	};

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

					<p className='text-pry text-h2 underline text-'>Menu</p>
					{restaurant.menuItems.map((menuItem) => (
						<MenuItem
							menuItem={menuItem}
							addToCart={() => addToCart(menuItem)}
						/>
					))}
				</div>
				<div className='md:w-[35%]'>
					<span className='bg-white'>
						<OrderSummary
							restaurant={restaurant}
							cartItems={cartItems}
							removeFromCart={removeFromCart}
						/>
					</span>
				</div>
			</section>
		</main>
	);
};

export default DetailPage;
