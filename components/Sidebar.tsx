import { useContext, useState } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

// import Image from "next/image";
import Link from "next/link";
import RightArrowIcon from "../assets/images/right-arrow.svg";
import VideoIcon from "../assets/images/video.svg";
import PlaylistIcon from "../assets/images/playlist.svg";
import AccountIcon from "../assets/images/account.svg";
import { useRouter } from "next/router";

const Sidebar = () => {
	const router = useRouter();
	const { isExpanded, invertIsExpanded } = useContext(SideBarContext);
	return (
		<div
			className={`fixed min-h-screen mt-16 transition-all  ${
				isExpanded ? "w-64" : "w-12"
			}`}
		>
			<div className="flex w-full justify-end items-center mb-6">
				<button
					className={`w-7 h-7 text-center bg-sky-600 hover:bg-sky-600/75
             m-2 p-1 rounded-md shadow-lg`}
					onClick={invertIsExpanded}
				>
					<RightArrowIcon
						className={`fill-white ${isExpanded ? "rotate-90" : "-rotate-90"}`}
					/>
				</button>
			</div>
			<ul>
				<li>
					<Link href="/">
						<a
							title="Videos"
							className={`flex p-2 hover:bg-sky-200/80 hover:dark:bg-sky-800/80 hover:shadow-lg shadow-sky-800/20 cursor-pointer rounded-r-lg ${
								router.asPath === "/"
									? "bg-sky-200 dark:bg-sky-800 shadow-2xl"
									: ""
							}`}
						>
							<div className="h-8 w-8 p-1">
								<VideoIcon
									layout="responsive"
									alt="video"
									className="fill-sky-800 dark:fill-sky-200"
								/>
							</div>
							{isExpanded && (
								<p className="ml-2 text-lg font-medium text-sky-800 dark:text-white">
									Videos
								</p>
							)}
						</a>
					</Link>
				</li>
				<li>
					<Link href="/playlists">
						<a
							title="Playlists"
							className={`flex p-2 hover:bg-sky-200/80 hover:dark:bg-sky-800/80 hover:shadow-lg shadow-sky-800/20 cursor-pointer rounded-r-lg ${
								router.asPath === "/playlists"
									? "bg-sky-200 dark:bg-sky-800 shadow-2xl"
									: ""
							}`}
						>
							<div className="h-8 w-8 p-1">
								<PlaylistIcon
									layout="responsive"
									alt="video"
									className="fill-sky-800 dark:fill-sky-200"
								/>
							</div>
							{isExpanded && (
								<p className="ml-2 text-lg font-medium text-sky-800 dark:text-white">
									Playlists
								</p>
							)}
						</a>
					</Link>
				</li>
				<li>
					<Link href="/account">
						<a
							title="Account"
							className={`flex p-2 hover:bg-sky-200/80 hover:dark:bg-sky-800/80 hover:shadow-lg shadow-sky-800/20 cursor-pointer rounded-r-lg ${
								router.asPath === "/account"
									? "bg-sky-200 dark:bg-sky-800 shadow-2xl"
									: ""
							}`}
						>
							<div className="h-8 w-8 p-1">
								<AccountIcon
									layout="responsive"
									alt="video"
									className="fill-sky-800 dark:fill-sky-200"
								/>
							</div>
							{isExpanded && (
								<p className="ml-2 text-lg font-medium text-sky-800 dark:text-white">
									Account
								</p>
							)}
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
