import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
	const { logout } = useAuth0();
	return (
		<>
			<Link to='/'>Order Status</Link>

			<Link to='/'>My Restaurant</Link>

			<Link to='/'>User Profile</Link>

			<Button onClick={() => logout()} className='bg-pry'>
				Logout
			</Button>
		</>
	);
};

export default MobileNavLinks;
