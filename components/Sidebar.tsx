import { useContext } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

import rightArrowIcon from "../assets/images/right-arrow.svg";
import Image from "next/image";

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
					className={`text-center border-2 border-amber-600 hover:border-amber-200 m-2 rounded`}
					onClick={invertIsExpanded}
				>
					<svg
						className={`${isExpanded ? "rotate-180" : ""} transition-all`}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
					>
						<path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
