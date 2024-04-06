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
					<SearchBar onSubmit={handleSearchSubmit} />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
