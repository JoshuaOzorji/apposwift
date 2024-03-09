import { CiMenuBurger } from "react-icons/ci";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
	return (
		<main className='text-'>
			<Sheet>MobileNav</Sheet>
			<CiMenuBurger />
		</main>
	);
};

export default MobileNav;
