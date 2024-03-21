import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
	index: number;
	removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
	const { control } = useFormContext();

	return (
		<main className='flex items-end justify-between flex-wrap'>
			<FormField
				control={control}
				name={`menuItems.${index}.name`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Name <FormMessage />
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='Cheese Pizza'
								className='bg-white'
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name={`menuItems.${index}.price`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Price (£) <FormMessage />
						</FormLabel>

						<FormControl>
							<Input {...field} placeholder='8.00' className='bg-white' />
						</FormControl>
					</FormItem>
				)}
			/>

			<Button
				type='button'
				onClick={removeMenuItem}
				className='bg-red-500 max-h-fit'>
				Remove
			</Button>
		</main>
	);
};

export default MenuItemInput;
