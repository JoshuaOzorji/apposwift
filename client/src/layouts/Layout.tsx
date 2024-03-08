import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
	children: React.ReactNode;
	showHero?: boolean;
};
const Layout = ({ children, showHero = false }: Props) => {
	return (
		<main className='font-lato animate flex flex-col min-h-screen'>
			<span className='px-2 py-2 md:px-4'>
				<Header />
			</span>

			<div className='bucket flex-1'>
				{showHero && <Hero />}
				<div>{children}</div>
			</div>
			<span className='px-2 py-2 md:px-4'>
				<Footer />
			</span>
		</main>
	);
};

export default Layout;
