import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
// import { Link } from "react-router-dom";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		<main>
			{isAuthenticated ? (
				<>
					<UsernameMenu />
				</>
			) : (
				<Button onClick={async () => await loginWithRedirect()}>Login</Button>
			)}
		</main>
	);
};

export default MainNav;
