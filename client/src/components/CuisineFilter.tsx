import { cuisineList } from "@/config/restaurant-options";

type Props = {
	onChange: () => void;
	selectedCuisines: string[];
	isExpanded: boolean;
	onExpandedClick: () => void;
};
const CuisineFilter = ({
	onChange,
	selectedCuisines,
	isExpanded,
	onExpandedClick,
}: Props) => {
	const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
		const clickedCuisine = event.target.value;
		const isChecked = event.target.checked;

		const newCuisinesList = isChecked
			? [...selectedCuisines, clickedCuisine]
			: selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

		onChange(newCuisinesList);
	};

	return (
		<>
			<div>
				<span>Filter by Cuisine</span>
				<span>Reset</span>
			</div>

			<div>{cuisineList.slice}</div>
		</>
	);
};

export default CuisineFilter;
