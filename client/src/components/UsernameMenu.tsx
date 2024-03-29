import { FaRegUserCircle } from "react-icons/fa";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	// DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button";

const UsernameMenu = () => {
	const { user, logout } = useAuth0();
	return (
		<main className='text-acent '>
			<DropdownMenu>
				<DropdownMenuTrigger className='flex items-center gap-1 focus:outline-none border border-acent py-1 px-2 rounded-md'>
					<FaRegUserCircle className='' />
					<p>{user?.email || "User"}</p>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='flex flex-col gap-2 focus:outline-none'>
					<DropdownMenuItem>
						<Link to='/manage-restaurant'>Manage Restaurant</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link to='/user-profile' className=''>
							User Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Button
							onClick={() => logout()}
							className='flex flex-1 font-bold bg-pry rounded-none'>
							Log Out
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</main>
	);
};

export default UsernameMenu;
