import CuisineFilter from "@/components/CuisineFilter";

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines: string[];
	sortOption: string;
};

const SearchPage = () => {
	return (
		<main>
			<div id='cuisines-list'>
				<CuisineFilter />
			</div>
		</main>
	);
};

export default SearchPage;
