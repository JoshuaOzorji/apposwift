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

	const [isExpanded, setIsExpanded] = useState<boolean>();

	const { results, isLoading } = useSearchRestaurants(searchState, city);

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
			page: 1,
		}));
	};
	return (
		<main>
			<div id='cuisines-list'>
				<CuisineFilter
					selectedCuisines={}
					onChange={}
					isExpanded={}
					onExpandedClick={}
				/>
			</div>

			<div>
				<SearchBar
					onSubmit={setSearchQuery}
					searchQuery={}
					onReset={}
					placeHolder={}
				/>
				<span className='flex justify-between flex-col gap-3 lg:flex-row'>
					<SearchResultInfo />
				</span>
			</div>

			{results.data.map((restaurant) => (
				<SearchResultCard />
			))}
		</main>
	);
};

export default SearchPage;
