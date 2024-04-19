import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		<main>
			{isAuthenticated ? (
				<>
					<Link to='/order-status' className=''>
						Order Status
					</Link>
					<UsernameMenu />
				</>
			) : (
				<Button
					onClick={async () => await loginWithRedirect()}
					className='border bg-pry hover:bg-sec'>
					Login
				</Button>
			)}
		</main>
	);
};
export default MainNav;
