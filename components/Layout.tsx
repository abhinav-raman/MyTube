import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
	return (
		<>
			<Header />
			<Sidebar />
			{children}
		</>
	);
};

export default Layout;
