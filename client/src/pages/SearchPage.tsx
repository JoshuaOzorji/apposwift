import { useSearchRestaurants } from "@/api-client/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines: string[];
	sortOption: string;
};

const SearchPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

	if (!results?.data || !city) {
		return <span>No results found</span>;
	}

	return (
		<main className='flex flex-col md:flex-row gap-6 my-3 font-lato'>
			<aside className='md:w-[25%] border border-slate-300 p-2 rounded-md'>
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
				<div className='w-full'>
					<SearchBar
						onSubmit={setSearchQuery}
						searchQuery={searchState.searchQuery}
						onReset={resetSearch}
						placeHolder='Search by Cuisine or Restaurant name'
					/>
				</div>
			</aside>

			<div className='md:w-[75%]'>
				<span className='flex justify-between flex-col gap-3 lg:flex-row'>
					<SearchResultInfo />
				</span>

				<span className='space-y-4'>
					{results.data.map((restaurant) => (
						<SearchResultCard restaurant={restaurant} />
					))}
				</span>
			</div>
		</main>
	);
};

export default SearchPage;
