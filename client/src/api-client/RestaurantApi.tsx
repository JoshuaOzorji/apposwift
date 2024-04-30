import { SearchState } from "@/pages/SearchPage";
import {
	Restaurant,
	RestaurantResponse,
	RestaurantSearchResponse,
} from "@/types";
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

export const useGetAllRestaurants = (page: number, sortOption: string) => {
	const getAllRestaurants = async (): Promise<RestaurantSearchResponse> => {
		const response = await fetch(
			`${API_BASE_URL}/api/restaurants?page=${page}&sortOption=${sortOption}`,
		);
		if (!response.ok) {
			throw new Error("Error fetching restaurants");
		}
		return response.json();
	};

	const { data: results, isLoading } = useQuery(
		["getAllRestaurants", page, sortOption],
		getAllRestaurants,
		{
			keepPreviousData: true,
		},
	);

	return {
		results,
		isLoading,
	};
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
