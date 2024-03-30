import image from "../../public/bg-image.jpg";

const Hero = () => {
	return (
		<div className='relative'>
			<img
				src={image}
				className='object-cover md:h-[40vh] w-full opacity-[15%] '
			/>

			<span className='absolute inset-0 flex flex-col justify-center p-2 sm:p-6 md:p-8 gap-1 md:gap-3'>
				<h1 className='text-pry font-bold text-xl sm:text-3xl md:text-6xl font-rubik'>
					The First & Only Choice
				</h1>
				<p className='text-black text-[12px] sm:text-[14px] md:text-lg font-light '>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
					mollitia, molestiae quas vel sint commodi
				</p>
			</span>
		</div>
	);
};

export default Hero;
