import { useContext } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

const Playlists = () => {
	const { isExpanded } = useContext(SideBarContext);
	return (
		<main className={`pt-12 transition-all ${isExpanded ? "ml-72" : "ml-12"}`}>
			Playlists
		</main>
	);
};

export default Playlists;
