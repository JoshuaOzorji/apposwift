import orderImage from "/order-now.png";
import deliveryImage from "/food-delivery.png";
import paymentImage from "/cashless-payment.png";

const itemsArray = [
	{
		label: "Swift Ordering",
		image: orderImage,
	},
	{
		label: "Reliable Delivery & Pickup",
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
			<div>
				<h1 className='text-h1 font-bold font-rubik '>How we Serve you</h1>

				<div className='flex flex-wrap md:flex-row justify-evenly'>
					<span className='flex flex-col items-center'>
						<img src={orderImage} alt='' className='h-[20vh]' />
						<p>Swift Ordering</p>
					</span>

					<span className='flex flex-col items-center'>
						<img src={deliveryImage} alt='' className='h-[20vh]' />
						<p>Reliable Delivery & Pickup</p>
					</span>

					<span className='flex flex-col items-center'>
						<img src={paymentImage} alt='' className='h-[20vh]' />
						<p>Seamless Payment</p>
					</span>
				</div>
			</div>
		</main>
	);
};

export default Steps;
