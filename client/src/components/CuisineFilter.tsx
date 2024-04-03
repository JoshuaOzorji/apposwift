import { cuisineList } from "@/config/restaurant-options";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { ChangeEvent } from "react";

type Props = {
	onChange: (cuisines: string[]) => void;
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

	const handleCuisinesReset = () => onChange([]);

	return (
		<>
			<div className='flex justify-between items-center px-2'>
				<span className='text-md mb-2'>Filter by Cuisine</span>
				<span onClick={handleCuisinesReset} className=''>
					Reset filters
				</span>
			</div>

			<div>
				{cuisineList
					.slice(0, isExpanded ? cuisineList.length : 7)
					.map((cuisine) => {
						const isSelected = selectedCuisines.includes(cuisine);
						return (
							<div>
								<input
									id={`cuisine_${cuisine}`}
									type='checkbox'
									className='hidden'
									value={cuisine}
									checked={isSelected}
									onChange={handleCuisinesChange}
								/>
								<Label
									htmlFor={`cuisine_${cuisine}`}
									className={`flex flex-1 items-center cursor-pointer text-h4 rounded-full px-4 py-2 font-semibold ${
										isSelected
											? "border border-green-600 text-green-600"
											: "border border-slate-300"
									}`}>
									{isSelected && <Check size={20} />}
									{cuisine}
								</Label>
							</div>
						);
					})}

				<Button
					onClick={onExpandedClick}
					variant='link'
					className='mt-4 flex-1'>
					{isExpanded ? (
						<span className='flex items-center'>
							View less <ChevronUp />
						</span>
					) : (
						<span className='flex items-center'>
							View more <ChevronDown />
						</span>
					)}
				</Button>
			</div>
		</>
	);
};

export default CuisineFilter;
