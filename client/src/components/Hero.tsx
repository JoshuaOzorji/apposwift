import { IoIosSquare } from "react-icons/io";
import { MdRestaurant } from "react-icons/md";

const Hero = () => {
	return (
		<main className='bg-neutral-200 flex items-center justify-between'>
			<section className='inset-0 flex flex-col justify-center py-6 px-4 md:p-8 gap-1 md:gap-3 w-[90%] md:w-[60%] my-4 md:my-10'>
				<div className='text-pry font-bold text-3xl md:text-6xl font-rubik'>
					<p>Fastest</p>
					<p className='text-acent'>Delivery &</p>
					<span className='flex space-x-2'>
						<p>Easy</p> <p className='text-acent'>Pickup</p>
					</span>
				</div>

				<p className='text-black text-[12px] sm:text-[14px] md:text-lg font-light '>
					Order up, dig in, and let the flavor begin!
				</p>

				<ul className='flex gap-1 md:gap-3 text-h3 font-rubik flex-wrap'>
					<li className='flex items-center'>
						{" "}
						<IoIosSquare className='text-acent' />
						<p className='text-pry'>FAST DELIVERY</p>
					</li>
					<li className='flex items-center'>
						{" "}
						<IoIosSquare className='text-acent' />
						<p className='text-pry'>PICK UP</p>
					</li>
					<li className='flex items-center'>
						{" "}
						<IoIosSquare className='text-acent' />
						<p className='text-pry'>DINE IN</p>
					</li>
				</ul>
			</section>

			<span className='hidden md:flex'>
				<MdRestaurant className='text-[#9fa3a7]' size={300} />
			</span>
		</main>
	);
};

export default Hero;
