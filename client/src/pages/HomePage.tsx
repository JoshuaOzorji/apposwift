import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Hero from "@/components/Hero";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	
	const handleSearchSubmit = (searchFormValues: SearchForm) => {
		navigate({ pathname: `/search/${searchFormValues.searchQuery}` });
	};
	return (
		<main className=''>
			<div>
				<Hero />
				<div className='md:w-[50%] mx-auto'>
					<SearchBar onSubmit={handleSearchSubmit} placeHolder='Search' />
				</div>
				<FeaturedRestaurants />
			</div>
		</main>
	);
};

export default HomePage;
