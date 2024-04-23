import { useGetRestaurant } from "@/api-client/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";
import OrderSummary from "@/components/OrderSummary";
import { Card, CardFooter } from "@/components/ui/card";
import CheckoutButton from "@/components/CheckoutButton";
import { useCreateCheckoutSession } from "@/api-client/OrderApi";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import Loading from "@/components/Loading";

export type CartItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
};

const DetailPage = () => {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useGetRestaurant(restaurantId);

	const { createCheckoutSession, isLoading: isCheckoutLoading } =
		useCreateCheckoutSession();

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

			sessionStorage.setItem(
				`cartItems-${restaurantId}`,
				JSON.stringify(updatedCartItems),
			);

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

	const onCheckout = async (userFormData: UserFormData) => {
		if (!restaurant) {
			return;
		}

		const checkoutData = {
			cartItems: cartItems.map((cartItem) => ({
				menuItemId: cartItem._id,
				name: cartItem._id,
				quantity: cartItem.quantity.toString(),
			})),
			restaurantId: restaurant._id,
			deliveryDetails: {
				name: userFormData.name,
				addressLine1: userFormData.addressLine1,
				city: userFormData.city,
				country: userFormData.country,
				email: userFormData.email as string,
			},
		};

		const data = await createCheckoutSession(checkoutData);
		window.location.href = data.url;
	};

	if (isLoading || !restaurant) {
		return <Loading />;
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
					{restaurant?.menuItems?.map((menuItem) => (
						<MenuItem
							menuItem={menuItem}
							addToCart={() => addToCart(menuItem)}
						/>
					))}
				</div>
				<div className='md:w-[35%]'>
					<Card>
						<OrderSummary
							restaurant={restaurant}
							cartItems={cartItems}
							removeFromCart={removeFromCart}
						/>
						<CardFooter>
							<CheckoutButton
								disabled={cartItems.length === 0}
								onCheckout={onCheckout}
								isLoading={isCheckoutLoading}
							/>
						</CardFooter>
					</Card>
				</div>
			</section>
		</main>
	);
};

export default DetailPage;
