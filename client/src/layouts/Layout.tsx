import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
	children: React.ReactNode;
	showHero?: boolean;
};
const Layout = ({ children, showHero = false }: Props) => {
	return (
		<main>
			<Header />
			{showHero && <Hero />}
			<div>{children}</div>
			<Footer />
		</main>
	);
};

export default Layout;
