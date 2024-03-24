import { Form, FormDescription } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { useForm } from "react-hook-form";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import { Separator } from "@/components/ui/separator";
import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
	.object({
		restaurantName: z.string({
			required_error: "restaurant name is required",
		}),
		city: z.string({
			required_error: "city is required",
		}),
		country: z.string({
			required_error: "country is required",
		}),
		deliveryPrice: z.coerce.number({
			required_error: "deliveryPrice is required",
			invalid_type_error: "must be a valid number",
		}),
		estimatedDeliveryTime: z.coerce.number({
			required_error: "estimated delivery time is required",
			invalid_type_error: "must be a valid number",
		}),
		cuisines: z.array(z.string()).nonempty({
			message: "please select at least one item",
		}),
		menuItems: z.array(
			z.object({
				name: z.string().min(1, "name is required"),
				price: z.coerce.number().min(1, "price is required"),
			}),
		),
		imageUrl: z.string().optional(),
		imageFile: z.instanceof(File, { message: "image is required" }).optional(),
	})
	.refine((data) => data.imageUrl || data.imageFile, {
		message: "Either image URL or image File must be provided",
		path: ["imageFile"],
	});
type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
	isLoading: boolean;
	onSave: (restaurantFormData: FormData) => void;
};
const ManageRestaurantForm = ({ isLoading, onSave }: Props) => {
	const form = useForm<RestaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cuisines: [],
			menuItems: [{ name: "", price: 0 }],
		},
	});

	const onSubmit = (formDataJson: RestaurantFormData) => {
		const formData = new FormData();

		formData.append("restaurantName", formDataJson.restaurantName);
		formData.append("city", formDataJson.city);
		formData.append("country", formDataJson.country);

		formData.append(
			"deliveryPrice",
			(formDataJson.deliveryPrice * 100).toString(),
		);
		formData.append(
			"estimatedDeliveryTime",
			formDataJson.estimatedDeliveryTime.toString(),
		);
		formDataJson.cuisines.forEach((cuisine, index) => {
			formData.append(`cuisines[${index}]`, cuisine);
		});
		formDataJson.menuItems.forEach((menuItem, index) => {
			formData.append(`menuItems[${index}][name]`, menuItem.name);
			formData.append(
				`menuItems[${index}][price]`,
				(menuItem.price * 100).toString(),
			);
		});

		if (formDataJson.imageFile) {
			formData.append(`imageFile`, formDataJson.imageFile);
		}

		onSave(formData);
	};

	return (
		<Form {...form}>
			<section className='form-container border'>
				<div className='text-center'>
					<h2 className='font-bold text-h1'>Restaurant</h2>
					<FormDescription className='font-light text-h4 '>
						View and change your profile information here
					</FormDescription>
				</div>
				<form
					className='flex flex-col gap-2'
					onSubmit={form.handleSubmit(onSubmit)}>
					<DetailsSection />
					<Separator />
					<CuisinesSection />
					<Separator />
					<MenuSection />
					<Separator />
					<ImageSection />

					<div className='mx-auto'>
						{isLoading ? (
							<span className='flex items-center justify-between'>
								<LoadingButton />
							</span>
						) : (
							<span className='flex items-center justify-between'>
								<Button type='submit'>Submit</Button>
							</span>
						)}
					</div>
				</form>
			</section>
		</Form>
	);
};

export default ManageRestaurantForm;
