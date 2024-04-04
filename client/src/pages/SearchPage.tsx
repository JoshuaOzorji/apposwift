import { useSearchRestaurants } from "@/api-client/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines: string[];
	sortOption: string;
};

const SearchPage = () => {
	const { city } = useParams();
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: "",
		page: 1,
		selectedCuisines: [],
		sortOption: "bestMatch",
	});

	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const { results, isLoading } = useSearchRestaurants(searchState, city);

	const setSelectedCuisines = (selectedCuisines: string[]) => {
		setSearchState((prevState) => ({
			...prevState,
			selectedCuisines,
			page: 1,
		}));
	};

	// const setPage = (page: number) => {
	// 	setSearchState((prevState) => ({
	// 		...prevState,
	// 		page,
	// 	}));
	// };

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
			page: 1,
		}));
	};

	const resetSearch = () => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: "",
			page: 1,
		}));
	};

	if (isLoading) {
		<span>Loading...</span>;
	}

	if (!results) {
		return <span>No results found</span>;
	}

	// if (!results?.data || !city) {
	// 	return <span>No results found</span>;
	// }

	return (
		<main>
			<div id='cuisines-list'>
				<CuisineFilter
					selectedCuisines={searchState.selectedCuisines}
					onChange={setSelectedCuisines}
					isExpanded={isExpanded}
					onExpandedClick={() =>
						setIsExpanded((prevIsExpanded) => !prevIsExpanded)
					}
				/>
			</div>

			<div>
				<SearchBar
					onSubmit={setSearchQuery}
					searchQuery={searchState.searchQuery}
					onReset={resetSearch}
					placeHolder='Search by Cuisine or Restaurant name'
				/>
				<span className='flex justify-between flex-col gap-3 lg:flex-row'>
					<SearchResultInfo />
				</span>
			</div>

			{results.data.map((restaurant) => (
				<SearchResultCard restaurant={restaurant} />
			))}
		</main>
	);
};

export default SearchPage;
