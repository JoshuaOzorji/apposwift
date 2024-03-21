import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
	cuisine: string;
	field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
	const isChecked = Array.isArray(field.value) && field.value.includes(cuisine);

	const handleCheckedChange = (checked: boolean) => {
		if (checked) {
			field.onChange(
				Array.isArray(field.value) ? [...field.value, cuisine] : [cuisine],
			);
		} else {
			field.onChange(
				Array.isArray(field.value)
					? field.value.filter((value: string) => value !== cuisine)
					: [],
			);
		}
	};

	return (
		<FormItem className='flex items-center space-x-1 space-y-0 my-[6px]'>
			<FormControl>
				<Checkbox
					className='bg-white'
					checked={isChecked}
					onCheckedChange={handleCheckedChange}
				/>
			</FormControl>
			<FormLabel className=''>{cuisine}</FormLabel>
		</FormItem>
	);
};

export default CuisineCheckbox;
