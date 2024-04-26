import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
	const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
		const response = await fetch(
			`${API_BASE_URL}/api/restaurant/${restaurantId}`,
		);

		if (!response.ok) {
			throw new Error("Failed to get restaurant");
		}
		return response.json();
	};

	const { data: restaurant, isLoading } = useQuery(
		"fetchRestaurant",
		getRestaurantByIdRequest,
		{ enabled: !!restaurantId },
	);

	return { restaurant, isLoading };
};

export const useFeaturedRestaurants = () => {
	const featuredRestaurants = async (): Promise<Restaurant[]> => {
		const response = await fetch(`${API_BASE_URL}/api/restaurant`);
		if (!response.ok) {
			throw new Error("Failed to fetch restaurants");
		}
		return response.json();
	};

	const { data: restaurants, isLoading } = useQuery(
		"fetchRestaurant",
		featuredRestaurants,
	);

	return { restaurants, isLoading };
};

export const useGetALLRestaurants = (page: number, pageSize: number) => {
	const getAllRestaurants = async (
		page: number,
		pageSize: number,
	): Promise<Restaurant[]> => {
		const response = await fetch(
			`${API_BASE_URL}/api/all-restaurants?page=${page}&pageSize=${pageSize}`,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch all Restaurants");
		}
		return response.json();
	};
	const { data: allRestaurants, isLoading } = useQuery(
		["getAllRestaurants", page, pageSize],
		() => getAllRestaurants(page, pageSize),
	);

	return { allRestaurants, isLoading };
};

export const useSearchRestaurants = (
	searchState: SearchState,
	city?: string,
) => {
	const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
		const params = new URLSearchParams();
		params.set("searchQuery", searchState.searchQuery);
		params.set("page", searchState.page.toString());
		params.set("selectedCuisines", searchState.selectedCuisines.join(","));
		params.set("sortOption", searchState.sortOption);

		const response = await fetch(
			`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
		);

		if (!response.ok) {
			throw new Error("Failed to get restaurant");
		}

		return response.json();
	};

	const { data: results, isLoading } = useQuery(
		["searchRestaurants", searchState],
		createSearchRequest,
		{ enabled: !!city },
	);

	return {
		results,
		isLoading,
	};
};
