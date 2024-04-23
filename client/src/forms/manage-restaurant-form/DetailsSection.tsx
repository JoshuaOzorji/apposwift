import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
	const { control } = useFormContext();
	return (
		<main>
			<div>
				<h2 className='font-bold text-h2'>Details</h2>
				<FormDescription className='font-light text-h4 '>
					Enter the details about your restaurant
				</FormDescription>
			</div>

			<FormField
				control={control}
				name='restaurantName'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input {...field} className='bg-white' />
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name='city'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>City</FormLabel>
						<FormControl>
							<Input {...field} className='bg-white' />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name='country'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Country</FormLabel>
						<FormControl>
							<Input {...field} className='bg-white' />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name='deliveryPrice'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Delivery price (£)</FormLabel>
						<FormControl>
							<Input {...field} className='bg-white' placeholder='1.50' />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name='estimatedDeliveryTime'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Estimated Delivery Time (minutes)</FormLabel>
						<FormControl>
							<Input {...field} className='bg-white' placeholder='30' />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</main>
	);
};

export default DetailsSection;
