import { Form, FormDescription } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { useForm } from "react-hook-form";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import { Separator } from "@/components/ui/separator";

const ManageRestaurantForm = () => {
	const form = useForm();
	return (
		<Form {...form}>
			<section className='form-container border'>
				<div className='text-center'>
					<h2 className='font-bold text-h1'>Restaurant</h2>
					<FormDescription className='font-light text-h4 '>
						View and change your profile information here
					</FormDescription>
				</div>
				<form className='flex flex-col gap-2'>
					<DetailsSection />
					<Separator />
					<CuisinesSection />
					<Separator />
					<MenuSection />
				</form>
			</section>
		</Form>
	);
};

export default ManageRestaurantForm;
