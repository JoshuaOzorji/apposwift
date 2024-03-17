import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import LoadingButton from "@/components/LoadingButton";
import { useEffect } from "react";

const formSchema = z.object({
	email: z.string().optional(),
	name: z.string().min(1, "name is required"),
	addressLine1: z.string().min(1, "Address Line 1 is required"),
	city: z.string().min(1, "City is required"),
	country: z.string().min(1, "Country is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
	currentUser: User;
	onSave: (userProfileData: UserFormData) => void;
	isLoading: boolean;
	title?: string;
	buttonText?: string;
};

const UserProfileForm = ({
	currentUser,
	onSave,
	isLoading,
	title = "User Profile",
	buttonText = "Submit",
}: Props) => {
	const form = useForm<UserFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: currentUser,
	});

	useEffect(() => {
		form.reset(currentUser);
	}, [currentUser, form]);

	return (
		<Form {...form}>
			<form
				className='w-full p-2 md:p-4 mx-auto md:w-[70%] lg:w-[60%] gap-2 space-y-2'
				onSubmit={form.handleSubmit(onSave)}>
				<div>
					<h2>{title}</h2>
					<FormDescription>
						View and change your profile information here
					</FormDescription>
				</div>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} disabled className='bg-white' />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl className='form-focus'>
								<Input {...field} className='bg-white' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div>
					<FormField
						control={form.control}
						name='addressLine1'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Address Line 1</FormLabel>
								<FormControl className='form-focus'>
									<Input {...field} className='bg-white ' />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='city'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>City</FormLabel>
								<FormControl className='form-focus'>
									<Input {...field} className='bg-white' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Country</FormLabel>
								<FormControl className='form-focus'>
									<Input {...field} className='bg-white ' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex'>
					{isLoading ? (
						<LoadingButton />
					) : (
						<span>
							<Button type='submit'>{buttonText}</Button>
						</span>
					)}
				</div>
			</form>
		</Form>
	);
};

export default UserProfileForm;
