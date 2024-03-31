import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { z } from "zod";

const formSchema = z.object({
	searchQuery: z.string({
		required_error: "Restaurant name is required",
	}),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
	onSubmit: (formData: SearchForm) => void;
	onReset?: () => void;
	searchQuery?: string;
};

const SearchBar = ({ onSubmit, searchQuery, onReset }: Props) => {
	const handleReset = () => {};
	const form = useForm();
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`flex items-center border-1 py-1 px-2 md:px-3 rounded-full mx-auto md:w-[50%] flex-row gap-2 md:gap-4 bg-white text-acent flex-wrap shadow-md my-2 md:my-4`}>
				<CiSearch size={25} className='hidden md:block' />
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem className='flex-grow'>
							<FormControl>
								<Input
									{...field}
									className='border-none shadow-none text-sm focus-visible:ring-0 w-full font-light text-h4'
									placeholder='Search by City or Town'
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<button
					onClick={handleReset}
					type='button'
					className='text-acent hover:text-sec animate text-h4'>
					Reset
				</button>
				<button className='text-pry hover:text-sec animate font-bold text-h4'>
					Search
				</button>
			</form>
		</Form>
	);
};

export default SearchBar;
