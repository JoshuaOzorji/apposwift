import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<main className='bg-black/5 py-1.5'>
			<section className='bucket flex justify-between items-center'>
				<Link to='/'>
					<span className='text-neutral-600 hover:text-pry font-bold text-[0.8rem] md:text-base'>
						AppoSwift
					</span>
				</Link>

				<div className='text-[0.6rem] md:text-xs flex gap-2 text-neutral-600 font-rubik font-light'>
					<button className='hover:text-pry'>Privacy Policy</button>
					<button className='md:decoration-2 hover:text-pry animate'>
						Terms of Service
					</button>
				</div>
			</section>
		</main>
	);
};

export default Footer;
