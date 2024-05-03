import orderImage from "/order-now.png";
import deliveryImage from "/food-delivery.png";
import paymentImage from "/cashless-payment.png";

const itemsArray = [
	{
		label: "Swift Ordering",
		image: orderImage,
	},
	{
		label: "Reliable Delivery",
		image: deliveryImage,
	},
	{
		label: "Seamless Payment",
		image: paymentImage,
	},
];

const Steps = () => {
	return (
		<main className='my-4 border-t border-black/10 py-4 font-lato'>
			<h1 className='text-h1 font-bold font-rubik '>How we serve you</h1>

			<div className='flex flex-wrap md:flex-row justify-evenly mt-4 gap-4'>
				{itemsArray.map((item, index) => (
					<div
						className='flex flex-col items-center border p-4 rounded-md border-black/10 shadow-md gap-2'
						key={index}>
						<img src={item.image} className='h-[15vh] md:h-[25vh]' />
						<p className='text-white bg-pry rounded-md px-2 py-0.5 text-h3'>
							{item.label}
						</p>
					</div>
				))}
			</div>
		</main>
	);
};

export default Steps;
