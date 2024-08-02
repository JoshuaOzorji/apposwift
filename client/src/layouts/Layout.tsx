import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
	children: React.ReactNode;
	showHero?: boolean;
};

const Layout = ({ children, showHero = false }: Props) => {
	return (
		<main className='font-lato animate flex flex-col min-h-screen bg-[#f2f4f3] relative'>
			<div>
				<Header />
			</div>

			<div className='bucket flex-1'>
				{showHero && <Hero />}
				<div>{children}</div>
			</div>

			<span>
				<Footer />
			</span>
		</main>
	);
};

export default Layout;
