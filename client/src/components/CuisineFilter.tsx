import { cuisineList } from "@/config/restaurant-options";
import { Label } from "./ui/label";
import { FiCheck } from "react-icons/fi";
import { ChangeEvent } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type Props = {
	onChange: (cuisines: string[]) => void;
	selectedCuisines: string[];
	isExpanded?: boolean;
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
			<div className='flex justify-between items-center px-1 text-h5 mb-1'>
				<span className='font-bold'>Filter by Cuisine</span>
				<button onClick={handleCuisinesReset} className='underline'>
					Reset filters
				</button>
			</div>

			<section className='border rounded-md px-2 py-1.5'>
				<div className='flex flex-wrap gap-1'>
					{cuisineList
						.slice(0, isExpanded ? cuisineList.length : 7)
						.map((cuisine) => {
							const isSelected = selectedCuisines.includes(cuisine);
							return (
								<div className='space-y-1'>
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
										className={`flex cursor-pointer text-h4 rounded-full px-2.5 py-0.5 font-semibold items-center ${
											isSelected
												? "border border-pry text-pry"
												: "border border-slate-300"
										}`}>
										{isSelected && <FiCheck size={18} />}
										{cuisine}
									</Label>
								</div>
							);
						})}
				</div>

				{/* button */}
				<div className='my-2'>
					<button
						onClick={onExpandedClick}
						className=' text-h6 items-center flex mx-auto hover:underline animate'>
						{isExpanded ? (
							<span className='flex items-center'>
								View less <IoChevronUp size={18} />
							</span>
						) : (
							<span className='flex items-center'>
								View More <IoChevronDown size={18} />
							</span>
						)}
					</button>
				</div>
			</section>
		</>
	);
};

export default CuisineFilter;
