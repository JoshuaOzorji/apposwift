import { Link } from "react-router-dom";

type Props = {
	total: number;
	city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
	return (
		<main className='my-2'>
			<span className='text-h5 flex flex-col md:flex-row md:gap-0 md:items-center space-x-3'>
				<p>
					<span>{total} </span>Restaurants found in{" "}
					<span className='font-bold'>{city}</span>
				</p>

				<Link to='/' className='text-pry hover:text-sec animate underline'>
					Change Location
				</Link>

				<Link
					to='/restaurants'
					className='text-pry hover:text-sec animate underline'>
					See all restaurants
				</Link>
			</span>
		</main>
	);
};

export default SearchResultInfo;
