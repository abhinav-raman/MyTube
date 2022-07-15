import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SidebarContextProvider } from "../context/SidebarStateContext";
import { LoggedInContextProvider } from "../context/LoggedInContext";
import { ThemeContextProvider } from "../context/ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<LoggedInContextProvider>
			<ThemeContextProvider>
				<SidebarContextProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SidebarContextProvider>
			</ThemeContextProvider>
		</LoggedInContextProvider>
	);
}

export default MyApp;
