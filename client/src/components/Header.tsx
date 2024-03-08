import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
	return (
		<main>
			<div>
				<Link to='/' className='text-xl flex font-bold text-h1 font-rubik'>
					<p className=''>Appo</p>
					<p className=''>Swift</p>
				</Link>

				<div>
					<MobileNav />
				</div>
				<div>
					<MainNav />
				</div>
			</div>
		</main>
	);
};

export default Header;
