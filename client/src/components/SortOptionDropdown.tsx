import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
	onChange: (value: string) => void;
	sortOption: string;
};

const SORT_OPTIONS = [
	{ label: "Best match", value: "bestMatch" },

	{ label: "Delivery price", value: "deliveryPrice" },

	{ label: "Estimated delivery time", value: "estimatedDeliveryTime" },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
	const selectedSortLabel =
		SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
		SORT_OPTIONS[0].label;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='focus:outline-none '>
				<button className='text-h5 border md:py-1 p-1 md:px-2 rounded-md border-slate-300 bg-white'>
					Sort by: {selectedSortLabel}
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				{SORT_OPTIONS.map((option) => (
					<DropdownMenuItem
						className='cursor-pointer text-h5'
						onClick={() => onChange(option.value)}>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SortOptionDropdown;
