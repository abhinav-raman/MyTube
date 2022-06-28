import { useContext } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

const Sidebar = () => {
	const { isExpanded, invertIsExpanded } = useContext(SideBarContext);
	return (
		<div
			className={`fixed min-h-screen mt-12 bg-amber-400 transition-all ${
				isExpanded ? "w-72" : "w-12"
			}`}
		>
			<div className="flex justify-between items-center relative mb-8">
				{isExpanded && <p>Sidebar</p>}
				<button
					className="text-center border-2 border-amber-600 hover:border-amber-200 w-8 h-8 m-2 rounded"
					onClick={invertIsExpanded}
				>
					{"<-"}
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
