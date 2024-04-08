import { Link } from "react-router-dom";

type Props = {
	total: number;
	city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
	return (
		<main className='my-2'>
			<span className='text-h5 flex justify-between items-center'>
				<p>
					<span>{total} </span>Restaurants found in{" "}
					<span className='font-bold'>{city}</span>
				</p>

				<Link to='/' className='text-pry hover:text-sec animate'>
					Change Location
				</Link>
			</span>
		</main>
	);
};

export default SearchResultInfo;
