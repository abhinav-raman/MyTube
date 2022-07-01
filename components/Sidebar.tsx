import { useContext } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

import Image from "next/image";
import Link from "next/link";
import rightArrowIcon from "../assets/images/right-arrow.svg";
import videoIcon from "../assets/images/video.svg";
import playlistIcon from "../assets/images/playlist.svg";
import accountIcon from "../assets/images/account.svg";

const Sidebar = () => {
	const { isExpanded, invertIsExpanded } = useContext(SideBarContext);
	return (
		<div
			className={`fixed min-h-screen mt-16 bg-amber-400 transition-all ${
				isExpanded ? "w-64" : "w-12"
			}`}
		>
			<div className="flex w-full justify-end items-center mb-6">
				<button
					className={`w-7 h-7 text-center border-2 border-amber-600 hover:border-amber-200 m-2 rounded`}
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
					<Link href="/">
						<a
							title="Videos"
							className="flex p-2 hover:bg-amber-200 cursor-pointer"
						>
							<div className="h-8 w-8 p-1">
								<Image src={videoIcon} layout="responsive" alt="video" />
							</div>
							{isExpanded && <p className="ml-2 text-lg">Videos</p>}
						</a>
					</Link>
				</li>
				<li>
					<Link href="/playlists">
						<a
							title="Playlists"
							className="flex p-2 hover:bg-amber-200 cursor-pointer"
						>
							<div className="h-8 w-8 p-1">
								<Image src={playlistIcon} layout="responsive" alt="video" />
							</div>
							{isExpanded && <p className="ml-2 text-lg">Playlists</p>}
						</a>
					</Link>
				</li>
				<li>
					<Link href="/account">
						<a
							title="Account"
							className="flex p-2 hover:bg-amber-200 cursor-pointer"
						>
							<div className="h-8 w-8 p-1">
								<Image src={accountIcon} layout="responsive" alt="video" />
							</div>
							{isExpanded && <p className="ml-2 text-lg">Account</p>}
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
