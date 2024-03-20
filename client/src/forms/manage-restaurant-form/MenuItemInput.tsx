import { FormField } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const MenuItemInput = () => {
	const { control } = useFormContext();

	return (
		<main>
			<FormField control={control} name='' render={}></FormField>
		</main>
	);
};

export default MenuItemInput;
