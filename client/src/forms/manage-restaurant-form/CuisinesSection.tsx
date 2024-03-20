import {
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection = () => {
	const { control } = useFormContext();

	return (
		<main>
			<div>
				<h2 className='text-2xl font-bold'>Cuisines</h2>
				<FormDescription>
					Select the cuisines that your restaurant serves
				</FormDescription>
			</div>

			<FormField
				control={control}
				name='cuisines'
				render={({ field }) => (
					<FormItem className=''>
						<div className='grid sm:grid-cols-2 md:grid-cols-4 gap-1'>
							{cuisineList.map((cuisineItem) => (
								<CuisineCheckbox cuisine={cuisineItem} field={field} />
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</main>
	);
};

export default CuisinesSection;
