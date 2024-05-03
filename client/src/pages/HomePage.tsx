import Contact from "@/components/Contact";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Hero from "@/components/Hero";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import Steps from "@/components/Steps";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	const handleSearchSubmit = (searchFormValues: SearchForm) => {
		navigate({ pathname: `/search/${searchFormValues.searchQuery}` });
	};

	return (
		<main>
			<section className='bucket'>
				<div className='border-b border-black/10'>
					<Hero />
				</div>
				<div className='md:w-[50%] mx-auto'>
					<SearchBar onSubmit={handleSearchSubmit} placeHolder='Search' />
				</div>
				<FeaturedRestaurants />
				<Steps />
			</section>

			<Contact />
		</main>
	);
};

export default HomePage;
