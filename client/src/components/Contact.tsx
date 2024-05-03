const Contact = () => {
	return (
		<main className='bg-pry text-white w-full'>
			<div className='font-lato flex flex-col items-center p-8 md:p-16 gap-4 mt-4 mx-auto w-[90%]'>
				<div className='font-rubik text-center'>
					<h2 className='font-bold text-lg md:text-4xl '>
						Save time, save money!
					</h2>
					<h3 className='font-light text-h3'>
						We deliver as fast as you expect
					</h3>
				</div>
				<form className='flex flex-col md:flex-row items-center gap-2 w-[80%] md:w-[40%] mx-auto'>
					<input
						type='email'
						placeholder='Your email address'
						className='py-2 px-4 form-focus text-secText w-[100%] md:w-[65%]'
					/>
					<button className='border bg-sec text-black hover:bg-acent bg-secT animate px-4 py-2 w-[100%] md:w-[35%] '>
						Subscribe
					</button>
				</form>
			</div>
		</main>
	);
};

export default Contact;
