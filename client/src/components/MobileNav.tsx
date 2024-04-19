import { CiMenuBurger } from "react-icons/ci";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { FaRegUserCircle } from "react-icons/fa";

const MobileNav = () => {
	const { isAuthenticated, loginWithRedirect, user } = useAuth0();

	return (
		<Sheet>
			<SheetTrigger>
				<CiMenuBurger className='w-6 h-6 text-acent' />
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						{isAuthenticated ? (
							<span className='flex items-center gap-1'>
								<FaRegUserCircle className='' />
								{user?.email}
							</span>
						) : (
							<span>Welcome to AppoSwift</span>
						)}
					</SheetTitle>

					<Separator />
					<SheetDescription className='flex flex-col gap-4 mt-2'>
						{isAuthenticated ? (
							<MobileNavLinks />
						) : (
							<Button onClick={() => loginWithRedirect()}>Log in</Button>
						)}
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
