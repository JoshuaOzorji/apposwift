import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
	const { control } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "menuItems",
	});
	return (
		<main>
			<div>
				<h2 className='text-2xl font-bold'>Menu</h2>
				<FormDescription>
					Create your menu and give each item a name and a price
				</FormDescription>
			</div>

			<FormField
				control={control}
				name='menuItems'
				render={() => (
					<FormItem>
						{fields.map((_, index) => (
							<MenuItemInput />
						))}
					</FormItem>
				)}
			/>
		</main>
	);
};

export default MenuSection;
