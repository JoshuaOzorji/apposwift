import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
	const form = useForm();
	return (
		<Form {...form}>
			<form className='flex border'>
				<Search />
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									className=''
									placeholder='Search by City or Town'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button></Button>
				<Button>Search</Button>
			</form>
		</Form>
	);
};

export default SearchBar;
