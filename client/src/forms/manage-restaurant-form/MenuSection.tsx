import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
	const { control } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "menuItems",
	});
	return (
		<main className='space-y-2'>
			<div>
				<h2 className='text-h2 font-bold'>Menu</h2>
				<FormDescription className='font-light text-h4'>
					Create your menu and give each item a name and a price
				</FormDescription>
			</div>

			<FormField
				control={control}
				name='menuItems'
				render={() => (
					<FormItem>
						{fields.map((_, index) => (
							<MenuItemInput
								index={index}
								removeMenuItem={() => remove(index)}
							/>
						))}
					</FormItem>
				)}
			/>

			<button
				type='button'
				onClick={() => append({ name: "", price: "" })}
				className='underline text-h4'>
				Add Menu Item
			</button>
		</main>
	);
};

export default MenuSection;
