import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SidebarContextProvider } from "../context/SidebarStateContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SidebarContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SidebarContextProvider>
	);
}

export default MyApp;
