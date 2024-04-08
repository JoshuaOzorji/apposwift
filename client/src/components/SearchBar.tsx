import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const formSchema = z.object({
	searchQuery: z.string({
		required_error: "Restaurant name is required",
	}),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
	onSubmit: (formData: SearchForm) => void;
	placeHolder: string;
	onReset?: () => void;
	searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, searchQuery, placeHolder }: Props) => {
	const form = useForm<SearchForm>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			searchQuery,
		},
	});

	useEffect(() => {
		form.reset({ searchQuery });
	}, [form, searchQuery]);

	const handleReset = () => {
		form.reset({ searchQuery: "" });

		if (onReset) {
			onReset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`flex items-center border-1 pr-2 mx-auto rounded-md flex-row gap-2 md:gap-4 bg-white text-acent  shadow-sm my-2 md:my-4`}>
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem className='flex-grow'>
							<FormControl>
								<Input
									{...field}
									className='border-none shadow-none text-sm focus-visible:ring-0 w-full font-light text-h5'
									placeholder={placeHolder}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<button
					onClick={handleReset}
					type='button'
					className='text-acent hover:text-sec animate text-h5'>
					Reset
				</button>
				<button className='text-pry hover:text-sec animate font-bold text-h5'>
					Search
				</button>
			</form>
		</Form>
	);
};

export default SearchBar;
