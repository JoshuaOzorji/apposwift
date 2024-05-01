import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

type Props = {
	page: number;
	pages: number;
	onPageChange: (page: number) => void;
};

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
	const pageNumbers = [];

	for (let i = 1; i <= pages; i++) {
		pageNumbers.push(i);
	}

	return (
		<main>
			{/* MOBILE */}
			<Pagination>
				<PaginationContent className='flex md:hidden flex-col gap-0'>
					<div className='flex'>
						{pageNumbers.map((number) => (
							<PaginationItem className=''>
								<PaginationLink
									className='w-5 text-h5'
									href='#'
									onClick={() => onPageChange(number)}
									isActive={page === number}>
									{number}
								</PaginationLink>
							</PaginationItem>
						))}
					</div>

					<div className='flex gap-2'>
						{/* PREVIOUS BUTTON */}
						{page !== 1 && (
							<PaginationItem className=''>
								<PaginationPrevious
									href='#'
									onClick={() => onPageChange(page - 1)}
									className='text-h5'
								/>
							</PaginationItem>
						)}
						{/* NEXT BUTTON */}
						{page !== pageNumbers.length && (
							<PaginationItem>
								<PaginationNext
									href='#'
									onClick={() => onPageChange(page + 1)}
									className='text-h5 '></PaginationNext>
							</PaginationItem>
						)}
					</div>

					<div></div>
				</PaginationContent>
			</Pagination>

			{/* MD */}
			<Pagination className='hidden md:flex'>
				<PaginationContent>
					{page !== 1 && (
						<PaginationItem className=''>
							<PaginationPrevious
								href='#'
								onClick={() => onPageChange(page - 1)}
								className='text-h5'
							/>
						</PaginationItem>
					)}

					{pageNumbers.map((number) => (
						<PaginationItem className=''>
							<PaginationLink
								className='w-5 text-h5'
								href='#'
								onClick={() => onPageChange(number)}
								isActive={page === number}>
								{number}
							</PaginationLink>
						</PaginationItem>
					))}

					{page !== pageNumbers.length && (
						<PaginationItem>
							<PaginationNext
								href='#'
								onClick={() => onPageChange(page + 1)}
								className='text-h5 '></PaginationNext>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</main>
	);
};

export default PaginationSelector;
