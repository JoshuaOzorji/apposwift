import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { useForm } from "react-hook-form";
import CuisinesSection from "./CuisinesSection";

const ManageRestaurantForm = () => {
	const form = useForm();
	return (
		<Form {...form}>
			<form className='form-container'>
				<DetailsSection />
				<CuisinesSection />
			</form>
		</Form>
	);
};

export default ManageRestaurantForm;
