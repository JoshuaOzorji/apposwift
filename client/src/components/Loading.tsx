import { SpinnerCircular } from "spinners-react";

const Loading = () => {
	return (
		<div className='flex justify-center items-center h-[60vh]'>
			<SpinnerCircular color='#4e2ff5' thickness={60} />
		</div>
	);
};

export default Loading;
