import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
	const { control, watch } = useFormContext();

	const existingImageUrl = watch("imageUrl");

	return (
		<main className='space-y-2'>
			<div>
				<h2 className='text-h2 font-bold'>Image</h2>
				<FormDescription className='font-light text-h4'>
					<p>
						Add an image that will be displayed on your restaurant listing in
						the search results.
					</p>{" "}
					<p>Adding a new image will overwrite the existing one.</p>
				</FormDescription>
			</div>

			<div className='space-y-1.5'>
				{existingImageUrl && (
					<img
						src={existingImageUrl}
						className='rounded-md object-cover md:h-[60vh] w-full'
					/>
				)}

				<FormField
					control={control}
					name='imageFile'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className='bg-white'
									type='file'
									accept='.jpg, .jpeg, .png'
									onChange={(event) =>
										field.onChange(
											event.target.files ? event.target.files[0] : null,
										)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</main>
	);
};

export default ImageSection;
