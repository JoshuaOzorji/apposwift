import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
	return (
		<main className='bg-pry'>
			<div className='flex justify-between items-center mx-auto p-3 md:p-4'>
				<Link to='/' className='text-h2 flex font-bold text-h1 font-rubik'>
					<p className='text-[#ced4da]'>Appo</p>
					<p className='text-accent'>Swift</p>
				</Link>

				<div className='md:hidden'>
					<MobileNav />
				</div>
				<div className='hidden md:block'>
					<MainNav />
				</div>
			</div>
		</main>
	);
};

export default Header;
