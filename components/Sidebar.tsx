import { useContext } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

import rightArrowIcon from "../assets/images/right-arrow.svg";
import Image from "next/image";
import Link from "next/link";

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
						className={`${isExpanded ? "rotate-180" : ""}`}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
					>
						<path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
					</svg>
				</button>
			</div>
			<ul>
				<li>
					<Link href="/playlists">
						<a className="flex p-2 hover:bg-amber-200 cursor-pointer">
							<svg
								className="h-8"
								viewBox="0 0 24 24"
								preserveAspectRatio="xMidYMid meet"
								focusable="false"
							>
								<g>
									<path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"></path>
								</g>
							</svg>
							{isExpanded && <p className="ml-2">Playlists</p>}
						</a>
					</Link>
				</li>
				<li>
					<Link href="/account">
						<a className="flex p-2 hover:bg-amber-200 cursor-pointer">
							<svg
								className="h-8"
								viewBox="0 0 24 24"
								preserveAspectRatio="xMidYMid meet"
								focusable="false"
							>
								<g>
									<path d="M3,3v18h18V3H3z M4.99,20c0.39-2.62,2.38-5.1,7.01-5.1s6.62,2.48,7.01,5.1H4.99z M9,10c0-1.65,1.35-3,3-3s3,1.35,3,3 c0,1.65-1.35,3-3,3S9,11.65,9,10z M12.72,13.93C14.58,13.59,16,11.96,16,10c0-2.21-1.79-4-4-4c-2.21,0-4,1.79-4,4 c0,1.96,1.42,3.59,3.28,3.93c-4.42,0.25-6.84,2.8-7.28,6V4h16v15.93C19.56,16.73,17.14,14.18,12.72,13.93z"></path>
								</g>
							</svg>
							{isExpanded && <p className="ml-2">Account</p>}
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
