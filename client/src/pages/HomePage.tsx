import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";

const HomePage = () => {
	return (
		<main className=''>
			<div>
				<Hero />
				<span className='-mt-3'>
					<SearchBar />
				</span>
			</div>
		</main>
	);
};

export default HomePage;
