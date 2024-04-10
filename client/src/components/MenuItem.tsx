import { MenuItem as MenuItemType } from "@/types";

type Props = {
	menuItem: MenuItemType;
	addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
	return (
		<main
			className='cursor-pointer bg-white p-3 flex flex-col gap-y-2'
			onClick={addToCart}>
			<span>
				<p className='underline text-h4'>{menuItem.name}</p>
			</span>
			<span className='font-bold text-h3'>
				£{(menuItem.price / 100).toFixed(2)}
			</span>
		</main>
	);
};

export default MenuItem;
